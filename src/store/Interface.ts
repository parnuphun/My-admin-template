////////////////////////////////////////////////////////////////////////////////////////////////////
// Common
////////////////////////////////////////////////////////////////////////////////////////////////////
// data status
export type dataStatus = 'no_data' | 'loading_data' | 'err_data' | 'load_data_succ' | 'network_err'
// view data
export type viewData = 'detail' | 'table'
// admin data 
export interface credential {
    user_id:number
    user_image:string
    user_username:string
    user_firstname:string
    user_lastname:string
    user_email:string
    user_phone:string
    user_address:string
    user_fullname:string
    user_password:string
    user_token:string
    user_login_date:string
    user_rule: userRule
    user_delete: boolean
    user_base_image_path:string
    user_join_date:string
    user_latest_login_date:string

}
////////////////////////////////////////////////////////////////////////////////////////////////////
// person 
////////////////////////////////////////////////////////////////////////////////////////////////////
export interface personCategory {
    pd_category_id  : number,
    pd_category_name : string
}

export interface personPosition {
    pd_position_id : number,
    pd_position_name : string ,
    pd_position_order  : number ,
    pd_category_id   : number 
}

export interface personDirectoryResponse {
    pd_person_id : number,
    pd_person_image : string,
    pd_person_name : string ,
    pd_person_phone : string ,
    pd_person_email : string ,
    pd_person_descript : string ,
    pd_position_name? : string,
    pd_position_id : number ,
    pd_category_name? : string,
    pd_category_id : number ,
}

export interface personDirectoryTableTree {
    position_id : number , 
    position_name : string ,
    persons : Array<personDirectoryResponse>,
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// history logs
////////////////////////////////////////////////////////////////////////////////////////////////////
export type historyType = 'update' | 'add' | 'delete' | 'login'
export type historyFunction = 'person_directory' | 'admin' | 'schedule' | 'activity' | 'new' | 'file' | 'login'
export interface historyLogsResponse {
    history_logs_id : number ,
    history_logs_username : string,
    history_logs_type : historyType,
    history_logs_fucntion : historyFunction,
    history_logs_text : string ,
    history_logs_date : string ,
}
////////////////////////////////////////////////////////////////////////////////////////////////////
// username 
////////////////////////////////////////////////////////////////////////////////////////////////////

export type userRule = 'admin' | 'user'

export interface adminResponse {
    user_id:number
    user_image:string
    user_username:string
    user_firstname:string
    user_lastname:string
    user_email:string
    user_phone:string
    user_address:string
    user_rule: userRule
    user_delete: boolean
    user_join_date:string
    user_latest_login_date:string
}


////////////////////////////////////////////////////////////////////////////////////////////////////
// file
////////////////////////////////////////////////////////////////////////////////////////////////////
// * .ppt not use now 
type file_type =  'doc' | 'docx' | 'xlsx' | 'xls' | 'csv' | 'pdf' | 'ppt'

export interface fileCategoryRespone {
    file_category_id:number,
    file_category_name:string
}

export interface filesResponse {
    file_id:number,
    file_name_upload:string,
    file_name:string,
    file_pin:boolean,
    file_type:file_type,
    file_size:string,
    file_date:string,
    file_category_id:string
}

export interface imageGalleryType {
    text:string
    url:string
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// acticity image
////////////////////////////////////////////////////////////////////////////////////////////////////

export interface activityImageResonse { 
    activity_image_id: number,
    activity_image_cover: string ,
    activity_image_name: string ,
    activity_image_link: string ,
    activity_image_date: string
}


// old

// type userRoles = 'อาจารย์' | 'นักศึกษา' | 'ผู้ดูแลระบบ'

// export interface CredentialDataFromLocal {
//     Authorization: string
//     userAvatar: string
//     userEmail: string
//     userFname: string
//     userLname: string
//     userId: number
//     userRmutiId: string
//     userRoles: userRoles[]
// }

// export interface userDataRes {
//     User_Id: number
//     User_Avatar: string
//     User_Usernname: string
//     User_Email: string
//     User_Rmuti_Id: string
//     User_password: string
//     User_Fname: string
//     User_Lname: string
//     User_Phone: string
//     User_AboutMe: string
//     User_Joined_Date: Date
//     User_Email_Confirm: boolean
//     User_Deleted: boolean
//     User_Banned: boolean
//     USER_ROLES: string[]
// }

// export interface ProjectDataRes {
//     Project_Id: number
//     Project_Name_TH: string
//     Project_Name_EN: string
//     Project_Detail: string
//     Project_Avatar: string
//     Project_Status: { Project_Status_Id: number, Project_Status_Name: string }
//     Project_Created_By: number // user
//     Project_Created_Date: Date
//     Project_Deleted: boolean
// }

