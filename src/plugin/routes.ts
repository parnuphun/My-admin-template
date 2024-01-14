import { createRouter , createWebHistory ,useRouter } from 'vue-router'
import MsgAlert from '../services/msgAlert'
// import authService from '../services/auth'
const _msgAlert = new MsgAlert()
// const _auth = new authService()

const router = createRouter({
    history : createWebHistory(),
    routes: [
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // default page
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // page not found 404 for client
        { path: '/:pathMatch(.*)*' , component: ()=> import ('../views/School/Error/Err_pageNotFound404.vue')} ,
        // page not found 404 for admin 
        { path: '/admin/:pathMatch(.*)*' , component: ()=> import ('../views/Common/ErrorPage/PageNotFound404.vue')} ,
        // 401 Unauthorized 
        { path: '/err401' , component: () => import('../views/School/Error/Err_Unauthorized 401.vue')},


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
        { path: '/admin/history' , component: () => import('../views/School/Admin/historyLogs.vue')},
        { path: '/admin/email' , component: () => import('../views/School/Admin/email.vue')},
        { path: '/admin/setting' , component: () => import('../views/School/Admin/setting.vue')},
        
        // test admin ui 
        { path: '/test_ui' , component: () => import('../views/School/Test/test_ui.vue')},
        { path: '/test_api_auth' , component: () => import('../views/School/Test/test_api_auth.vue')},



    ],
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
})

// route guard
router.beforeEach((to,from,next)=>{
      // Check if the user is trying to access an admin route
  if(to.path.startsWith('/admin')) {
      const hasCredentials = localStorage.getItem('Credential');
      if (!hasCredentials) {
        next('/err401')
      } else {
        next()
      }
  }else{
      next()
  }
})

export default router
