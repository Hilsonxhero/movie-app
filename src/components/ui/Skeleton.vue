<template>
    <div>
        <template v-if="type == 'movie'">
            <div class="skeleton  w-full p-8 flex flex-wrap">
                <div class="w-full md:w-1/3 lg:w-1/5 p-2" v-for="(item, index) in length" :key="index">
                    <div href="#"
                        class="flex flex-col  relative w-full bg-white overflow-hidden  translate-3d-none-after rounded ">
                        <div class="relative group text-primary-500" style="padding-top: 70%">
                            <div class="absolute top-0 left-0 h-full w-full"><span
                                    class="skeleton-box  transition-transform transform-center block h-full"></span>
                            </div>
                        </div>
                        <div class="flex flex-col flex-grow">
                            <div class=" pr-4 pt-4 mb-4 text-left relative flex-grow">
                                <h3 class="text-lg font-bold text-gray-darkest">
                                    <span class="skeleton-box h-5 w-1/6 inline-block mr-2"></span>
                                    <span class="skeleton-box h-5 w-1/2 inline-block mr-2"></span>
                                    <span class="skeleton-box h-5 w-2/4 inline-block mr-2"></span>
                                    <span class="skeleton-box h-5 w-2/5 inline-block mr-2"></span>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    type: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: false,
        default: 6
    }
})

</script>


<style lang="scss">
.skeleton-box {
    position: relative;
    overflow: hidden;
    background-color: #e2e8f0;

    &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(90deg,
                rgba(255, 255, 255, 0) 0,
                rgba(255, 255, 255, 0.2) 20%,
                rgba(255, 255, 255, 0.5) 60%,
                rgba(255, 255, 255, 0));
        animation: shimmer 0.5s infinite;
        content: '';
    }
}

@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}
</style>