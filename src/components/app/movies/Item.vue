<template>
    <div class="col-span-12 md:col-span-6 lg:col-span-4">
        <div class="bg-gray-100 rounded-md p-2 hover:shadow-xl transition-shadow duration-200 ease-out">
            <div class="flex flex-wrap">
                <div class="w-5/12">
                    <div class="overflow-hidden">
                        <img class="h-full w-full rounded-md"
                            :src="`${secure_base_url}w220_and_h330_face${movie.backdrop_path}`" alt="movie item"
                            loading="lazy">
                    </div>
                </div>
                <div class="w-7/12">
                    <div class="p-4 flex flex-col flex-grow h-full">
                        <div class="h-full">
                            <router-link :to="{ name: 'movie detail', params: { id: movie.id } }">
                                <h4
                                    class="font-bold text-gray-700 hover:text-blue-600 transition-colors duration-200 ease-out">
                                    {{ movie.title }}</h4>
                            </router-link>
                        </div>



                        <div class="flex items-center">
                            <inline-svg class="w-6 h-6 text-gray-600" src="media/icons/calendar.svg" />
                            <span class="text-gray-500 text-sm ml-2 font-semibold">{{ movie.release_date
                            }}</span>
                        </div>

                        <ul class="flex items-center flex-wrap mt-4">
                            <li v-for="(genre, index) in genres" :key="index">
                                <span class="text-gray-600 text-sm mr-2 font-semibold">
                                    {{ genre.name }}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface genre {
    name: string,
    id?: number
}

interface Iprops {
    movie: {
        adult: false,
        backdrop_path: string,
        id: number,
        title: string,
        release_date: string
    },
    genres: Array<genre>
}
const props = defineProps<Iprops>()

const secure_base_url = process.env.SECURE_BASE_URL
</script>

<style scoped>
</style>