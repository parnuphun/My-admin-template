import axios from 'axios'

// const url = process.env.API_NAMPHONG_SCHOOL
// const url = 'http://45.154.25.137:3001'
const url = 'http://localhost:3001'

export default class namphong_api {
    // log in addmin
    login(data:{username:string,password:string}){   
        console.log(url+'/login',data);
             
        return axios.post(url+'/login',data)
    }

    // add new position  
    addPosition(data:{position_name:string , position_category:number}){        
        return axios.post(url+'/addPosition',data)
    }
    // delete position 
    deletePosition(data:{position_id:number}){        
        return axios.post(url+'/deletePosition',data)
    }
    //get all position 
    getAllPositionList(data:{category_id:number}){
        return axios.post(url+'/getAllPositionList',data)
    }
    //rename position 
    RenamePosition(data:{position_id:number , position_name:string}){
        return axios.post(url+'/RenamePosition',data)
    }

    // add new person
    addPerson(data:FormData){
        return axios.post(url+'/addPerson',data)
    }
    // update person
    editPerson(data:FormData){
        return axios.post(url+'/editPerson',data)
    }
    // get all person 
    getPersonDirectoryOne(data:{category_id:number}){
        return axios.post(url+'/getPersonDirectoryOne',data)
    }
    // delete person
    deletePerson(data:{person_id:number,person_image:string}){
        return axios.post(url+'/deletePerson',data)
    }

    ///////////////////////////////////////////////////////////////////////////////
    // file 
    ///////////////////////////////////////////////////////////////////////////////
    // get total file length 
    getFileLength(data:{selected_category:number}){
        return axios.post(url+'/getFileLength',data)
    }


    // get all files 
    getAllFiles(data:{selected_category:number,start_item:number,limit:number}){        
        return axios.post(url+'/getAllFiles',data)
    }

    // get all file catefory
    getAllCategoryFile(){
        return axios.post(url+'/getAllCategoryFile')
    }

    // add new file 
    addNewFile(data:FormData){
        return axios.post(url+'/addNewFile',data)
    }

    // edit file 
    editFile(data:FormData){
        return axios.post(url+'/editFile',data)
    }

    //  delete file
    deleteFile(data:{file_id:number,file_name_upload:string}){
        return axios.post(url+'/deleteFile',data)
    }

    // switch pin status
    fileSwitchPin(data:{file_id:number,file_pin_status:boolean}){
        return axios.post(url+'/fileSwitchPin',data)
    }

    // download file 
    downloadFile(data:{file_id:number,file_name_upload:string}){
        return axios.post(url+'/downloadFile',data)
    }

    // preview file 
    previewFile(data:{file_id:number,file_name_upload:string}){
        return axios.post(url+'/previewFile',data)
    }

    ///////////////////////////////////////////////////////////////////////////////
    // admin 
    ///////////////////////////////////////////////////////////////////////////////
    // add new admin
    addNewAdmin(data:FormData){
        return axios.post(url+'/addNewAdmin',data)
    }

    // get all admins
    getAllAdmin(){
        return axios.post(url+'/getAllAdmin')
    }

    // delete admin 
    deleteAdmin(data:{image_name:string,user_id:number}){
        return axios.post(url+'/deleteAdmin',data)
    }

    // update admin 
    updateAdmin(data:FormData){
        return axios.post(url+'/updateAdmin',data)
    }

    // search files
    searchFile(data:{search_keyword:string,selected_category:number,start_item:number,limit:number}){
        return axios.post(url+'/searchFile',data)
    }

    ///////////////////////////////////////////////////////////////////////////////
    // activity image 
    ///////////////////////////////////////////////////////////////////////////////
    // add new activity image
    addNewActivityImage(data:FormData){
        return axios.post(url+'/addNewActivityImage',data)
    }

    //get activity image
    getActivityImage(){
        return axios.post(url+'/getActivityImage')
    }

    //delete activity image
    deleteActivityImage(data:{activity_image_id:number,activity_image_cover_delete:string}){
        return axios.post(url+'/deleteActivityImage',data)
    }

    //get history 
    getHistory(data:{limit:number,start_item:number}){
        return axios.post(url+'/getHistory',data)
    }

    // get history length
    getHistoryLength(){
        return axios.post(url+'/getHistoryLength')
    }

    // search history 
    searchHistory(data:{search_keyword:string,start_item:number,limit:number}){
        return axios.post(url+'/searchHistory',data)
    }
}
