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
    userRegister(userData:Object){
        return axios.post('/api/userRegister',userData)
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
    getAllUserByRole(data:{role: 1 | 2 | 3 | 'all'}){
        return axios.post('/api/getAllUserByRole',data)
    }

    // get user data
    getUserData(data:{userId:number}){
        return axios.post('/api/getUserData',data)
    }

    // update user data
    updateUserData(data:{userId:number,username:string,fname:string,lname:string,abouteMe:string,phone:string}){
        return axios.post('/api/updateUserData',data)
    }

    // update email
    updateEmail(data:{email:string,userId:number}){
        return axios.post('/api/updateEmail',data)
    }

    //confirm password
    confirmPassword(data:{password:string,userId:number}){
        return axios.post('/api/confirmPassword',data)
    }
}
