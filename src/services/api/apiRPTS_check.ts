import axios from 'axios'

const url = 'http://loclhost:4000'
export default class apiRPTS {

    register(data:any){
        console.log('check data befor send req',data);
        return axios.post('/api/register',data)
    }

    login(username:string , password:string){
        const data = {
            username: username,
            password: password
        }
        return axios.post('/api/login',data)
    }


}
