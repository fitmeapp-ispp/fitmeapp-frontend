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
        return axios.request(`/carrusel`)
        .then((response) => response.data)
        .catch((e)=>{
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