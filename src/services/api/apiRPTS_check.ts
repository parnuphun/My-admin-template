import axios from 'axios'

const url = 'http://loclhost:4000'
export default class apiRPTS {

    // users
    studentRegister(studentData:Object){
        return axios.post('/api/studentRegister',studentData)
    }

    register(data:any){
        return axios.post('/api/register',data)
    }

    login(username:string , password:string , rememberMe?:boolean){
        let data = {
            username: username,
            password: password,
            rememberMe: false
        }

        if(rememberMe){
            data.rememberMe = rememberMe
        }

        return axios.post('/api/login',data)
    }

    forgorPassword(email:string){
        return axios.post('/api/forgotPassword',{email:email})
    }

    validateOTP(data:any){
        return axios.post('/api/validateOTP',data)
    }

    resetPassword(data:Object){
        return axios.post('/api/resetPassword',data)
    }

    // project
    createNewProject(data:Object){
        return axios.post('/api/createNewProject',data)
    }

    myProjectList(data:Object){
        return axios.post('/api/myProjectList',data)

    }

    // users
    // get all student
    getAllStudent(){
        return axios.get('/api/getAllStudent')
    }

}
