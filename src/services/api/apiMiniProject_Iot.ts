import axios from 'axios'
let url = 'http://localhost:4020'
export default class API_MINI_IOT {
    getTempAndHumidityData(){
        return axios.get(url+'/getTempAndHumidityData')
    }

    updateLedStatus(status:number){
        return axios.get(url+'/updateLedStatus/'+String(status))
    }
}
