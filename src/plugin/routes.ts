import { createRouter , createWebHashHistory } from 'vue-router'

const router = createRouter({
    history : createWebHashHistory(),
    routes: [
        // default redirect
        { path: '/' , component: () => import('../views/finalProject/Main/DashBoard.vue')} ,

        { path: '/dashBoard' , component: () => import('../views/finalProject/Main/DashBoard.vue')} ,
        { path: '/recycle' , component: () => import('../views/finalProject/Main/Recycle.vue')} ,


        // test component
        { path: '/test_calendar' , component: () => import('../views/test/Test_Calendar.vue')} ,
        { path: '/test_datatable' , component: () => import('../views/test/Test_DataTable.vue')} ,
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
