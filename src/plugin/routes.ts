import { createRouter , createWebHistory } from 'vue-router'

const router = createRouter({
    history : createWebHistory(),
    routes: [
        // default redirect
        { path: '/' , component: () => import('../views/finalProject/Main/DashBoard.vue')} ,

        { path: '/dashBoard' , component: () => import('../views/finalProject/Main/DashBoard.vue')} ,
        { path: '/recycle' , component: () => import('../views/finalProject/Main/Recycle.vue')} ,


        // check system
        { path: '/ckeckBackEnd/login' , component:() => import('../views/RPTS_Check_Backend/LoginPage.vue')},

        // test component
        { path: '/test_calendar' , component: () => import('../views/test/Test_Calendar.vue')} ,
        { path: '/Test_DataTableManual' , component: () => import('../views/test/Test_DataTableManual.vue')} ,
        { path: '/test_sweetAlert' , component: () => import('../views/test/Test_sweetAlert.vue')} ,

        // page not found 404
        { path: '/:pathMatch(.*)*' , component: ()=> import ('../views/finalProject/ErrorPage/PageNotFound404.vue')} ,
    ],
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
})

export default router
