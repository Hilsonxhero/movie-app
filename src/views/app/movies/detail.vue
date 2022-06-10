<template>
    <div v-if="movie" class="container">

        <section class="">
            <div class="containerw bg-gray-100 p-5 rounded-md mt-10">
                <div class="flex items-center">
                    <hx-button :to="-1" variant="primary" pill icon="left-arrow-alt"
                        icon-class="text-white w-5 h-5 mr-3 mb-1">
                        Back
                    </hx-button>

                    <div class="flex flex-col ml-10">
                        <h2 class="text-md text-gray-800 font-bold">{{ movie.title }}</h2>
                        <h5 class="mt-1 text-md text-gray-600">{{ movie.tagline }}</h5>
                    </div>
                </div>
            </div>
        </section>

        <section class="my-10">
            <div>
                <Detail1 :movie="movie" :credits="credits" />
                <div class="mt-12">
                    <h2 class="font-bold mb-2">Rate it:</h2>
                    <Rating v-model="rate" @rate="rateHandler" />
                </div>
            </div>
        </section>
    </div>
    <div v-else>
        <Skeleton type="movie" :length="15" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex'
import { Actions } from '@/store/enums/StoreEnums';
import { useRoute } from 'vue-router';
import HxButton from '@/components/ui/button/index.vue';
import Skeleton from '@/components/ui/Skeleton.vue';
import Rating from '@/components/ui/rating/index.vue';
import Detail1 from '@/components/app/movies/detail.vue';

const store = useStore();
const route = useRoute();
let movie = ref<any>(null)
let credits = ref<any>([])
let id = ref<any>(null)

const rate = ref(0)


const rateHandler = async () => {
    const data = {
        id: id.value,
        value: rate.value,
        guest_session_id: '',
        session_id: ''

    }
    await store.dispatch(Actions.SEND_RATE, data)
}

onMounted(async () => {
    id.value = route.params.id
    await store.dispatch(Actions.GET_MOVIE_CREDITS, id.value)
    await store.dispatch(Actions.GET_MOVIE, id.value)
    movie.value = store.getters.getMovie
    let members = store.getters.getCredits
    credits.value = members.sort((a, b) => b.popularity - a.popularity).slice(0, 10);
})
</script>

<style lang="scss" scoped>
</style>