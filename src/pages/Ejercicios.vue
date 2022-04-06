<template>
  <div class="grid justify-content-between">
    <!-- PARTE IZQUIERDA -->
    <div class="col-12 lg:col-6 justify-content-center">
        <div class="col-12">
          <h3 class="text-center"> EJERCICIOS RECOMENDADOS DEL DÍA </h3>
        </div>
        <div class="card col-12">
        <DataTable  :value="dataviewValue" :rows="7" responsiveLayout="scroll"> 
          <Column field="name" header="Nombre" :style="{width:'50%'}" >
						<template #body="{data}">
              <router-link :to="'/ejercicio/detalles/' + data.ejercicioDetalles[0]._id">
                <p class="p-flex text-center text-bold inline">{{data.ejercicioDetalles[0].name}}</p>
              </router-link>
            </template>
					</Column>
          <Column field="muscles" header="Zona muscular" :style="{width:'50%'}">
						<template #body="{data}" :v-model="muscleList">
                <p class="p-flex text-center text-bold inline" v-for="(musculo,index) in data.ejercicioDetalles[0].muscles" :key="musculo">
                  <template v-if="index > 0">, </template> 
                  {{muscleList[musculo]}}
                </p> 
            </template>
					</Column>
          <Column field="done" header="Realizado" :style="{width:'50%'}">
						<template #body="{data}">
                <p v-if="data.hecho === true"  class="text-center">
                  <i class="pi text-green-500 pi-check" style="transform: scale(1.5);"/>
                </p> 
            </template>
					</Column>
          <template #empty>
            <p class="text-center p-flex"> No tiene ninguna recomendación de ejercicios para hoy. </p>
          </template>
        </DataTable>
      </div>    
    </div>
    <!-- PARTE DERECHA -->
    <div class="grid col-12 lg:col-6 justify-content-center">
        <div class="col-12">
          <h3 class="p-flex text-center">BUSCADOR DE EJERCICIOS</h3>
        </div>
        <router-link to= "/ejercicio">
          <img src='../../public/images/buscador_ejercicios.png' alt='Buscador de Ejercicios' class="img-fluid"/>
        </router-link>
        <div class="col-12">
          <h5 class="p-flex text-center">En esta sección podrás buscar a partir de unos filtros establecidos</h5>
        </div>
    </div>
	</div>
</template>
<script>
import ExerciseService from '../service/ExerciseService';

export default {
  data() {
    return {
      muscleList: {
        0: "",
        1:"Biceps brachii",
        2:"Anterior deltoid",
        3:"Serratus anterior",
        4:"Pectoralis major",
        5:"Triceps brachii",
        6:"Rectus abdominis",
        7:"Gastrocnemius",
        8:"Gluteus maximus",
        9:"Trapezius",
        10:"Quadriceps femoris",
        11:"Biceps femoris",
        12:"Latissimus dorsi",
        13:"Brachialis",
        14:"Obliquus externus abdominis",
        15:"Soleus"
      },
      dataviewValue: null,
    };
  },
  exerciseService: null,
  created(){
    this.exerciseService = new ExerciseService();
    this.fetchItems();
  },
  methods: {
    fetchItems(){
      this.exerciseService.getRecomendaciones(this.$store.state.userId)
                          .then(data => this.dataviewValue = data);
    },
  },
};
</script>

<style>
.p-galleria .p-galleria-thumbnail-container{
  display: none;
}
.img-fluid{
  width:100%;
  height: auto;
}
</style>