import axios from 'axios';

export default class ExerciseService {

    saveExercise(exercise){ 
        return axios.post('/ejercicio_ejecuciones/', exercise)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    getExerciseByMuscle(muscleId){
        return axios.get(`/ejercicio/muscle/${muscleId}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    getExerciseById(id){
        return axios.get(`/ejercicio/${id}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }
    
    getRecomendaciones(userId){
        return axios.get(`ejercicio_ejecuciones/recomendacion/${userId}`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

}