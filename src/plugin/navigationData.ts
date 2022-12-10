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
    {
        id: 'test_calendar' ,
        title : 'Test_Calendar' ,
        icon : 'test-tube' ,
        link : '/test_calendar' ,
        group : false
    },
    {
        id: 'test_calendar' ,
        title : 'Test_SweetAlert' ,
        icon : 'test-tube' ,
        link : '/test_sweetAlert' ,
        group : false
    },
    {
        id: 'test_datatable' ,
        title : 'Test_DataTable' ,
        icon : 'test-tube' ,
        link : '/test_datatable' ,
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
