import { createRouter , createWebHistory } from 'vue-router'
import { isLoggedIn } from '../store/auth'
import MsgAlert from '../services/msgAlert'

const _msgAlert = new MsgAlert()

const router = createRouter({
    history : createWebHistory(),
    routes: [
        // default redirect
        { path: '/' , component: () => import('../views/finalProject/Main/DashBoard.vue')} ,

        { path: '/dashBoard' , component: () => import('../views/finalProject/Main/DashBoard.vue')} ,
        { path: '/recycle' , component: () => import('../views/finalProject/Main/Recycle.vue')} ,


        // check system
        { path: '/checkBackend/login' , component:() => import('../views/RPTS_Check_Backend/LoginPage.vue')},

        // test component
        { path: '/test/test_calendar' , component: () => import('../views/test/Test_Calendar.vue')} ,
        { path: '/test/Test_DataTableManual' , component: () => import('../views/test/Test_DataTableManual.vue')} ,
        { path: '/test/test_sweetAlert' , component: () => import('../views/test/Test_sweetAlert.vue')} ,

        // page not found 404
        { path: '/:pathMatch(.*)*' , component: ()=> import ('../views/finalProject/ErrorPage/PageNotFound404.vue')} ,
    ],
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
})

// route guard
router.beforeEach((to,from)=>{
    if(to.path.startsWith('/test/') && !isLoggedIn.value) {
        _msgAlert.confirm('กรุณาเข้าสู่ระบบก่อน','error').then((isConfirmed)=>{
            if(isConfirmed){
                router.push('/checkBackend/login')
            }
        })
        return false
    }
})

export default router
