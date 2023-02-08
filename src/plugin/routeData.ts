// import { checkPermission , Permission } from "../services/auth"
type Permission = 'นักศึกษา' | 'อาจารย์' | 'ผู้ดูแลระบบ' | 'ทุกคน'

import {ref } from 'vue'
export interface NavigationItem {
    id : string
    title : string
    subtitle? : string
    icon : string
    link? : string
    permission : Permission
    group? : boolean
    childs? : Array<SubNavigationItem>
}

export interface SubNavigationItem extends NavigationItem {

}

// icon from material design dont need mid- prefix
export const navigationMenu:NavigationItem[] = [
    {
        id: 'dashboard' ,
        title : 'หน้าหลัก' ,
        icon : 'mdi-monitor-dashboard' ,
        link : '/dashBoard' ,
        permission : 'ทุกคน' ,
    },
    {
        id: 'iot' ,
        title : 'งาน' ,
        subtitle: 'งานรายวิชา',
        icon : 'mdi-text-box-multiple-outline' ,
        permission : 'ทุกคน' ,
        childs : [
            {
                id: 'miniproject_iot' ,
                title : 'การทดลองที่ 9' ,
                subtitle : 'งานวิชา IOT' ,
                icon: 'mdi-text-box-outline' ,
                link : '/miniproject_iot' ,
                permission : 'ทุกคน' ,
            },
        ]
    },

    {
        id: 'test_Component' ,
        title : 'ทดสอบ' ,
        subtitle : 'Test Component' ,
        icon : 'mdi-test-tube' ,
        permission : 'ทุกคน' ,
        childs : [
            {
                id: 'test_calendar' ,
                title : 'V Calendar' ,
                icon : 'mdi-test-tube-empty' ,
                link : '/test/test_calendar' ,
                permission : 'ทุกคน'
            },
            {
                id: 'test_calendar' ,
                title : 'SweetAlert2' ,
                icon: 'mdi-test-tube-empty',
                link : '/test/test_sweetAlert' ,
                permission : 'ทุกคน'
            },
            {
                id: 'test_datatable' ,
                title : 'Data Table Manual' ,
                icon: 'mdi-test-tube-empty',
                link : '/test/Test_DataTableManual' ,
                permission : 'ทุกคน'
            },
        ]
    },
    {
        id: 'workShop' ,
        title : 'ลอง' ,
        subtitle : 'workshops' ,
        icon : 'mdi-cog' ,
        permission : 'ทุกคน' ,
        childs : [
            {
                id: 'EventReminder' ,
                title : 'เว็บแจ้งเตือนความจำ' ,
                subtitle : 'MiniProject' ,
                icon : 'mdi-calendar' ,
                link : '/EventReminder' ,
                permission: 'ทุกคน' ,

            },
            {
                id: 'typingTest' ,
                title : 'ทดสอบการพิมพ์' ,
                subtitle : 'Game' ,
                icon : 'mdi-gamepad' ,
                link : '/typingTest' ,
                permission: 'ทุกคน' ,

            },
            {
                id: 'SteamScrapingReview' ,
                title : 'ดึงข้อมูลรีวิวจากสตีม' ,
                icon : 'mdi-steam' ,
                subtitle : 'Web Scrapping' ,
                link : '/SteamScrapingReview' ,
                permission: 'ทุกคน' ,
            },
        ]
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
    // {
    //     id: 'test_calendar' ,
    //     title : 'V Calendar' ,
    //     subtitle : 'Test Component',
    //     icon : 'test-tube' ,
    //     link : '/test/test_calendar' ,
    //     group : false,
    //     permission : 'ทุกคน'
    // },
    // {
    //     id: 'test_calendar' ,
    //     title : 'SweetAlert2' ,
    //     subtitle : 'Test Component',
    //     icon : 'test-tube' ,
    //     link : '/test/test_sweetAlert' ,
    //     group : false,
    //     permission : 'ทุกคน'
    // },
    // {
    //     id: 'test_datatable' ,
    //     title : 'Data Table Manual' ,
    //     subtitle : 'Test Component',
    //     icon : 'test-tube' ,
    //     link : '/test/Test_DataTableManual' ,
    //     group : false,
    //     permission : 'ทุกคน'
    // },
    // {
    //     id: 'admin_login' ,
    //     title : 'Login' ,
    //     icon : 'login-variant' ,
    //     link : '/testBackend/login' ,
    //     group : false
    // },
]
