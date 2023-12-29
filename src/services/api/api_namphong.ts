import axios from 'axios'
import axiosAuth from '../auth'
// const url = process.env.API_NAMPHONG_SCHOOL
// const url = 'http://45.154.25.137:3001'
const url = 'http://localhost:3001'



export default class namphong_api {
    // log in addmin
    login(data:{username:string,password:string}){                
        return axios.post(url+'/login',data)
    }

    ///////////////////////////////////////////////////////////////////////////////
    // person directory 
    ///////////////////////////////////////////////////////////////////////////////
    //get all category list
    getAllPersonCategoryList(){
        return axiosAuth.post(url+'/getAllPersonCategoryList')
    }

    // add new position  
    addPosition(data:{position_name:string , position_category_id:number , 
        position_category_name:string ,credential_admin_fullname:string}){        
        return axiosAuth.post(url+'/addPosition',data)
    }
    // delete position 
    deletePosition(data:{position_id:number,position_name:string,credential_admin_fullname:string
    position_category_name:string}){        
        return axiosAuth.post(url+'/deletePosition',data)
    }
    //get all position 
    getAllPersonPositionList(data:{category_id:number}){
        return axiosAuth.post(url+'/getAllPersonPositionList',data)
    }
    //rename position 
    renamePosition(data:{
        position_id:number , 
        position_name:string , 
        position_old_name:string,
        credential_admin_fullname:string,
        position_category_id:number}){            
        return axiosAuth.post(url+'/renamePosition',data)
    }

    // add new person
    addPerson(data:FormData){
        return axiosAuth.post(url+'/addPerson',data)
    }
    // update person // old
    editPerson(data:FormData){
        return axiosAuth.post(url+'/editPerson',data)
    }

    // update person
    updatePerson(data:FormData){
        return axiosAuth.post(url+'/updatePerson',data)
    }

    //get all person list length 
    getAllpersonListLength(data:{person_category_id:number}){
        return axiosAuth.post(url+'/getAllpersonListLength',data)
    }

    // get all person list 
    getAllpersonList(data:{limit:number,start_item:number,person_category_id:number}){
        return axiosAuth.post(url+'/getAllpersonList',data)
    }

    // get all person (three table list )
    getPersonDirectoryTableTree(data:{category_id:number}){
        return axiosAuth.post(url+'/getPersonDirectoryTableTree',data)
    }
    // delete person
    deletePerson(data:{person_id:number,person_image:string,person_name:string,credential_admin_fullname:string}){
        return axiosAuth.post(url+'/deletePerson',data)
    }

    // seach person 
    searchPersons(data:{search_keyword:string,start_item:number,limit:number,person_category_id:number}){
        return axiosAuth.post(url+'/searchPersons',data)
    }

    ///////////////////////////////////////////////////////////////////////////////
    // file 
    ///////////////////////////////////////////////////////////////////////////////
    // get total file length 
    getFileLength(data:{selected_category:number}){
        return axiosAuth.post(url+'/getFileLength',data)
    }

    // get all files 
    getAllFiles(data:{selected_category:number,start_item:number,limit:number}){        
        return axiosAuth.post(url+'/getAllFiles',data)
    }

    // get all file catefory
    getAllCategoryFile(){
        return axiosAuth.post(url+'/getAllCategoryFile')
    }

    // add new file 
    addNewFile(data:FormData){
        return axiosAuth.post(url+'/addNewFile',data)
    }

    // edit file 
    editFile(data:FormData){
        return axiosAuth.post(url+'/editFile',data)
    }

    //  delete file
    deleteFile(data:{file_id:number,file_name_upload:string,credential_admin_fullname:string,file_name:string}){
        return axiosAuth.post(url+'/deleteFile',data)
    }

    // switch pin status
    fileSwitchPin(data:{file_id:number,file_pin_status:boolean,credential_admin_fullname:string,file_name:string}){
        return axiosAuth.post(url+'/fileSwitchPin',data)
    }

    // download file 
    downloadFile(data:{file_id:number,file_name_upload:string}){
        return axiosAuth.post(url+'/downloadFile',data)
    }

    // preview file 
    previewFile(data:{file_id:number,file_name_upload:string}){
        return axiosAuth.post(url+'/previewFile',data)
    }

    // search files
    searchFile(data:{search_keyword:string,selected_category:number,start_item:number,limit:number}){
        return axiosAuth.post(url+'/searchFile',data)
    }

    ///////////////////////////////////////////////////////////////////////////////
    // admin 
    ///////////////////////////////////////////////////////////////////////////////
    // get all admin length 
    getAllAdminLength(){
        return axiosAuth.post(url+'/getAllAdminLength')
    }

    // add new admin
    addNewAdmin(data:FormData){
        return axiosAuth.post(url+'/addNewAdmin',data)
    }

    // get all admins
    getAllAdmin(data:{limit:number,start_item:number}){
        return axiosAuth.post(url+'/getAllAdmin',data)
    }

    // delete admin 
    deleteAdmin(data:{image_name:string,user_id:number,user_fullname:string,credential_admin_fullname:string}){
        return axiosAuth.post(url+'/deleteAdmin',data)
    }

    // update admin 
    updateAdmin(data:FormData){
        return axiosAuth.post(url+'/updateAdmin',data)
    }

    // reset password
    resetPassword(data:{password:string,user_id:number,user_username:string,credential_admin_fullname:string,credential_admin_id:number}){
        return axiosAuth.post(url+'/resetPassword',data)
    }

    //search admin
    searchAdmin(data:{search_keyword:string,start_item:number,limit:number}){
        return axiosAuth.post(url+'/searchAdmin',data)
    }



    ///////////////////////////////////////////////////////////////////////////////
    // activity image 
    ///////////////////////////////////////////////////////////////////////////////
    // add new activity image
    addNewActivityImage(data:FormData){
        return axiosAuth.post(url+'/addNewActivityImage',data)
    }

    //get activity image
    getActivityImage(){
        return axiosAuth.post(url+'/getActivityImage')
    }

    //delete activity image
    deleteActivityImage(data:{activity_image_id:number,activity_image_cover_delete:string}){
        return axiosAuth.post(url+'/deleteActivityImage',data)
    }

    ///////////////////////////////////////////////////////////////////////////////
    // history logs 
    ///////////////////////////////////////////////////////////////////////////////
    //get history 
    getHistory(data:{limit:number,start_item:number}){
        return axiosAuth.post(url+'/getHistory',data)
    }

    // get history length
    getHistoryLength(){
        return axiosAuth.post(url+'/getHistoryLength')
    }

    // search history 
    searchHistory(data:{search_keyword:string,start_item:number,limit:number}){
        return axiosAuth.post(url+'/searchHistory',data)
    }
}

 