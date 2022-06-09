<template>
    <div>
        <section class="my-6">
            <div class="container">
                <Movies />
            </div>
        </section>

    </div>
</template>

<script setup lang="ts">
import Movies from '@/components/app/movies/List.vue';
import Skeleton from '@/components/ui/Skeleton.vue';
</script>

<style scoped>
</style>