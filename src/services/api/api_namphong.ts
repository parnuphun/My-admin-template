import axios from 'axios'

const url = 'http://localhost:3000'

export default class apiRPTS {

    login(data:{username:string,password:string}){        
        return axios.post(url+'/login',data)
    }

    // position 
    addPosition(data:{position_name:string , position_category:number}){        
        return axios.post(url+'/addPosition',data)
    }
    deletePosition(data:{position_id:number}){        
        return axios.post(url+'/deletePosition',data)
    }
    allPosition(){
        return axios.get(url+'/allPosition')
    }
    RenamePosition(data:{position_id:number , position_name:string}){
        return axios.post(url+'/RenamePosition',data)
    }
    addPerson(data:FormData){
        return axios.post(url+'/addPerson',data)
    }
    getPersonDirectoryOne(data:{category_id:number}){
        return axios.post(url+'/getPersonDirectoryOne',data)
    }
}
