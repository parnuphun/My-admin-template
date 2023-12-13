////////////////////////////////////////////////////////////////////////////////////////////////////
// file
////////////////////////////////////////////////////////////////////////////////////////////////////
type file_type =  'xlsx' | 'docx' | 'pdf'

export interface fileCategoryRespone {
    file_category_id:number,
    file_category_name:string
}

export interface filesResponse {
    file_id:number,
    file_name_upload:string,
    file_name:string,
    file_pin:boolean,
    file_type:file_type
    file_date:string,
    file_category_id:string
}

export interface imageGalleryType {
    text:string
    url:string
}

// old

type userRoles = 'อาจารย์' | 'นักศึกษา' | 'ผู้ดูแลระบบ'

export interface CredentialDataFromLocal {
    Authorization: string
    userAvatar: string
    userEmail: string
    userFname: string
    userLname: string
    userId: number
    userRmutiId: string
    userRoles: userRoles[]
}

export interface userDataRes {
    User_Id: number
    User_Avatar: string
    User_Usernname: string
    User_Email: string
    User_Rmuti_Id: string
    User_password: string
    User_Fname: string
    User_Lname: string
    User_Phone: string
    User_AboutMe: string
    User_Joined_Date: Date
    User_Email_Confirm: boolean
    User_Deleted: boolean
    User_Banned: boolean
    USER_ROLES: string[]
}

export interface ProjectDataRes {
    Project_Id: number
    Project_Name_TH: string
    Project_Name_EN: string
    Project_Detail: string
    Project_Avatar: string
    Project_Status: { Project_Status_Id: number, Project_Status_Name: string }
    Project_Created_By: number // user
    Project_Created_Date: Date
    Project_Deleted: boolean
}

