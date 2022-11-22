import { createRouter , createWebHashHistory } from 'vue-router'

const router = createRouter({
    history : createWebHashHistory(),
    routes: [
        { path: '/' , component: () => import('../views/finalProject/Main/DashBoard.vue')} ,
        { path: '/dashBoard' , component: () => import('../views/finalProject/Main/DashBoard.vue')} ,

        { path : '/:pathMatch(.*)*' , component: ()=> import ('../views/finalProject/ErrorPage/PageNotFound404.vue')}
    ],
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
})

export default router
