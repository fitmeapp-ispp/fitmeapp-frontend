import axios from 'axios';

export default class UserService{

    getUsers(){
        return axios.get('/users')
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    saveUser(user){
        return axios.post('/users/', user);
    }
}
