import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import("@/layouts/app/Layout.vue"),
        children: [
            {
                path: '/',
                name: 'landing',
                component: () => import(/* webpackChunkName: "landing" */ "@/views/app/landing.vue"),
            },

            {
                path: '/movie/:id',
                name: 'movie detail',
                component: () => import(/* webpackChunkName: "detail" */ "@/views/app/movies/detail.vue"),
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
