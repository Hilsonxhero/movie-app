<template>
    <div>
        <div class="my-10">
            <div>
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
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

interface credit {
    original_name: string
}

interface genre {
    name: string,
    id?: number
}

interface movie {
    adult: false,
    backdrop_path: string,
    id: number,
    title: string,
    release_date: string,
    overview: string,
    poster_path: string,
    budget: number,
    revenue: number,
    runtime: number,
    vote_average: number,
    vote_count: number,
    genres: Array<genre>,
    imdb_id: string,
    homepage: string,
}


interface Iprops {
    movie: movie,
    credits: Array<credit>
}

const props = defineProps<Iprops>()

const secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    return hDisplay + mDisplay
}

const secure_base_url = process.env.SECURE_BASE_URL


</script>

<style scoped>
</style>