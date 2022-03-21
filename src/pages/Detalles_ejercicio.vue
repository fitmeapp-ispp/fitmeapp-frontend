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
            <div class="card mb-0"  @click="recargar(related_exercises[0]._id)">
                <div class="text-900 font-medium text-xl">{{related_exercises[0].name}}
                    <span class="pi pi-sign-out p-button-icon"></span></div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card mb-0"  @click="recargar(related_exercises[1]._id)">
                <div class="text-900 font-medium text-xl">{{related_exercises[1].name}}
                    <span class="pi pi-sign-out p-button-icon"></span></div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card mb-0"  @click="recargar(related_exercises[2]._id)">
                <div class="text-900 font-medium text-xl">{{related_exercises[2].name}}
                    <span class="pi pi-sign-out p-button-icon"></span></div>
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
                    related_exercises: {}
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