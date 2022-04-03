import axios from 'axios';

export default class EjercicioEjecucionService {

    getRecomendados(){
        return axios.get('/ejercicio_ejecuciones/recomendacion')
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

}