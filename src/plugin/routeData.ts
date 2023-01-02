import { checkPermission , Permission } from "../services/auth"
import {ref } from 'vue'
export interface NavigationItem {
    id : string
    title : string
    icon : string
    link : string
    permission : Permission
    group? : boolean
    childs? : {
        id : string
        title : string
        icon : string
        link : string
    }
}





// icon from material design dont need mid- prefix
export const navigationMenu:NavigationItem[] = [
    {
        id: 'dashboard' ,
        title : 'แดชบอร์ด' ,
        icon : 'monitor-dashboard' ,
        link : '/dashBoard' ,
        permission: 'ทุกคน' ,
    },
    {
        id: 'News' ,
        title : 'ข่าวสาร' ,
        icon : 'newspaper-variant-outline' ,
        link : '/testBackend/News' ,
        permission: 'ทุกคน' ,
    },
    {
        id: 'myReseachList' ,
        title : 'โครงการของฉัน' ,
        icon : 'text-box' ,
        link : '/testBackend/MyProjectList' ,
        permission: 'นักเรียน',
    },
    {
        id: 'StudentList' ,
        title : 'รายชื่อนักศึกษา' ,
        icon : 'account-school' ,
        link : '/testBackend/StudentList' ,
        permission : 'ผู้ดูแลระบบ',
    },
    {
        id: 'TeacherList' ,
        title : 'รายชื่ออาจารย์' ,
        icon : 'account-tie' ,
        link : '/testBackend/TeacherList' ,
        permission : 'ผู้ดูแลระบบ',
    },
    {
        id: 'files' ,
        title : 'เอกสาร' ,
        icon : 'file' ,
        link : '/testBackend/Files' ,
        permission: 'ทุกคน',
    },
    {
        id: 'MessageBox' ,
        title : 'กล่องข้อความ' ,
        icon : 'email' ,
        link : '/testBackend/messageBox' ,
        permission: 'ทุกคน',
    },
    {
        id: 'Setting' ,
        title : 'ตั้งค่า' ,
        icon : 'cog' ,
        link : '/testBackend/setting' ,
        permission: 'ทุกคน',
    },
    // {
    //     id: 'reseachList' ,
    //     title : 'รายชื่อโครงการทั้งหมด' ,
    //     icon : 'bookshelf' ,
    //     link : '/reseachList' ,
    //     group : false
    // },
    // {
    //     id: 'news' ,
    //     title : 'ข่าวสาร' ,
    //     icon : 'newspaper' ,
    //     link : '/news' ,
    //     group : false
    // },
    // {
    //     id: 'teachers' ,
    //     title : 'อาจารย์' ,
    //     icon : 'account-tie-woman' ,
    //     link : '/teachers' ,
    //     group : false
    // },
    // {
    //     id: 'files' ,
    //     title : 'เอกสาร' ,
    //     icon : 'file-multiple' ,
    //     link : '/files' ,
    //     group : false
    // },
    // {
    //     id: 'assessmentForm' ,
    //     title : 'แบบประเมิน' ,
    //     icon : 'clipboard-list' ,
    //     link : '/assessmentForm' ,
    //     group : false
    // },
    // {
    //     id: '' ,
    //     title : 'ถังขยะ' ,
    //     icon : 'trash-can' ,
    //     link : '/recycle' ,
    //     group : false
    // },
    // {
    //     id: '' ,
    //     title : 'ตั้งค่า' ,
    //     icon : 'cog' ,
    //     link : '/setting' ,
    //     group : false
    // },
    // {
    //     id: 'test_calendar' ,
    //     title : 'Test Calendar' ,
    //     icon : 'test-tube' ,
    //     link : '/test/test_calendar' ,
    //     group : false
    // },
    // {
    //     id: 'test_calendar' ,
    //     title : 'Test SweetAlert' ,
    //     icon : 'test-tube' ,
    //     link : '/test/test_sweetAlert' ,
    //     group : false
    // },
    // {
    //     id: 'test_datatable' ,
    //     title : 'Test DataTable MN' ,
    //     icon : 'test-tube' ,
    //     link : '/test/Test_DataTableManual' ,
    //     group : false
    // },
    // {
    //     id: 'admin_login' ,
    //     title : 'Login' ,
    //     icon : 'login-variant' ,
    //     link : '/testBackend/login' ,
    //     group : false
    // },
    // {
    //     id: 'group' ,
    //     title : 'กลุ่ม' ,
    //     icon : 'list-box' ,
    //     link : '' ,
    //     group : true ,
    //     childs : {
    //         id : 'hi' ,
    //         title : 'hi' ,
    //         icon : 'hi' ,
    //         link : '/hi' ,
    //     }
    // },
]
