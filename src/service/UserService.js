import axios from 'axios';

export default class AlimentoService {

    getUser(username){
        return axios.get(`/users/${username}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    guardar(user){
        return axios.post(`auth/register/`,user)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }
}