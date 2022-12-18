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
