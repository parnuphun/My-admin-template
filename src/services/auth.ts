import axios from 'axios'
import router from '../plugin/routes'
import MsgAlert from './msgAlert';

let token = ''
if(localStorage.getItem('Credential')){
    const credential = JSON.parse(localStorage.getItem('Credential') || '')
    if(credential !== undefined || credential !== 'undefined' || credential !== null || credential !== ''){
        token = credential.user_token
    }
}





const axiosAuth = axios.create({
    headers: {
        // Include your token here
        'Authorization': `Bearer ${token}`,
    },
})

axiosAuth.interceptors.response.use(
    (res) => {
        // Check if the status_code is 401 redirect to login page
        if (res.data && res.data.status_code === 401) {
            // Redirect to the login page
            // const _msg = new MsgAlert()
            // _msg.toast_msg({title:'ระยะเวลาการใช้งานหมดแล้ว กรุณาเข้าสู่ระบบใหม่', timer:180, progressbar:true, icon:'warning'})
            router.push('/err401')
        }
        return res;
    }
  );

export default axiosAuth