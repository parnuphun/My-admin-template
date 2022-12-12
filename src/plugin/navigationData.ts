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
        title : 'Test Calendar' ,
        icon : 'test-tube' ,
        link : '/test/test_calendar' ,
        group : false
    },
    {
        id: 'test_calendar' ,
        title : 'Test SweetAlert' ,
        icon : 'test-tube' ,
        link : '/test/test_sweetAlert' ,
        group : false
    },
    {
        id: 'test_datatable' ,
        title : 'Test DataTable MN' ,
        icon : 'test-tube' ,
        link : '/test/Test_DataTableManual' ,
        group : false
    },
    {
        id: 'admin_login' ,
        title : 'Login' ,
        icon : 'login-variant' ,
        link : '/testBackend/login' ,
        group : false
    },
    {
        id: 'admin_login' ,
        title : 'Register' ,
        icon : 'account-plus' ,
        link : '/testBackend/register' ,
        group : false
    },
    {
        id: 'admin_login' ,
        title : 'Logout' ,
        icon : 'power' ,
        link : '/testBackend/register' ,
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
