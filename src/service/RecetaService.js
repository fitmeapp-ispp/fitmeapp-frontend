import axios from 'axios';

export default class RecetaService{

    getRecetas() {
        return axios.get('/recetas')
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    saveReceta(receta) {
        return axios.post('/recetas/', receta);
    }


    deleteReceta(recetaID){
        return axios.delete(`/recetas/${recetaID}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

}