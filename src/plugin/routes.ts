import { createRouter , createWebHistory } from 'vue-router'
import MsgAlert from '../services/msgAlert'
// import authService from '../services/auth'
import { ref } from 'vue'

const _msgAlert = new MsgAlert()
// const _auth = new authService()

const router = createRouter({
    history : createWebHistory(),
    routes: [
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // default
        /////////////////////////////////////////////////////////////////////////////////////////////////
        { path: '/' , component: () => import('../views/School/User/SchoolMain.vue')} ,
        { path: '/about' , component: () => import('../views/School/User/SchoolAbout.vue')} ,
        { path: '/news' , component: () => import('../views/School/User/SchoolNews.vue')} ,
        { path: '/persons' , component: () => import('../views/School/User/SchoolPerson.vue')},

        { path: '/admin/test' , component: () => import('../views/School/Admin/dashboard.vue')},
        // page not found 404
        { path: '/:pathMatch(.*)*' , component: ()=> import ('../views/Common/ErrorPage/PageNotFound404.vue')} ,

        // test component
        { path: '/test/test_calendar' , component: () => import('../views/test/Test_Calendar.vue')} ,
        { path: '/test/Test_DataTableManual' , component: () => import('../views/test/Test_DataTableManual.vue')} ,
        { path: '/test/test_sweetAlert' , component: () => import('../views/test/Test_sweetAlert.vue')} ,

        { path: '/admin' , component: () => import('../views/Common/Main/DashBoard.vue')} ,
        { path: '/recycle' , component: () => import('../views/Common/Main/Recycle.vue')} ,


    ],
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
})

// route guard
router.beforeEach((to,from)=>{

    // // ถ้า login แล้วจะกลับมาที่หน้า Login อีกไม่ได้
    // _auth.isLoggedIn().then((isLoggedIn)=>{
    //     if((to.path.startsWith('/testBackend/login')) && isLoggedIn === true){
    //         router.push('/')
    //         return false
    //     }
    // })

    // // ยกเว้น path forgot password
    // if((from.path.startsWith('/testBackend/login') && to.path.startsWith('/testBackend/forgotPassword'))
    //     || (from.path.startsWith('/') && to.path.startsWith('/testBackend/forgotPassword'))){
    //     return true
    // }

    // // กรณีไม่ไปหน้าอื่นที่ไม่ใช่หน้า login แล้วยังไม่ได้ล็อคอินให้ login ก่อน
    // _auth.isLoggedIn().then((isLoggedIn)=>{
    //     if(!to.path.startsWith('/testBackend/login') && isLoggedIn === false) {
    //         _msgAlert.confirm('หมดอายุการใช้งาน','error').then((isConfirmed)=>{
    //             if(isConfirmed){
    //                 router.push('/testBackend/login')
    //             }
    //         })
    //         return false
    //     }
    // })

})

export default router
