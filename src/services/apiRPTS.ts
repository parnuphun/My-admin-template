import axios from 'axios'

const url = 'http://loclhost:4000'
export default class apiRPTS {

    testDataTable(){
        return axios.get('/api/users')
    }

}
