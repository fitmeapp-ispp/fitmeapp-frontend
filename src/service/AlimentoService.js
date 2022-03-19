import axios from 'axios';

export default class AlimentoService {

    getAlimentos(){
        return axios.get('/alimentos')
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    getAlimento(id) {
		return axios.get(`/alimentos/${id}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    getCarrusel(){
        return axios.request(`/alimentos/carrusel`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    getFavoritos(username){
        return axios.get(`/alimentos/favoritos/${username}`)
        .then((response) => response.data)
        .catch((e) =>{
            console.log('error' + e);
        });
    }

    getRecientes(username){
        return axios.get(`/alimentos/recientes/${username}`)
        .then((response) => response.data)
        .catch((e) =>{
            console.log('error' + e);
        });
    }

    getBuscador(valor){
        return axios.get(`/alimentos/buscador/${valor}`)
        .then((response) => response.data)
        .catch((e) =>{
            console.log('error' + e);
        });
    }

    actualizarAlimento(alimento){
        return axios.put('/alimentos/' + alimento._id, alimento);
    }

    guardarAlimento(alimento){
        return axios.post('/alimentos/', alimento);
    }

}