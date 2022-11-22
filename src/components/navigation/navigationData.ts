export interface NavigationItem {
    id : string
    title : string
    icon : string
    link : string
}

export const navigationMenu:NavigationItem[] = [
    {
        id: 'dashboard' ,
        title : 'แดชบอร์ด' ,
        icon : '' ,
        link : '/dashBoard'
    },
    {
        id: 'home' ,
        title : 'หน้าแรก' ,
        icon : '' ,
        link : '/home'
    },
    {
        id: 'lsit' ,
        title : 'รายการ' ,
        icon : '' ,
        link : '/list'
    },
]
