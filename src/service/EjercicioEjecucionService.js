import axios from 'axios';

export default class EjercicioEjecucionService {

    getRecomendados(username){
        return axios.get(`/ejercicio_ejecuciones/recomendacion/${username}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

}