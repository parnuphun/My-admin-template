import axios from 'axios'
import router from '../plugin/routes'

let token = ''
if(localStorage.getItem('Credential')){
    console.log('true');    
    const credential = JSON.parse(localStorage.getItem('Credential') || '')
    if(credential !== undefined || credential !== 'undefined' || credential !== null || credential !== ''){
        token = credential.user_token
    }
}

console.log(token,'<=token');

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
            router.push('/err401')
        }
        return res;
    }
  );

export default axiosAuth