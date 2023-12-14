import { createRouter , createWebHistory } from 'vue-router'
import MsgAlert from '../services/msgAlert'
// import authService from '../services/auth'
const _msgAlert = new MsgAlert()
// const _auth = new authService()

const router = createRouter({
    history : createWebHistory(),
    routes: [
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // สำหรับหน้าบ้าน client
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // default redirect
        { path: '/' , component: () => import('../views/School/User/SchoolMain.vue')} ,
        { path: '/about' , component: () => import('../views/School/User/SchoolAbout.vue')} ,
        { path: '/news' , component: () => import('../views/School/User/SchoolNews.vue')} ,
        { path: '/persons' , component: () => import('../views/School/User/SchoolPerson.vue')},
        { path: '/contact' , component: () => import('../views/School/User/SchoolContact.vue')},
        { path: '/gallery' , component: () => import('../views/School/User/SchoolGallery.vue')},
        { path: '/files' , component: () => import('../views/School/User/SchoolFiles.vue')},
 
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // สำหรับหลังบ้าน admin 
        // ตัวอย่าง /admin/ชือpath 
        /////////////////////////////////////////////////////////////////////////////////////////////////
        { path: '/login' , component: () => import('../views/School/Admin/login.vue')},
        { path: '/admin/dashboard' , component: () => import('../views/School/Admin/dashboard.vue')},
        { path: '/admin/annoucement' , component: () => import('../views/School/Admin/annoucement.vue')},
        { path: '/admin/news' , component: () => import('../views/School/Admin/news.vue') },
        { path: '/admin/studentSchedule' , component: () => import('../views/School/Admin/studentSchedule.vue')},
        { path: '/admin/personalDirectory' , component: () => import('../views/School/Admin/personalDirectory.vue')},
        { path: '/admin/gallery' , component: () => import('../views/School/Admin/gallery.vue')},
        { path: '/admin/files' , component: () => import('../views/School/Admin/files.vue')},
        { path: '/admin/adminManagement' , component: () => import('../views/School/Admin/adminManagement.vue')},
        
        // test admin ui 
        { path: '/testui' , component: () => import('../views/test/nomphong_ui_test.vue')},

        /////////////////////////////////////////////////////////////////////////////////////////////////
        // default page
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // page not found 404 for client
        { path: '/:pathMatch(.*)*' , component: ()=> import ('../views/Common/ErrorPage/PageServerErr500.vue')} ,
        // page not found 404 for admin 
        { path: '/admin/:pathMatch(.*)*' , component: ()=> import ('../views/Common/ErrorPage/PageNotFound404.vue')} ,

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
