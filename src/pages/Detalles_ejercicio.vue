<template>
	<div class="grid">
        <div class="col-12 lg:col-12 xl:col-12">
        <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2 lado_derecho" style="width:40px;height:40px" @click="goBack()"/>
        </div>
        <div class="col-12 lg:col-12 xl:col-12">
            <Toast/>
        <h1>{{dataviewValue[0].name}}</h1>
        </div>
         <div class="col-12 lg:col-2 xl:col-2">
            <div class="card mb-0">
                <div class="text-900 font-medium text-xl">Grupos musculares</div>
                <br>
                <div>
                    <li v-for="item in dataviewValue[0].muscles" :key="item.message">
                        {{ muscleList[item] }}
                    </li>
                    <li v-for="item in dataviewValue[0].muscles_secondary" :key="item.message">
                        {{ muscleList[item] }}
                    </li>
                    <!-- <img  :src="require('../assets/images/muscle-'+ 1 +'.svg')" alt=""> -->
                    <!-- <img :src="require('../assets/images/muscle-'+ dataviewValue[0].muscles[0] +'.svg')" alt="" style="height:200px"> -->
                    <!-- <div class="muscle-background" style="background-image: url(src/pages/assets/images/muscle-1.svg),url(/assets/images/muscle-6.svg);">
                    </div> -->
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-2 xl:col-2">
            <div class="card mb-0">
                <div class="text-900 font-medium text-xl">Material</div>
                <br>
                <li v-for="item in dataviewValue[0].equipment" :key="item.message">
                     {{ equipmentList[item] }}
                </li>
                <br>
            </div>
        </div>
        <div class="col-12 lg:col-5 xl:col-5">
            <div class="card mb-0">
                    <div class="text-900 font-medium text-xl">Descripción</div>
                    <br>
                    {{dataviewValue[0].description}}
            </div>
        </div>
        <div class="col-12 lg:col-3 xl:col-3">
            <div class="card mb-0">
                <div class="text-900 font-medium text-xl">Dificultad</div>
                <br>
                <div class="field">
					<Dropdown id="dificultad" v-model="nivel" :options="nivelesDificultad" optionLabel="name" placeholder="Selecciona el nivel"></Dropdown>
                </div>
                <Button label="Marcar como realizado" class="p-button-success mr-2 mb-2" @click="saveExercise"/>
            </div>
        </div>
        
        <div class="col-12 lg:col-12 xl:col-12">
        <h1>Ejercicios similares</h1>
        </div>
        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card mb-0">
                <div class="text-900 font-medium text-xl">Nombre del ejercicio</div>
                <br>
                <div class="text-900 font-small text-xl">Calorías</div>
                <div class="text-900 font-small text-xl">Material</div>
                <div class="text-900 font-small text-xl">Repeticiones</div>
                <div class="text-900 font-small text-xl">Tiempo</div>
                <div class="text-900 font-small text-xl">Dificultad</div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card mb-0">
                <div class="text-900 font-medium text-xl">Nombre del ejercicio</div>
                <br>
                <div class="text-900 font-small text-xl">Calorías</div>
                <div class="text-900 font-small text-xl">Material</div>
                <div class="text-900 font-small text-xl">Repeticiones</div>
                <div class="text-900 font-small text-xl">Tiempo</div>
                <div class="text-900 font-small text-xl">Dificultad</div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card mb-0">
                <div class="text-900 font-medium text-xl">Nombre del ejercicio</div>
                <br>
                <div class="text-900 font-small text-xl">Calorías</div>
                <div class="text-900 font-small text-xl">Material</div>
                <div class="text-900 font-small text-xl">Repeticiones</div>
                <div class="text-900 font-small text-xl">Tiempo</div>
                <div class="text-900 font-small text-xl">Dificultad</div>
            </div>
        </div> 
    </div>
</template>

<style>
        h1 {
            font-size: 30px;
        }
        .lado_derecho {
            float: right;
        }

        :root{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%23307916' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");}
</style>

<script>
//import {FilterMatchMode,FilterOperator} from 'primevue/api'
//import { useRoute } from 'vue-router';
import ExerciseService from '../service/ExerciseService';

export default {
        data() {
                return {
                    nivelesDificultad: [
					{name: "Fácil", code: "facil"},
					{name: "Intermedio", code: "intermedio"},
					{name: "Difícil", code: "dificil"}
                    ],
                    nivel: null,
                    exercise: {},
                    equipmentList: [
                        "Barbell",
                        "SZ-Bar",
                        "Dumbbell",
                        "Gym mat",
                        "Swiss Ball",
                        "Pull-up bar",
                        "none (bodyweight exercise)",
                        "Bench",
                        "Incline bench",
                        "Kettlebell"
                    ],
                    muscleList: [
                        "Biceps brachii",
                        "Anterior deltoid",
                        "Serratus anterior",
                        "Pectoralis major",
                        "Triceps brachii",
                        "Rectus abdominis",
                        "Gastrocnemius",
                        "Gluteus maximus",
                        "Trapezius",
                        "Quadriceps femoris",
                        "Biceps femoris",
                        "Latissimus dorsi",
                        "Brachialis",
                        "Obliquus externus abdominis",
                        "Soleus"
                    ],
                    exerciseService: null,
                    dataviewValue: null,
                }
        },
        created(){
                this.exerciseService = new ExerciseService();
                this.fetchExercise();
        },
        methods: {
                fetchExercise(){
                    let uri = 'http://localhost:3000/exercise/' + this.$route.params.ejercicioId;
                    this.axios.get(uri).then((response) => {
                    this.dataviewValue = response.data;
                    });
                },
                saveExercise(){
                    if(this.nivel){
                        this.exercise.username = "jose";
                        this.exercise.name = this.dataviewValue[0].name;
                        this.exercise.date = "19-3-2022";
                        if(this.nivel=="facil"){
                            this.exercise.kcal = 100;
                        }
                        else if(this.nivel=="intermedio"){
                            this.exercise.kcal = 300;
                        }
                        else if(this.nivel=="dificil"){
                            this.exercise.kcal = 500;
                        }
                        console.log(this.exercise);
                        this.exerciseService.saveExercise(this.exercise);
                    }
                    else{
                        this.$toast.add({severity:'error', summary: 'Fallo', detail: 'Debe seleccionar un nivel de dificultad.', life: 3000});
                    }
                },
                goBack(){
                    this.$router.push('/ejercicios/'); 
                }
        }
}
</script>