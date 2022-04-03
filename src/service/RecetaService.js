import axios from 'axios';

export default class RecetaService {

    getReceta(id) {
		return axios.get(`/recetas/${id}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    guardarReceta(receta){
        return axios.post('/recetas/', receta);
    }

    actualizarReceta(receta){
        return axios.put('/recetas/' + receta._id, receta);
    }

}