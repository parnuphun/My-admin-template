import axios from 'axios'

const url = 'http://loclhost:4000'
export default class apiRPTS {
    testDataTable(page:number , perPage:number){
        return axios.get('/api/faker_users',{
            params:{
                page: page,
                perPage: perPage
            }
        })
    }

    delete(){
        return axios.get('https://catfact.ninja/fact')
    }
    productdetail(id:number,name:string){
        return axios.get(`https://catfact.ninja/fact/${id}/${name}`)
    }
}
