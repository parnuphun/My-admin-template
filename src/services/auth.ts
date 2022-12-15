import { ref , reactive } from "vue"

export default class authService {
    isLoggedIn(){
        if(localStorage.getItem('credential')){
            const credentialData = JSON.parse(localStorage.getItem('credential')||'')
            const token = credentialData.Authorization.split(' ')[1]
            // console.log(credentialData);
            // console.log(token);
            if(token){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }
}
