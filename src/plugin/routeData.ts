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
        link : '/admin/dashBoard' ,
        permission : 'ทุกคน' ,
    },
    {
        id: 'annoucement_important' ,
        title : 'ประกาศประชาสัมพันธ์' ,
        icon : 'mdi-information' ,
        link : '/admin/annoucement' ,
        permission : 'ทุกคน' ,
    },
    {
        id: 'news_blog' ,
        title : 'ข่าวสาร' ,
        icon : 'mdi-newspaper' ,
        link : '/admin/news' ,
        permission : 'ทุกคน' ,
    },
    {
        id: 'student_schedule' ,
        title : 'ตารางเรียน' ,
        icon : 'mdi-table' ,
        link : '/admin/studentSchedule' ,
        permission : 'ทุกคน' ,
    },
    {
        id: 'person_position' ,
        title : 'ทำเนียบบุคลากร' ,
        icon : 'mdi-account-box-multiple-outline' ,
        link : '/admin/personalDirectory' ,
        permission : 'ทุกคน' ,
    },
    {
        id: 'gallery' ,
        title : 'รูปภาพกิจกรรม' ,
        icon : 'mdi-image' ,
        link : '/admin/gallery' ,
        permission : 'ทุกคน' ,
    },
    {
        id: 'files' ,
        title : 'เอกสาร' ,
        icon : 'mdi-file' ,
        link : '/admin/files' ,
        permission : 'ทุกคน' ,
    },
    {
        id: 'person_management' ,
        title : 'ผู้ดูแลระบบ' ,
        icon : 'mdi-account' ,
        link : '/admin/adminManagement' ,
        permission : 'ทุกคน' ,
    },

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
