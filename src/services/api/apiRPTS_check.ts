import axios from 'axios'

const url = 'http://loclhost:4000'
export default class apiRPTS {

    register(){
        return axios.get('/register')
    }

    login(username:string , password:string){
        const data = {
            username: username,
            password: password
        }
        return axios.post('/api/login',data)
    }
}
