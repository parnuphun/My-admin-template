import axios from 'axios'

const url = 'http://loclhost:4000'

interface OtpOption {
    email:string
    rmutiId?:string
    purpose: 'ForgotPassword' | 'EmailConfirm'
}

interface registerFirstTimeOption{
    rmutiId:string,
    username:string,
    fName:string,
    lName:string,
    email:string
}
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


    registerFirstTime(data:registerFirstTimeOption){
        return axios.post('/api/registerFirstTime',data)
    }

    OtpSend(data:OtpOption){
        return axios.post('/api/OtpSend',data)
    }

    validateOTP(data:Object){
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
