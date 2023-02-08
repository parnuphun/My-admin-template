import axios from 'axios'
let url = 'http://localhost:4020'
export default class API_MOVIE_LIST {

    addNewTitle(data:{title:string,poster:string,status:number,rating:number}){
        return axios.post(url+'/movie_List/addNewTitle',data)
    }

    getAllMovieList(){
        return axios.get(url+'/movie_List/getAllMovieList')
    }

}
