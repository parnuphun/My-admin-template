import { checkPermission , Permission } from "../services/auth"
import {ref } from 'vue'
export interface NavigationItem {
    id : string
    title : string
    subtitle? : string
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
        title : 'หน้าหลัก' ,
        icon : 'monitor-dashboard' ,
        link : '/dashBoard' ,
        permission: 'ทุกคน' ,
    },
    {
        id: 'miniproject_iot' ,
        title : 'แลป 9' ,
        subtitle : 'งานวิชา IOT' ,
        icon : 'text-box-multiple-outline' ,
        link : '/miniproject_iot' ,
        permission: 'ทุกคน' ,
    },
    {
        id: 'typingTest' ,
        title : 'ทดสอบการพิมพ์' ,
        subtitle : 'WorkShop' ,
        icon : 'content-save' ,
        link : '/typingTest' ,
        permission: 'ทุกคน' ,

    },
    {
        id: 'SteamScrapingReview' ,
        title : 'ดูดรีวิวจากสตรีม' ,
        subtitle : 'WorkShop' ,
        icon : 'content-save' ,
        link : '/SteamScrapingReview' ,
        permission: 'ทุกคน' ,

    },
    // {
    //     id: 'News' ,
    //     title : 'ข่าวสาร' ,
    //     icon : 'newspaper-variant-outline' ,
    //     link : '/testBackend/News' ,
    //     permission: 'ทุกคน' ,
    // },
    // {
    //     id: 'myReseachList' ,
    //     title : 'โครงการของฉัน' ,
    //     icon : 'text-box' ,
    //     link : '/testBackend/MyProject' ,
    //     permission: 'นักศึกษา',
    // },
    // {
    //     id: 'myReseachList' ,
    //     title : 'โครงการที่ดูแล' ,
    //     icon : 'folder-account' ,
    //     link : '/testBackend/MyProjectList' ,
    //     permission: 'อาจารย์',
    // },
    // {
    //     id: 'StudentList' ,
    //     title : 'รายชื่อนักศึกษา' ,
    //     icon : 'account-school' ,
    //     link : '/testBackend/StudentList' ,
    //     permission : 'ผู้ดูแลระบบ',
    // },
    // {
    //     id: 'TeacherList' ,
    //     title : 'รายชื่ออาจารย์' ,
    //     icon : 'account-tie' ,
    //     link : '/testBackend/TeacherList' ,
    //     permission : 'ผู้ดูแลระบบ',
    // },
    // {
    //     id: 'files' ,
    //     title : 'เอกสาร' ,
    //     icon : 'file' ,
    //     link : '/testBackend/Files' ,
    //     permission: 'ทุกคน',
    // },
    // {
    //     id: 'MessageBox' ,
    //     title : 'กล่องข้อความ' ,
    //     icon : 'email' ,
    //     link : '/testBackend/messageBox' ,
    //     permission: 'ทุกคน',
    // },
    // {
    //     id: 'Setting' ,
    //     title : 'ตั้งค่า' ,
    //     icon : 'cog' ,
    //     link : '/testBackend/setting' ,
    //     permission: 'ทุกคน',
    // },

    /////////////////////////////////////////////////////////////////////////////////////////////////
    // Test Component
    /////////////////////////////////////////////////////////////////////////////////////////////////
    {
        id: 'test_calendar' ,
        title : 'V Calendar' ,
        subtitle : 'Test Component',
        icon : 'test-tube' ,
        link : '/test/test_calendar' ,
        group : false,
        permission : 'ทุกคน'
    },
    {
        id: 'test_calendar' ,
        title : 'SweetAlert2' ,
        subtitle : 'Test Component',
        icon : 'test-tube' ,
        link : '/test/test_sweetAlert' ,
        group : false,
        permission : 'ทุกคน'
    },
    {
        id: 'test_datatable' ,
        title : 'Data Table Manual' ,
        subtitle : 'Test Component',
        icon : 'test-tube' ,
        link : '/test/Test_DataTableManual' ,
        group : false,
        permission : 'ทุกคน'
    },
    // {
    //     id: 'admin_login' ,
    //     title : 'Login' ,
    //     icon : 'login-variant' ,
    //     link : '/testBackend/login' ,
    //     group : false
    // },
]
