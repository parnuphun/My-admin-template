// import { checkPermission , Permission } from "../services/auth"
type Permission = 'นักศึกษา' | 'อาจารย์' | 'ผู้ดูแลระบบ' | 'ทุกคน'
import { userRule } from '../store/Interface'

import {ref } from 'vue'
export interface NavigationItem {
    id : string
    title : string
    subtitle? : string
    icon : string
    link? : string
    permission : userRule
    group? : boolean
    childs? : Array<SubNavigationItem>
}

export interface SubNavigationItem extends NavigationItem {

}

// icon from material design dont need mid- prefix
export const navigationMenu:NavigationItem[] = [
    // {
    //     id: 'dashboard' ,
    //     title : 'หน้าหลัก' ,
    //     icon : 'mdi-monitor-dashboard' ,
    //     link : '/admin/dashBoard' ,
    //     permission : 'ทุกคน' ,
    // },
    {
        id: 'annoucement_important' ,
        title : 'ประกาศประชาสัมพันธ์' ,
        icon : 'mdi-bullhorn-variant-outline' ,
        link : '/admin/annoucement' ,
        permission : 'user' ,
    },
    {
        id: 'news_blog' ,
        title : 'ข่าวสาร' ,
        icon : 'mdi-newspaper' ,
        link : '/admin/news' ,
        permission : 'user' ,
    },
    {
        id: 'gallery' ,
        title : 'รูปภาพกิจกรรม' ,
        icon : 'mdi-image-outline' ,
        link : '/admin/gallery' ,
        permission : 'user' ,
    },
    {
        id: 'teaching_schedule' ,
        title : 'ตารางสอน' ,
        icon : 'mdi-table-clock' ,
        link : '/admin/teachingSchedule' ,
        permission : 'user' ,
    },
    {
        id: 'student_schedule' ,
        title : 'ตารางเรียน' ,
        icon : 'mdi-table' ,
        link : '/admin/studentSchedule' ,
        permission : 'user' ,
    },
    {
        id: 'student_schedule' ,
        title : 'หลักสูตร' ,
        icon : 'mdi-book-education-outline' ,
        link : '/admin/syllabus' ,
        permission : 'user' ,
    },
    {
        id: 'person_position' ,
        title : 'ทำเนียบบุคลากร' ,
        icon : 'mdi-account-box-multiple-outline' ,
        link : '/admin/personalDirectory' ,
        permission : 'user' ,
    },
    {
        id: 'files' ,
        title : 'เอกสาร' ,
        icon : 'mdi-file-outline' ,
        link : '/admin/files' ,
        permission : 'user' ,
    },
    {
        id: 'person_management' ,
        title : 'ผู้ดูแลระบบ' ,
        icon : 'mdi-account-outline' ,
        link : '/admin/adminManagement' ,
        permission : 'user' ,
    },
    {
        id: 'email' ,
        title : 'ส่งอีเมล' ,
        icon : 'mdi-email-outline' ,
        link : '/admin/email' ,
        permission : 'admin' ,
    },
    {
        id: 'history_logs' ,
        title : 'ประวัติการใช้งานระบบ' ,
        icon : 'mdi-clipboard-text-clock-outline' ,
        link : '/admin/history' ,
        permission : 'admin' ,
    },
    {
        id: 'setting' ,
        title : 'ตั้งค่า' ,
        icon : 'mdi-cog-outline' ,
        link : '/admin/setting' ,
        permission : 'admin' ,
    },
    // {
    //     id: 'test_ui' ,
    //     title : 'ทดสอบ user interface' ,
    //     icon : 'mdi-test-tube' ,
    //     link : '/test_ui' ,
    //     permission : 'ทุกคน' ,
    // },
    // {
    //     id: 'test_api_auth' ,
    //     title : 'ทดสอบ api auth' ,
    //     icon : 'mdi-test-tube' ,
    //     link : '/test_api_auth' ,
    //     permission : 'ทุกคน' ,
    // },
    // {
    //     id: 'test_Component' ,
    //     title : 'ทดสอบ' ,
    //     subtitle : 'Test Component' ,
    //     icon : 'mdi-test-tube' ,
    //     permission : 'ทุกคน' ,
    //     childs : [
    //         {
    //             id: 'test_calendar' ,
    //             title : 'V Calendar' ,
    //             icon : 'mdi-test-tube-empty' ,
    //             link : '/test/test_calendar' ,
    //             permission : 'ทุกคน'
    //         },
    //         {
    //             id: 'test_calendar' ,
    //             title : 'SweetAlert2' ,
    //             icon: 'mdi-test-tube-empty',
    //             link : '/test/test_sweetAlert' ,
    //             permission : 'ทุกคน'
    //         },
    //         {
    //             id: 'test_datatable' ,
    //             title : 'Data Table Manual' ,
    //             icon: 'mdi-test-tube-empty',
    //             link : '/test/Test_DataTableManual' ,
    //             permission : 'ทุกคน'
    //         },
    //     ]
    // },
]
