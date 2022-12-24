import axios , {AxiosRequestConfig} from 'axios'

export function interceptor(config:AxiosRequestConfig<any>){
    if(localStorage.getItem('credential')){
        const credential = JSON.parse(localStorage.getItem('credential')!)
        const Authorization = credential.Authorization
        axios.defaults.headers.common['Authorization'] = Authorization
    }
    return config
}
