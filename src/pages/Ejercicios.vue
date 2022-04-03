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
              <router-link :to="'/ejercicio/detalles/' + data._id">
              <p class="p-flex">{{data.name}}</p>
              </router-link>
            </template>
					</Column>
          <Column field="muscles" header="Zona muscular" :style="{width:'50%'}">
						<template #body="{data}" :v-model="muscleList">
                <p class="p-flex text-bold inline" v-for="(musculo,index) in data.muscles" :key="musculo">
                  <template v-if="index > 0">, </template> 
                  {{muscleList[musculo]}}
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
import EjercicioEjecucionService from '../service/EjercicioEjecucionService';

export default {
  data() {
    return {
      muscleList: [
        "",
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
      ejecucionService: null,
      dataviewValue: null
    };
  },

  mounted() {
    this.ejecucionService = new EjercicioEjecucionService();
    this.fetchItems();
  },

  methods: {
    
    fetchItems(){
          this.ejecucionService.getRecomendados().then(data => {this.dataviewValue = data
                    console.log(this.dataviewValue);
          });
    },
    exercise_url(url){
        return url._id;
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