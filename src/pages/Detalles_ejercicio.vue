<template>
	<div class="grid">
        <div class="col-12 lg:col-2 xl:col-2">
        <h1>{{dataviewValue[0].name}}</h1>
        </div>
        <div class="col-12 lg:col-10 xl:col-10">
        <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2 lado_derecho" />
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="text-900 font-medium text-xl">Vídeo</div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="text-900 font-medium text-xl">Material</div>
                <br>
                <li v-for="item in dataviewValue[0].equipment" :key="item.message">
                     {{ equipmentList[item] }}
                </li>
                <br>
            </div>
        </div>
         <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="text-900 font-medium text-xl">Grupos musculares</div>
                <div>
                    <img  :src="require('../assets/images/muscle-'+ 1 +'.svg')" alt="">
                    <img :src="require('../assets/images/muscle-'+ dataviewValue[0].muscles[0] +'.svg')" alt="">
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                    <div class="text-900 font-medium text-xl">Descripción</div>
                    <br>
                    {{dataviewValue[0].description}}
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-4">

        </div>
        
        <div class="col-12 lg:col-10 xl:col-10">
                    <Button label="Marcar como realizado" class="p-button-success mr-2 mb-2" style="font-size : 20px;width:300px;height:100px"/>
        </div>
        
        <div class="col-12 lg:col-6 xl:col-12">
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
</style>

<script>
//import {FilterMatchMode,FilterOperator} from 'primevue/api'

export default {
        data() {
                return {
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
                    
                    dataviewValue: null,
                }
        },
        created(){
                this.fetchExercise();
        },
        methods: {
                fetchExercise(){
                    let uri = 'http://localhost:3000/exercise/4';
                    this.axios.get(uri).then((response) => {
                    this.dataviewValue = response.data;
                    console.log(this.dataviewValue);
                    });
                }
        }
}
</script>