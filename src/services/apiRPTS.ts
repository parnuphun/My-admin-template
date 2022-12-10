import axios from 'axios'

const url = 'http://loclhost:4000'
export default class apiRPTS {

    testDataTable(){
        return axios.get('/api/users')
    }
    delete(){
        return axios.get('https://catfact.ninja/fact')
    }
    productdetail(id:number,name:string){
        return axios.get(`https://catfact.ninja/fact/${id}/${name}`)
    }
}
