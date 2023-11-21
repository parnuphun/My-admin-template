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
]
