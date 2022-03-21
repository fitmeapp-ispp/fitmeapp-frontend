import axios from 'axios';

export default class ExerciseService {

    saveExercise(exercise){
        return axios.post('/done_exercise/', exercise);
    }

    getExerciseByMuscle(muscleId){
        return axios.get('/exercise/muscle/'+muscleId).then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

    getExerciseById(id){
        return axios.get('/exercise/'+id).then((response) => response.data)
        .catch((e)=>{
            console.log('error' + e);
        });
    }

}