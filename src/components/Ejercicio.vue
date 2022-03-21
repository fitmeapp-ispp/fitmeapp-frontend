<template>

  <h2>Buscar Ejercicio</h2>

  <div class="card mb-0">
    <div class="grid formgrid">

      <div class="col-12 mb-2 lg:col-4 lg:mb-0">
        <h2>Nombre</h2>
        <InputText v-model="filtroNombreEjercicio" placeholder="Introduce el nombre de un ejercicio..." />
      </div>

      <div class="col-12 mb-2 lg:col-4 lg:mb-0">
        <h2>Grupo muscular</h2>
        <Dropdown v-model="filtroGrupoMuscular" :options="gruposMusculares" optionLabel="nombre" optionValue="nombre" placeholder="Selecciona un grupo muscular" />
      </div>

      <div class="col-12 mb-2 lg:col-4 lg:mb-0">
        <h2>Material</h2>
        <MultiSelect v-model="filtroMaterial" :options="materiales" optionLabel="nombre" optionValue="nombre" placeholder="Escoja materiales">
          <template #value="slotProps">
						<template v-if="!slotProps.value || slotProps.value.length === 0">
							<div class="p-1">Selecciona un material</div>
						</template>
					</template>
					<template #option="slotProps">
						<div class="flex align-items-center">
							<div>{{slotProps.option.nombre}}</div>
						</div>
					</template>
        </MultiSelect>
      </div>

    </div>
  </div>


<div class="grid">
		<div class="col-12">
			<div class="card">
        <h1 v-if="filtroNombreEjercicio.length > 0 && ejerciciosFiltrados.length == 0">No existen ejercicios que cumplan con los filtros!</h1>

				<DataView :value="ejerciciosFiltrados" :layout="layout" :paginator="true" :rows="9" :sortOrder="-1" :sortField="name">
					<template #grid="slotProps">
						<div class="col-12 md:col-4">
              <div class="item container">
                <div class="ejercicioCard row ">
                  
                  <!-- <img v-for="image of slotProps.data.images" :key="image" :src="image" class="ejercicio-img col"> -->
                  
                  <div class="ejercicio-container col-8">
                    <div class="ejercicio-head row">
                      <div class="ejercicio-title col">{{slotProps.data.name}}</div>
                    </div>

                    <ul>
                      <li class="text">Grupo muscular: {{slotProps.data.category.join(",")}}</li>
                      <li class="text">Material: {{slotProps.data.equipment.join(", ")}}</li>
                    </ul>

                    <Carousel v-if="slotProps.data.images.length > 0" :value="slotProps.data.images" :responsiveOptions="responsiveOptions"
                      :circular="true" :autoplayInterval="3000">
                      <template #item="slotProps2">
                        <img :src="slotProps2.data" width="100"/>
                      </template>
                    </Carousel>

                    <div :style="'background-image:' + slotProps.data.musclesImage + '; background-repeat-x: no-repeat; background-repeat-y: no-repeat;'">
                      <img src="https://wger.de/static/images/muscles/muscular_system_front.svg" style="visibility: hidden;"/>
                    </div>
                  </div>
                </div>
              </div>
						</div>
					</template>

				</DataView>
			</div>
		</div>
	</div>

</template>

<script>

export default {
  mounted() {
    this.fetchItems();
  },
  data() {
    return {
      ejercicios: null,
      filtroGrupoMuscular: null,
      filtroMaterial: null,
      filtroNombreEjercicio: "",
      layout: 'grid',
      gruposMusculares: [
        {nombre: 'All'},
        {nombre: 'Arms'},
        {nombre: 'Legs'},
        {nombre: 'Abs'},
        {nombre: 'Chest'},
        {nombre: 'Back'},
        {nombre: 'Shoulders'},
        {nombre: 'Calves'}
      ],
      materiales: [
        {nombre: 'Barbell'},
        {nombre: 'SZ-Bar'},
        {nombre: 'Dumbbell'},
        {nombre: 'Gym mat'},
        {nombre: 'Swiss Ball'},
        {nombre: 'Pull-up bar'},
        {nombre: 'none (bodyweight exercise)'},
        {nombre: 'Bench'},
        {nombre: 'Incline bench'},
        {nombre: 'Kettlebell'}
      ],
      responsiveOptions: [
        {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
        },
        {
          breakpoint: '600px',
          numVisible: 2,
          numScroll: 2
        },
        {
          breakpoint: '480px',
          numVisible: 1,
          numScroll: 1
        }
      ]
    };
  },
  methods: {
    fetchItems() {
      this.axios.get("/ejercicio").then((response) => {
        this.ejercicios = response.data;

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
            this.ejercicios[this.ejercicios.indexOf(ejercicio)].musclesImage = "url(https://static.thenounproject.com/png/1077671-200.png)"
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
            this.ejercicios[this.ejercicios.indexOf(ejercicio)].equipment = ["No data available"]
          }

          let arrayIdMusclegrup = ejercicio["category"];

          if (arrayIdMusclegrup > 0) {
            this.ejercicios.category = [];
            this.axios.get("/categoria/"+arrayIdMusclegrup).then((res) => {
              this.ejercicios[this.ejercicios.indexOf(ejercicio)].category=[res.data.name];
            });
          } else {
            this.ejercicios.category = ["No data available"]
          }

          this.ejerciciosFiltrados = this.ejercicios
        }
      })
    },
  },
  computed: {
    ejerciciosFiltrados() {
      if (this.filtroNombreEjercicio.length == 0 && this.filtroGrupoMuscular == null && this.filtroMaterial == null) {
        return this.ejercicios
      } else {
        let resultadoFiltrado = this.ejercicios

        if (this.filtroNombreEjercicio.length > 0) {
          resultadoFiltrado = resultadoFiltrado.filter(e => {
            return e.name.toLowerCase().includes(this.filtroNombreEjercicio.toLowerCase())
          })
        }

        if (this.filtroGrupoMuscular != null && this.filtroGrupoMuscular != "All") {
          resultadoFiltrado = resultadoFiltrado.filter(e => {
            return e.category == this.filtroGrupoMuscular
          })
        }

        if (this.filtroMaterial != null) {
          resultadoFiltrado = resultadoFiltrado.filter(e => {
            return this.filtroMaterial.every(material => e.equipment.includes(material))
          })
        }

        return resultadoFiltrado
      }
    }
  }
};
</script>

<style>
    .item {
      padding: 10px;
    }
    .ejercicio-img {
        margin: auto;
        width: 100%;
        height: 7vw;
        object-fit: cover;
    }
    .ejercicioCard {
        z-index:2;
        border-radius: 10px;
        padding: 1rem 0 1rem 1rem;
        width: 100%;
        height: auto;
        object-fit: cover;
        position: relative; 
        background-color: gray;
        display: flex;
        flex-direction: row;
    }
    .ejercicio-container{
        padding: 0;
        display: flex;
        flex-direction: column;
    }
    .ejercicio-head {
        height: calc(1vw + 1vh + 2vmin);
        font-size: calc(1vw + 1vh + 1vmin);
        display: flex;
        flex-direction: row;
    }
    .ejercicio-title {
        display: inline;
        width: 100%;
        max-width: 100%;
        overflow: hidden;
        height: 100%;
        font-size: calc(0.5vw + 0.5vh + 0.5vmin);
        z-index: 3;
        text-overflow: ellipsis;
    }
    .text {
        font-size: calc(0.4vw + 0.4vh + 0.4vmin);
    }
    .zonaEjercicio-img {
        position: absolute;
        bottom: 2%;
        right: 2%;
        width: 6vw;
        height: 6vw;
        background-color: red;
        z-index: -1;
    }
</style>