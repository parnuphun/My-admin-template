import axios from 'axios'
import { ref } from 'vue'

export interface JwtPayload {
    exp: number
    // Add other claims as needed
  }

export default class authService {
    async isLoggedIn(){
        if(localStorage.getItem('credential')){
            const credentialData = JSON.parse(localStorage.getItem('credential')!)
            const token = credentialData.Authorization.split(' ')[1]

            // กรณีมี Token
            if(token){
                // check token expired
                const isExpire = ref()

                await this.isTokenExpied(token).then((res)=>{
                    if(res.data.status === true){
                        isExpire.value =  true
                    }else{
                        isExpire.value = false
                    }
                })

                return isExpire.value

            }else{
                return false
            }
        }else{
            return false
        }
    }

    isTokenExpied(token:string){
        return axios.post('/api/isTokenExpied',{token:token})
    }
}

export type Permission = 'นักเรียน' | 'อาจารย์' | 'ผู้ดูแลระบบ' | 'ทุกคน'
export function checkPermission(permission:Permission , permissionTwo?:Permission):boolean{
    const credentialData = JSON.parse(localStorage.getItem('credential')!)
    const roles:Array<string> = credentialData.userRoles

    if(isAdmin()){
        return true
    }

    if(permission === 'ทุกคน'){
        return true
    }else{
        return roles.some(role => role === permission);
    }

}

 function isAdmin():boolean{
    const credentialData = JSON.parse(localStorage.getItem('credential')!)
    const roles:Array<string> = credentialData.userRoles

    return roles.some(role => role === 'ผู้ดูแลระบบ');
}
