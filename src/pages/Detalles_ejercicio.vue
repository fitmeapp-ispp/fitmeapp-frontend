<template>
	<div class="grid" v-if="dataviewValue">
        <Toast position="bottom-right"/>
        <div class="grid card col-12">
            <div class="col-12 lg:col-11 md:col-11">
                <h1 style="color:#256029;">{{dataviewValue.name}}</h1>
            </div>
            <Button label="Volver" class="p-button-success mb-3 col-12 lg:col-1 md:col-1" @click="goBack()"/>
            <div class="grid col-12 justify-content-between align-items-center">
                <div class="card flex col-12 lg:col-3 justify-content-center align-items-center border-1 surface-border">
                    <Galleria :value="dataviewValue.images" :numVisible="1" :circular="true" :autoPlay="true" :transitionInterval="750" containerStyle="max-width: 800px; margin: auto">
                    <template #item="slotProps">
                        <img :src="slotProps.item" style="display: block;" class="imagenEjercicio"/>
                    </template>
                    </Galleria>
                    <img :src="sinImagen" v-if="dataviewValue.images.length === 0" style="max-width:300px;display:block;background-color:#E0E0E0;border-radius:20px;border-style:solid;" 
                            class="imagenEjercicio" containerStyle="max-width: 800px; margin: auto"/>
                </div>
                <div class="col-12 lg:col-3">
                    <div class="grid">
                        <div class="card col-12 border-1 surface-border">
                            <div class="text-900 font-medium text-xl text-center">Grupos musculares</div>
                            <ul>
                                <li class="mt-3 font-bold" v-for="item in dataviewValue.muscles" :key="item.message">
                                    {{ muscleList[item] }}
                                </li>
                            </ul>
                            <ul>
                                <li v-for="item in dataviewValue.muscles_secondary" :key="item.message">
                                    {{ muscleList[item] }}
                                </li>
                            </ul>
                            <p v-if="dataviewValue.muscles.length === 0" class="mt-3 text-center">
                                No hay datos disponibles
                            </p>
                        </div>
                        <div class="card col-12 border-1 surface-border">
                            <div class="text-900 font-medium text-xl text-center">Material</div>
                            <ul>
                                <li class="mt-3 text-center" v-for="item in dataviewValue.equipment" :key="item.message">
                                    {{ equipmentList[item] }}
                                </li>
                            </ul>
                            <p v-if="dataviewValue.equipment.length === 0"  class="mt-3 text-center">
                                Este ejercicio no necesita materiales
                            </p>
                        </div>
                    </div>
                </div>
                <div class="card col-12 lg:col-4 text-justify border-1 surface-border">
                    <div class="text-900 font-medium text-xl text-center">Descripción</div>
                        <p class="p-flex mt-3">{{dataviewValue.description}}</p>
                        <p class="p-flex text-center mt-3" v-if="!dataviewValue.description" >
                            Sin descripción
                        </p> 
                </div>
            </div>
            <div class="col-12 formgroup-inline justify-content-center align-items-center">
                <div class="field">
                    <label for="intensidad">Intensidad*: </label>
                    <Dropdown id="Intensidad" v-model="intensidad" :options="nivelesDificultad" optionLabel="name" placeholder="Selecciona la intensidad"></Dropdown>
                </div>
                <div class="field">
                    <label for="minutos">Minutos*: </label>
                    <InputNumber id="minutos" mode="decimal" :min="0" v-model="minutos" showButtons decrementButtonClass="p-button-success" incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"/>
                </div>
                <div class="field">
                    <Button label="Marcar como realizado" class="p-button-success" @click="saveExercise()" v-if="!$route.fullPath.includes('editar')"/>
                    <Button label="Guardar cambios" class="p-button-success" @click="updateExercise()" v-if="$route.fullPath.includes('editar')"/>
                </div>
            </div>
        </div>
        <div class="col-12">
            <h1 style="color:#256029;">Ejercicios similares</h1>
        </div>
        <div class="col-12">
            <DataView v-if="relatedExercises" :value="relatedExercises" layout="grid" :totalRecords="3" :rows="1">
                <template #grid="slotProps1">
                    <div class="col-12 lg:col-4 md:col-6">
                        <div class="grid card m-3 border-1 surface-border">
                            <div class="col-12 lg:col-8">
                                <h5 class="p-flex" style="color:#256029;">{{slotProps1.data.name}}</h5>
                            </div>
                            <Button label="Detalles" class="p-button-success mb-2 col-12 lg:col-4" @click="recargar(slotProps1.data._id)"/>
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
                {name: "Baja", code: "Baja"},
                {name: "Media", code: "Media"},
                {name: "Alta", code: "Alta"}
            ],
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
            relatedExercises: [],
            sinImagen: sinImagen,
            intensidad: "",
            minutos: 0,
        }
    },
    created(){
        this.exerciseService = new ExerciseService();
        this.fetchExercise();
    },
    methods: {
        async fetchExercise(){
            let exercise = await this.exerciseService.getExerciseById(this.$route.params.ejercicioId)
            exercise = exercise.data
            this.dataviewValue = exercise;
            let relatedExercises = await this.exerciseService.getExerciseByMuscle(exercise.muscles[0])
            this.relatedExercises = relatedExercises

            if (this.$route.fullPath.includes('editar')) {
                let ejecucion = await this.exerciseService.getEjecucion(this.$route.params.ejecucionId)
                ejecucion = ejecucion.data

                this.ejecucion = ejecucion
                this.intensidad = {name: ejecucion.intensidad, code: ejecucion.intensidad}
                this.minutos = ejecucion.minutos
            }
        },
        saveExercise() {
            if (this.intensidad && this.minutos > 0) {
                let exercise = {};
                exercise.intensidad = this.intensidad.code;
                exercise.minutos = this.minutos;
                exercise.ejercicio = this.dataviewValue._id;
                exercise.usuario = this.$store.state.userId;

                this.exerciseService.saveExercise(exercise)
                .then(() => {
                    this.$toast.add({severity:'success', summary: 'Éxito', detail: 'El ejercicio se ha añadido a la lista de realizados.', life: 3000})
                    this.$router.push('/');
                })
                .catch(() => this.$toast.add({severity:'error', summary: 'Fallo', detail: 'Lo sentimos, ocurrió un fallo al guardar su ejercicio realizado.', life: 3000}));
            } else {
                this.$toast.add({severity:'error', summary: 'Fallo', detail: 'Debe seleccionar una intensidad y el tiempo que se ha ejercitado.', life: 3000});
            }
        },
        updateExercise() {
            if (this.intensidad && this.minutos > 0) {
                let exercise = this.ejecucion;
                exercise.intensidad = this.intensidad.code;
                exercise.minutos = this.minutos;

                this.exerciseService.updateExercise(exercise)
                .then(() => {
                    this.$toast.add({severity:'success', summary: 'Éxito', detail: 'El ejercicio se ha añadido a la lista de realizados.', life: 3000})
                    this.$router.push('/');
                })
                .catch(() => this.$toast.add({severity:'error', summary: 'Fallo', detail: 'Lo sentimos, ocurrió un fallo al guardar su ejercicio realizado.', life: 3000}));
            } else {
                this.$toast.add({severity:'error', summary: 'Fallo', detail: 'Debe seleccionar una intensidad y el tiempo que se ha ejercitado.', life: 3000});
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