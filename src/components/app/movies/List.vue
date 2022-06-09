<template>
    <div>
        <template v-if="loading">
            <Skeleton type="movie" :length="15" />
        </template>
        <template v-else>
            <section class="my-10">
                <div class="containerw bg-gray-100 p-5 rounded-md mt-10">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">

                            <h5 class="mr-4"> Search by release date:</h5>

                            <div class="flex items-center">
                                <hx-input type="date" class="mr-2" v-model="filters.release_start_date"></hx-input>
                                <hx-input type="date" v-model="filters.release_end_date"></hx-input>
                            </div>
                        </div>

                        <hx-button variant="primary" pill @click="searchHandler">
                            Search
                        </hx-button>
                    </div>
                </div>
            </section>

            <section>
                <div class="grid grid-cols-12 gap-4">
                    <movie-item v-for="(movie, index) in movies.results" :key="index" :movie="movie"
                        :genres="filteredGenres(movie.genre_ids)"></movie-item>
                </div>
            </section>

            <section class="mt-10 flex justify-center" v-if="movies.total_results">
                <Pagination :total-pages="total_pages" :total="total_results" :per-page="10" :current-page="currentPage"
                    @pagechanged="onPageChange" />
            </section>
        </template>
    </div>
</template>

<script  setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { Actions } from '@/store/enums/StoreEnums';
import Pagination from '@/components/ui/pagination/index.vue';
import HxButton from '@/components/ui/button/index.vue';
import HxInput from '@/components/ui/input/index.vue';
import Skeleton from '@/components/ui/Skeleton.vue';
import MovieItem from '@/components/app/movies/Item.vue';

const store = useStore();
const router = useRouter()
const route = useRoute()

let movies = ref<any>([])
let genres = ref<any>([])
let currentPage = ref<any>(1)
let total_pages = ref<any>(null)
let total_results = ref<any>(null)
let loading = ref<any>(false)
const filters = ref({
    release_start_date: route.query['primary_release_date.gte'] || '',
    release_end_date: route.query['primary_release_date.lte'] || '',
})

watch(filters.value, (currentValue, oldValue) => {
    let prev = { ...route.query }

    Object.assign(prev, { 'primary_release_date.gte': currentValue.release_start_date || undefined });

    Object.assign(prev, { 'primary_release_date.lte': currentValue.release_end_date || undefined });

    router.replace({ query: prev })

});

const fetchGenres = async () => {
    await store.dispatch(Actions.GET_GENRES)
    genres.value = store.getters.getGenres
}


const fetchMovies = async () => {
    loading.value = true
    try {
        await store.dispatch(Actions.GET_MOVIES, route.query)
        movies.value = store.getters.getMovies
        total_pages.value = movies.value.total_pages
        total_results.value = movies.value.total_results
        loading.value = false
    } catch (error) {
        loading.value = false
    }
}

const searchHandler = () => {
    fetchMovies()
}

const filteredGenres = (ids: Array): Array => {
    return genres.value.filter((genre) => {
        return ids.includes(genre.id);
    });
}

watch(currentPage, (currentValue, oldValue) => {
    router.replace({ query: { ...route.query, page: currentValue } }).then(() => {
        fetchMovies()
    });
});

const onPageChange = (page) => {
    currentPage.value = page;
    window.scrollTo(0, 0);
}

onMounted(async () => {
    let page = route.query.page
    currentPage.value = page ? page : 1
    fetchGenres()
    fetchMovies()

})

</script>

<style scoped>
</style>