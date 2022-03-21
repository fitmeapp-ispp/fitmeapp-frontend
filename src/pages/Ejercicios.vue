<template>
	<div class="grid">			

	<div class="col-12 xl:col-6">
		<h3>EJERCICIOS RECOMENDADOS DEL DÍA </h3>
		<div class="col-12">
			<div class="tabla">
        <br>
        <DataTable :value="dataviewValue" :rows="5">
                      
          <Column field="name" header="Nombre" :style="{width:'150px'}">
          
						<template #body="{data}">
              <router-link :to="'/ejercicio/detalles/' + data._id">{{data.name}}</router-link>
            </template>

					</Column>
          

          <Column field="muscles" header="Zona muscular" :style="{width:'150px'}">
						<template #body="{data}" :v-model="muscleList">
              <span class="text-bold">{{muscleList[data.muscles[0]]}}   
                <br>{{muscleList[data.muscles[1]]}}
                <br>{{muscleList[data.muscles[2]]}}
              </span> 
            </template>
					</Column>

        </DataTable>

        
			</div>
		</div>
	</div>
	
	
	<div class="col-12 xl:col-6">
		<h3>BUSCADOR DE EJERCICIOS</h3>
		<div class="col-12">
      <div class="contenedor">
				<router-link to= "/buscarEjercicio">
          <img src="../assets/images/foto.png"/>
					<div class="texto-centrado"> En esta sección podrás buscar a partir de unos filtros establecidos.</div>
				</router-link>
      </div>
            
    </div>
		
	</div>
	
	</div>
</template>



<style>

.contenedor{
    position: relative;
    display: inline-block;
    text-align: center;
}

.texto-centrado{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
	color:rgb(0, 0, 0);
	background-color: rgb(202, 211, 203);
	opacity: .8;
	font-weight: bold;
	font-size: large;
}
</style>


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
          axios.get(uri).then((response) => {
          this.dataviewValue = response.data;
          console.log(this.dataviewValue);
          });
    },
    exercise_url(url){
        return url._id;
    }

    

  },
};
</script>
