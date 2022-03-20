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

    getAlimentosNoAlergeno(alergeno) {
		return axios.get(`/alimentos/alergenos/${alergeno}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    getCreados(username) {
		return axios.get(`/alimentos/creados/${username}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    getComida(tipo,fecha,username){
        console.log(tipo,fecha,username)
        return axios.get(`/comidas/comida/${fecha}/${username}/${tipo}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    getCarrusel(tipo,fecha,username){
        return axios.request(`/comidas/carrusel/${fecha}/${username}/${tipo}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }
 
    getFavoritos(username){
        return axios.get(`/alimentos/favoritos/`+ username)
        .then((response) => 
				response.data)
                .catch((e)=>{
                    console.log('error' + e);
                });
    }

    getUserKcak(username){
        return axios.get(`/users/`+ username)
        .then((response) => 
				response.data)
                .catch((e)=>{
                    console.log('error' + e);
                });
    }

    getBuscador(valor){
        return axios.get(`/alimentos/buscador/`+ valor)
        .then((response) => 
				response.data)
                .catch((e)=>{
                    console.log('error' + e);
                });
    }

    getRecientes(valor){
        return axios.get(`/alimentos/recientes/`+ valor)
        .then((response) => 
				response.data)
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

    deleteFromCarrusel(alimentoId, tipo, fecha,username){
        return axios.delete(`/comidas/carrusel/${alimentoId}/${tipo}/${fecha}/${username}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

}