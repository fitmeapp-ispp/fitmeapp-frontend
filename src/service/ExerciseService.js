import axios from 'axios';

export default class ExerciseService {

    saveExercise(exercise) { 
        return axios.post('/ejercicio_ejecuciones', exercise)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    updateExercise(exercise) { 
        return axios.put('/ejercicio_ejecuciones/'+exercise._id, exercise)
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

    getEjecucion(_id){
        return axios.get("ejercicio_ejecuciones/"+_id)
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

    async borrarEjecucion(_id) {
        try {
            let ejecucionBorrada = await axios.delete("/ejercicio_ejecuciones/"+_id)
            return ejecucionBorrada.data
        } catch (error) {
            console.log("Error: ", error)
        }
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

    async getEjecucionPorEjercicio(userId, fecha, exerciseId) {
        try {
            let ejecucion = await axios.get("/ejercicio_ejecuciones/"+userId+"/"+fecha+"/"+exerciseId)
            return ejecucion.data
        } catch (error) {
            console.log("Error: ", error)
        }
    }

}