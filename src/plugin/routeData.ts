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
        id: 'StudentList' ,
        title : 'รายชื่อนักศึกษา' ,
        icon : 'account-school' ,
        link : '/testBackend/StudentList' ,
        group : false
    },
    {
        id: 'myReseachList' ,
        title : 'โครงการของฉัน' ,
        icon : 'text-box' ,
        link : '/testBackend/MyProjectList' ,
        group : false
    },
    {
        id: 'reseachList' ,
        title : 'รายชื่อโครงการทั้งหมด' ,
        icon : 'bookshelf' ,
        link : '/reseachList' ,
        group : false
    },
    {
        id: 'news' ,
        title : 'ข่าวสาร' ,
        icon : 'newspaper' ,
        link : '/news' ,
        group : false
    },
    {
        id: 'MessageBox' ,
        title : 'กล่องข้อความ' ,
        icon : 'mailbox-up' ,
        link : '/testBackend/MessgeBox' ,
        group : false
    },
    {
        id: 'teachers' ,
        title : 'อาจารย์' ,
        icon : 'account-tie-woman' ,
        link : '/teachers' ,
        group : false
    },
    {
        id: 'files' ,
        title : 'เอกสาร' ,
        icon : 'file-multiple' ,
        link : '/files' ,
        group : false
    },
    {
        id: 'assessmentForm' ,
        title : 'แบบประเมิน' ,
        icon : 'clipboard-list' ,
        link : '/assessmentForm' ,
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
