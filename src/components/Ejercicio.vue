<template>
  <div class="grid">
    <div class="card col-12">
      <DataView :value="ejercicios" layout="grid" :totalRecords="totalRecords" :lazy="true"
        :paginator="true" :rows="24" :sortOrder="sortOrder" :sortField="sortField" @page="onPage($event)">
        <template #header>
          <div class="grid formgroup-inline justify-content-around align-items-center">
            <div class="col-12 field m-0">
              <h1 class="text-center" style="color:#256029;">Ejercicios</h1>
            </div>
            <div class="field formgroup-inline justify-content-center align-items-center m-0">
              <div class="field mt-2">
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText v-model="filtroNombreEjercicio" placeholder="Buscar por nombre" @keyup.enter="fetchItems()"/>
                </span>
              </div>
              <div class="field mt-2">
                <Dropdown v-model="filtroGrupoMuscular" :options="gruposMusculares" optionLabel="nombre" optionValue="code" placeholder="Grupo muscular" @change="buscarPorZona()"/>
              </div>
              <div class="field mt-1">
                <MultiSelect v-model="filtroMaterial" :options="materiales" optionLabel="nombre" optionValue="code" placeholder="Escoja materiales" @change="buscarPorMateriales()">
                  <template #value="slotProps">
                    <template v-if="!slotProps.value || slotProps.value.length === 0">
                      <div class="p-1">Escoja materiales</div>
                    </template>
                    <span v-for="equipmentId, index of slotProps.value" :key="equipmentId">
                      <span>{{materiales[equipmentId - 1].nombre}}</span>
                    <span v-if="index < slotProps.value.length - 1">; </span>
								</span>
                  </template>
                  <template #option="slotProps">
                    <div class="flex align-items-center">
                      <div>{{ slotProps.option.nombre }}</div>
                    </div>
                  </template>
                </MultiSelect>
              </div>
            </div>
          </div>
        </template>
        <template #grid="slotProps">
          <div class="col-12 lg:col-4 md:col-6">
            <div class="card m-3 border-1 surface-border">
              <div class="grid">
                <div class="col-12 text-center">
                  <router-link :to='"/ejercicio/detalles/"+slotProps.data._id'>
                    <h4 style="color:#256029;">{{ slotProps.data.name }}</h4>
                  </router-link>
                </div>
                <div class="col-12 grid">
                    <div class="col-12 lg:col-6">
                      <p class="text-center font-bold">Grupo muscular: </p>
                      <hr class="border-900">
                      <ul>
                        <li>
                          {{ slotProps.data.category[0]}} 
                        </li>
                      </ul>
                    </div>
                    <div class="col-12 lg:col-6"> 
                      <p class="text-center font-bold">Material: </p>
                      <hr class="border-900">
                      <ul>
                        <li v-for="material in slotProps.data.equipment" :key="material">
                          <p> {{material}} </p>
                        </li>
                      </ul>
                    </div>
                </div>
                <div class="col-12">
                  <div class="grid">
                    <div class="col-6 flex justify-content-center align-items-center">
                      <Galleria :value="slotProps.data.images" :numVisible="1" :circular="true" :autoPlay="true" :transitionInterval="750" containerStyle="max-width: 800px; margin: auto">
                        <template #item="slotProps">
                          <img :src="slotProps.item" style="display: block;" class="imagenEjercicio"/>
                        </template>
                      </Galleria>
                      <img :src="sinImagen" v-if="slotProps.data.images.length === 0" style="display:block;background-color:#E0E0E0;border-radius:20px;border-style:solid;" 
                            class="imagenEjercicio" containerStyle="max-width: 800px; margin: auto"/>
                    </div>
                    <div class="col-6 flex justify-content-center align-items-center">
                      <div class="imagenMusculo" :style="'background-image:' + slotProps.data.musclesImage + '; background-repeat-x: no-repeat; background-repeat-y: no-repeat;'">
                        <img src="https://wger.de/static/images/muscles/muscular_system_front.svg" style="visibility: hidden" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
  </div>
</template>

<script>
import sinMusculoImagen from '../../public/images/sin_musculo_ejercicio.png';
import sinImagen from '../../public/images/sin_imagen_ejercicio.png';

export default {
  data() {
    return {
      ejercicios: null,
      filtroGrupoMuscular: null,
      filtroMaterial: null,
      filtroNombreEjercicio: "",
      gruposMusculares: [
        {code:0, nombre: "All" },
        {code:8, nombre: "Brazos" },
        {code:9, nombre: "Piernas" },
        {code:10, nombre: "Abdominales" },
        {code:11, nombre: "Pecho" },
        {code:12, nombre: "Espalda" },
        {code:13, nombre: "Hombros" },
        {code:14, nombre: "Gemelos" },
      ],
      materiales: [
        {code:1, nombre: "Pesas" },
        {code:2, nombre: "Barra EZ" },
        {code:3, nombre: "Mancuerna" },
        {code:4, nombre: "Esterilla" },
        {code:5, nombre: "Bola suiza" },
        {code:6, nombre: "Barra de dominadas" },
        {code:7, nombre: "Ninguno" },
        {code:8, nombre: "Banco" },
        {code:9, nombre: "Banco inclinado" },
        {code:10, nombre: "Pesas rusas" },
      ],
      sinMusculoImagen: sinMusculoImagen,
      sinImagen: sinImagen,
      totalRecords: 0,
      lazyParams: {},
    };
  },
  mounted(){
    this.lazyParams = {
				pagina: 0,
				filterMusc: '',
				filterMat: ''
		};
		this.fetchItems();
	},
  methods: {
    fetchItems() {
      this.axios.get("/ejercicio", {
            params:{
                pagina: this.lazyParams.pagina,
                zonaMuscular: this.lazyParams.filterMusc,
                materiales: this.lazyParams.filterMat,
                buscador: this.filtroNombreEjercicio,
            }
        }).then((response) => {
          this.totalRecords = response.data.total;
          this.ejercicios = response.data.resultado;
          for (let ejercicio of this.ejercicios) {
            let arrayPromesas = []
            let arrayIdMusculosPrincipales = ejercicio["muscles"];
            let arrayIdMusculosSecundarios = ejercicio["muscles_secondary"];
            let musclesUrls = []
            if (arrayIdMusculosPrincipales.length > 0) {
              this.ejercicios[this.ejercicios.indexOf(ejercicio)].muscles = []
              this.ejercicios[this.ejercicios.indexOf(ejercicio)].muscles_secondary = []
              for (let idMusculoPrincipal of arrayIdMusculosPrincipales) {
                let promesaMusculoPrincipal = this.axios.get("/musculo/"+idMusculoPrincipal).then((res) => {
                  this.ejercicios[this.ejercicios.indexOf(ejercicio)].muscles.push(res.data)
                  musclesUrls.push("url(https://wger.de" + res.data.image_url_main + ")")
                });
                arrayPromesas.push(promesaMusculoPrincipal)
              }
              
              for (let idMusculoSecundario of arrayIdMusculosSecundarios) {
                let promesaMusculoSecundario = this.axios.get("/musculo/"+idMusculoSecundario).then((res) => {
                  this.ejercicios[this.ejercicios.indexOf(ejercicio)].muscles_secondary.push(res.data)
                  musclesUrls.push("url(https://wger.de" + res.data.image_url_secondary + ")")
                });
                arrayPromesas.push(promesaMusculoSecundario)
              }
              Promise.all(arrayPromesas).then(() => {
                this.ejercicios[this.ejercicios.indexOf(ejercicio)].musclesImage = musclesUrls.join() + ",url(https://wger.de/static/images/muscles/muscular_system_front.svg)"
              })
            } else {
              this.ejercicios[this.ejercicios.indexOf(ejercicio)].musclesImage = "url("+sinMusculoImagen+")"
            }
            let arrayIdMMateriales = ejercicio["equipment"];
            if (arrayIdMMateriales.length > 0) {
              this.ejercicios[this.ejercicios.indexOf(ejercicio)].equipment = []
              
              for (let idMaterial of arrayIdMMateriales) {
                this.axios.get("/material/"+idMaterial).then((res) => {
                  this.ejercicios[this.ejercicios.indexOf(ejercicio)].equipment.push(res.data.name)
                });
              }
            } else {
              this.ejercicios[this.ejercicios.indexOf(ejercicio)].equipment = ["No hay datos disponibles"]
            }
            let arrayIdMusclegrup = ejercicio["category"];
            if (arrayIdMusclegrup > 0) {
              this.ejercicios.category = [];
              this.axios.get("/categoria/"+arrayIdMusclegrup).then((res) => {
                this.ejercicios[this.ejercicios.indexOf(ejercicio)].category=[res.data.name];
              });
            } else {
              this.ejercicios.category = ["No hay datos disponibles"]
            }
            this.ejerciciosFiltrados = this.ejercicios
          }
      })
    },
    onPage(event){
      this.lazyParams.pagina = event.page;
      this.fetchItems();	
    },
    buscarPorZona(){
      this.lazyParams.filterMusc = this.filtroGrupoMuscular;
      this.fetchItems();
    },
    buscarPorMateriales(){
      this.lazyParams.filterMat = this.filtroMaterial;
      this.fetchItems();
    }
  }, 
};
</script>

<style>
.p-galleria-thumbnail-wrapper {
  display: none !important;
}
.imagenEjercicio{
  width: 100%;
  height: auto;
  max-height: 250px;
}
.imagenMusculo{
  background-color:#E0E0E0;
  border-radius: 20px;
  border-style: solid;
  text-align: center;
  width: -webkit-fill-available;
  max-height: 369px;
  max-width: 200px;
}
</style>