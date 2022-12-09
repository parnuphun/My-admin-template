export interface NavigationItem {
    id : string
    title : string
    icon : string
    link : string
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
        group : false
    },
    {
        id: 'dashboard' ,
        title : 'วิเคราะห์' ,
        icon : 'poll' ,
        link : '/analysisGraph' ,
        group : false
    },
    {
        id: 'ASMFormList' ,
        title : 'รายชื่อแบบประเมิน' ,
        icon : 'list-box' ,
        link : '/ASMFormList' ,
        group : false
    },
    {
        id: '' ,
        title : 'หมวดหมู่แบบประเมิน' ,
        icon : 'book' ,
        link : '/ASMFormCategory' ,
        group : false
    },
    {
        id: '' ,
        title : 'เอกสาร' ,
        icon : 'folder' ,
        link : '/files' ,
        group : false
    },
    {
        id: '' ,
        title : 'พนักงาน' ,
        icon : 'account-tie' ,
        link : '/admin' ,
        group : false
    },
    {
        id: '' ,
        title : 'ถังขยะ' ,
        icon : 'trash-can' ,
        link : '/recycle' ,
        group : false
    },
    {
        id: '' ,
        title : 'ตั้งค่า' ,
        icon : 'cog' ,
        link : '/setting' ,
        group : false
    },
    {
        id: 'test_calendar' ,
        title : 'ทดสอบ_Calendar' ,
        icon : 'test-tube' ,
        link : '/calendar' ,
        group : false
    },
    {
        id: 'test_calendar' ,
        title : 'ทดสอบ_DataTable' ,
        icon : 'test-tube' ,
        link : '/dataTable' ,
        group : false
    },
    {
        id: 'food' ,
        title : 'food 1' ,
        icon : 'account-child' ,
        link : '/food' ,
        group : false
    },
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
