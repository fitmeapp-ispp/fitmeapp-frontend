import axios from 'axios';

export default class ExerciseService {

    saveExercise(exercise) { 
        return axios.post('/ejercicio_ejecuciones/', exercise)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    getExercises() {
        return axios.get('/ejercicios')
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
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    getEjecuciones(userId, fecha){
        return axios.get(`ejercicio_ejecuciones/done/${userId}/${fecha}`)
        .catch((e)=>{
            console.log('error' + e);
        });
    }
    
    getRecomendaciones(userId){
        return axios.get(`ejercicio_ejecuciones/recomendacion/${userId}`)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    guardarEjercicio(ejercicio){
        return axios.post('/ejercicios/', ejercicio);
    }

    actualizarEjercicio(ejercicio){
        return axios.put('/ejercicios/' + ejercicio._id, ejercicio);
    }

    buscarEjercicios(buscador, lazyParams){
        return axios.get('/ejercicio', {
            params:{
                pagina: lazyParams.pagina,
                zonaMuscular: lazyParams.filterMusc,
                materiales: lazyParams.filterMat,
                buscador: buscador,
            }
        })
        .then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

}