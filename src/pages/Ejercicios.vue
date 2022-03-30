<template>
  <div class="grid justify-content-around">
    <!-- PARTE IZQUIERDA -->
    <div class="grid col-12 lg:col-6 justify-content-center">
        <div class="col-12">
          <h3 class="text-center"> EJERCICIOS RECOMENDADOS DEL DÍA </h3>
        </div>
        <div class="card col-12">
        <DataTable :value="dataviewValue" :rows="5">     
          <Column field="name" header="Nombre" :style="{width:'150px'}">
						<template #body="{data}">
              <router-link :to="'/ejercicio/detalles/' + data._id">
              <p class="p-flex">{{data.name}}</p>
              </router-link>
            </template>
					</Column>
          <Column field="muscles" header="Zona muscular" :style="{width:'150px'}">
						<template #body="{data}" :v-model="muscleList">
                <p class="p-flex text-bold">{{muscleList[data.muscles[0]]}}</p> 
                <p class="p-flex text-bold">{{muscleList[data.muscles[1]]}}</p>
                <p class="p-flex text-bold">{{muscleList[data.muscles[2]]}}</p>
            </template>
					</Column>
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
        <h5 class="p-flex text-center">En esta sección podrás buscar a partir de unos filtros establecidos</h5>
    </div>
	</div>
</template>
<script>
import axios from "axios"

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
      dataviewValue: null
    };
  },

  mounted() {
    this.fetchItems();
  },

  methods: {
    
    fetchItems(){
          let uri = '/ejercicios';
          axios.get(uri)
          .then((response) => {
            this.dataviewValue = response.data;
          });
    },
    exercise_url(url){
        return url._id;
    }
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