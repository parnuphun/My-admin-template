import axios from 'axios'

const url = 'http://45.154.25.137:3001'

export default class apiRPTS {
    // log in addmin
    login(data:{username:string,password:string}){        
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
}
