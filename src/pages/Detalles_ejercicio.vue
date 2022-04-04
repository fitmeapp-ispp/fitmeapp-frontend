<template>
	<div class="grid">
        <Toast/>
        <div class="grid card col-12">
            <div class="col-12 lg:col-11 md:col-11">
                <h1 style="color:#256029;">{{dataviewValue[0].name}}</h1>
            </div>
            <Button label="Volver" class="p-button-success mb-3 col-12 lg:col-1 md:col-1" @click="goBack()"/>
            <div class="grid col-12 justify-content-between align-items-center">
                <div class="card flex col-12 lg:col-3 justify-content-center align-items-center border-1 surface-border">
                    <Galleria :value="dataviewValue[0].images" :numVisible="1" :circular="true" :autoPlay="true" :transitionInterval="750" containerStyle="max-width: 800px; margin: auto">
                    <template #item="slotProps">
                        <img :src="slotProps.item" style="display: block;" class="imagenEjercicio"/>
                    </template>
                    </Galleria>
                    <img :src="sinImagen" v-if="dataviewValue[0].images.length === 0" style="display:block;background-color:#E0E0E0;border-radius:20px;border-style:solid;" 
                            class="imagenEjercicio" containerStyle="max-width: 800px; margin: auto"/>
                </div>
                <div class="col-12 lg:col-3">
                    <div class="grid">
                        <div class="card col-12 text-center border-1 surface-border">
                            <div class="text-900 font-medium text-xl">Grupos musculares</div>
                            <li v-for="item in dataviewValue[0].muscles" :key="item.message">
                                {{ muscleList[item] }}
                            </li>
                            <li v-for="item in dataviewValue[0].muscles_secondary" :key="item.message">
                                {{ muscleList[item] }}
                            </li>
                        </div>
                        <div class="card col-12 text-center border-1 surface-border">
                            <div class="text-900 font-medium text-xl">Material</div>
                            <li v-for="item in dataviewValue[0].equipment" :key="item.message">
                                {{ equipmentList[item] }}
                            </li>
                            <p v-if="dataviewValue[0].equipment.length === 0">
                                Este ejercicio no necesita materiales
                            </p>
                        </div>
                    </div>
                </div>
                <div class="card col-12 lg:col-4 text-justify border-1 surface-border">
                    <div class="text-900 font-medium text-xl">Descripción</div>
                        <p class="p-flex">{{dataviewValue[0].description}}</p>
                        <p class="p-flex text-center" v-if="!dataviewValue[0].description">
                            Sin descripción
                        </p> 
                </div>
            </div>
            <div class="col-12 formgroup-inline justify-content-center align-items-center">
                <div class="field">
                    <p class="text-900 font-medium text-xl">Dificultad</p>
                </div>
                <div class="field">
                    <Dropdown id="dificultad" v-model="nivel" :options="nivelesDificultad" optionLabel="name" placeholder="Selecciona el nivel"></Dropdown>
                </div>
                <div class="field">
                    <Button label="Marcar como realizado" class="p-button-success" @click="saveExercise"/>
                </div>
            </div>
        </div>
        <div class="col-12">
            <h1 style="color:#256029;">Ejercicios similares</h1>
        </div>
        <div class="col-12">
            <DataView :value="related_exercises" layout="grid" :totalRecords="3" :rows="1">
                <template #grid="slotProps1">
                    <div class="col-12 lg:col-4 md:col-6">
                        <div class="grid card m-3 border-1 surface-border">
                            <div class="col-12 lg:col-8">
                                <h3 style="color:#256029;">{{slotProps1.data.name}}</h3>
                            </div>
                            <Button label="Detalles" class="p-button-success mb-2 col-12 lg:col-4"  @click="recargar(slotProps1.data._id)"/>
                            <div class="col-12 flex justify-content-center align-items-center">
                                <Galleria :value="slotProps1.data.images" :numVisible="1" :circular="true" :autoPlay="true" :transitionInterval="750" containerStyle="max-width: 800px; margin: auto">
                                    <template #item="slotProps2">
                                        <img :src="slotProps2.item" style="display: block;" class="imagenEjercicio"/>
                                    </template>
                                </Galleria>
                                <img :src="sinImagen" v-if="slotProps1.data.images.length === 0" style="max-width:300px;display:block;background-color:#E0E0E0;border-radius:20px;border-style:solid;" 
                                    class="imagenEjercicio" containerStyle="max-width: 800px; margin: auto"/>
                            </div>
                        </div>
                    </div>
                </template>
            </DataView> 
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
import ExerciseService from '../service/ExerciseService';
import sinImagen from '../../public/images/sin_imagen_ejercicio.png';

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
                    related_exercises: {},
                    sinImagen: sinImagen,
                }
        },
        created(){
                this.exerciseService = new ExerciseService();
                this.fetchExercise();
        },
        methods: {
                fetchExercise(){
                    this.exerciseService.getExerciseById(this.$route.params.ejercicioId).then(data => {this.dataviewValue = data
                    console.log(this.dataviewValue[0].muscles[0]);
                    this.exerciseService.getExerciseByMuscle(this.dataviewValue[0].muscles[0]).then(data => {this.related_exercises = data
                    console.log(this.related_exercises);});
                    });
                    
                },
                saveExercise(){
                    if(this.nivel){
                        this.exercise.name = this.dataviewValue[0].name;
                        this.exercise.username = this.$store.state.username;
                        var d = new Date();
                        this.exercise.date = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
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
                        this.$toast.add({severity:'success', summary: 'Éxito', detail: 'El ejercicio se ha añadido a la lista de realizados.', life: 3000});
                    }
                    else{
                        this.$toast.add({severity:'error', summary: 'Fallo', detail: 'Debe seleccionar un nivel de dificultad.', life: 3000});
                    }
                },
                goBack(){
                    this.$router.push('/ejercicios/'); 
                },
                recargar(id){
                    location.href = "/ejercicio/detalles/"+id;
                },
        }
}
</script>

<style>
.imagenEjercicio{
  width: 100%;
  height: auto;
}
</style>