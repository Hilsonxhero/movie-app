<template>
    <div>
        <Header />
        <main>
            <router-view></router-view>
        </main>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/app/header/Header.vue';
import Footer from '@/components/app/footer/Footer.vue';

</script>

<style scoped>
</style>