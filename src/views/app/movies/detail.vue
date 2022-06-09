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
            <div class="containerw">
                <div class="grid grid-cols-12 gap-10">
                    <div class="col-span-4">
                        <div class="">
                            <img class="rounded-xl" :src="`${secure_base_url}w500${movie.poster_path}`" alt="">
                        </div>
                    </div>
                    <div class="col-span-8">
                        <div class="flex flex-col space-y-3">
                            <div class="flex items-center justify-between">
                                <div class="text-gray-700 font-semibold">Budget</div>
                                <div class="text-gray-500">${{ movie.budget }}</div>

                            </div>
                            <div class="flex items-center justify-between">
                                <div class="text-gray-700 font-semibold">Revenue</div>
                                <div class="text-gray-500">${{ movie.revenue }}</div>

                            </div>
                            <div class="flex items-center justify-between">
                                <div class="text-gray-700 font-semibold">Release Date</div>
                                <div class="text-gray-500">{{ movie.release_date }}</div>

                            </div>
                            <div class="flex items-center justify-between">
                                <div class="text-gray-700 font-semibold">Runtime</div>
                                <div class="text-gray-500">{{ secondsToHms(movie.runtime * 60) }}</div>

                            </div>
                            <div class="flex items-center justify-between">
                                <div class="text-gray-700 font-semibold">Score</div>
                                <div class="text-gray-500">{{ movie.vote_average }} ({{ movie.vote_count
                                }})
                                </div>

                            </div>
                            <div class="flex items-center justify-between">
                                <div class="text-gray-700 font-semibold">Genres</div>
                                <div class="text-gray-500">
                                    <span class="ml-2" v-for="(genre, index) in movie.genres">{{ genre.name }}</span>
                                </div>

                            </div>
                            <div class="flex items-center justify-between">
                                <div class="text-gray-700 font-semibold">IMDB Link</div>
                                <a :href="movie.imdb_id" target="_blank" class="text-blue-500">Link</a>

                            </div>
                            <div class="flex items-center justify-between">
                                <div class="text-gray-700 font-semibold">Homepage Link</div>
                                <a :href="movie.homepage" target="_blank" class="text-blue-500">Link</a>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="mt-10">
                    {{ movie.overview }}
                </div>

                <div class="mt-16">
                    <h2 class="font-bold mb-2">Credit:</h2>
                    <span class="mr-2 text-gray-600" v-for="(credit, index) in credits" :key="index">{{
                            credit.original_name
                    
                    }}</span>

                </div>


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

const store = useStore();
const route = useRoute();
const secure_base_url = process.env.SECURE_BASE_URL
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

const secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    return hDisplay + mDisplay
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