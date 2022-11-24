import { createRouter , createWebHashHistory } from 'vue-router'

const router = createRouter({
    history : createWebHashHistory(),
    routes: [
        // default redirect
        { path: '/' , component: () => import('../views/finalProject/Main/DashBoard.vue')} ,

        { path: '/dashBoard' , component: () => import('../views/finalProject/Main/DashBoard.vue')} ,
        { path: '/ASMFormList' , component: () => import('../views/finalProject/Main/ASMFormList.vue')} ,
        { path: '/ASMFormCategory' , component: () => import('../views/finalProject/Main/ASMFormCategory.vue')} ,
        { path: '/recycle' , component: () => import('../views/finalProject/Main/Recycle.vue')} ,


        // test coomponent
        { path: '/calendar' , component: () => import('../views/test/Calendar.vue')} ,


        // page not found 404
        { path: '/:pathMatch(.*)*' , component: ()=> import ('../views/finalProject/ErrorPage/PageNotFound404.vue')} ,
    ],
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
})

export default router
