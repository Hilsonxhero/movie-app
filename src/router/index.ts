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
            {
                path: "/404",
                component: () =>
                    import(/* webpackChunkName: "404" */ "@/views/errors/404.vue"),
                name: "not-found"
            },
            {
                path: "/:match(.*)",
                redirect: "/404"
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
