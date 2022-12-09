import { createRouter , createWebHashHistory } from 'vue-router'

const router = createRouter({
    history : createWebHashHistory(),
    routes: [
        // default redirect
        { path: '/' , component: () => import('../views/finalProject/Main/DashBoard.vue')} ,

        { path: '/dashBoard' , component: () => import('../views/finalProject/Main/DashBoard.vue')} ,
        { path: '/recycle' , component: () => import('../views/finalProject/Main/Recycle.vue')} ,


        // test coomponent
        { path: '/calendar' , component: () => import('../views/test/Calendar.vue')} ,
        { path: '/test_sweetAlert' , component: () => import('../views/test/sweetAlert2.vue')} ,


        // page not found 404
        { path: '/:pathMatch(.*)*' , component: ()=> import ('../views/finalProject/ErrorPage/PageNotFound404.vue')} ,
    ],
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
})

export default router
