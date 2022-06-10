<template>
    <div class="flex flex-col min-h-screen items-center justify-center">
        <h1 class="text-5xl font-bold">404</h1>
        <div class="my-6">Sorry, Page Not Found.</div>

        <div>

            <hx-button :to="{ name: 'landing' }" variant="primary" pill icon="left-arrow-alt"
                icon-class="text-white w-5 h-5 mr-3 mb-1">
                Home
            </hx-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import HxButton from '@/components/ui/button/index.vue';
</script>

<style scoped>
</style>