<template>

  <h2>Buscar Ejercicio</h2>
  <div class="card mb-0">
    <div class="grid formgrid">
      <div class="col-12 mb-2 lg:col-2 lg:mb-0">
         <h3>Nombre</h3>
        <input class="p-inputtext p-component" id="username" type="text">
      </div>
      <div class="col-12 mb-2 lg:col-2 lg:mb-0">
        <h3>Zona muscular</h3>
        <Dropdown v-model="selectedMusculo" :options="musculos" optionLabel="name" optionValue="code" placeholder="Selecciona una zona muscular" />
      </div>
        <div class="col-12 mb-2 lg:col-3 lg:mb-0">
        <h4>Calorias quemadas </h4>
        <Slider id="slider1" v-model="calorias" :range="true" />
        <br>
       <b> {{calorias[0]}}</b> Kcal  <b>{{calorias[1]}}</b> Kcal
        
      </div>
        <div class="col-12 mb-2 lg:col-2 lg:mb-0">
        <h3>Tipo</h3>
        <Dropdown v-model="selectedMusculo2" :options="musculos2" optionLabel="name" optionValue="code" placeholder="Escoja materiales" />
      </div>
        <div class="col-12 mb-2 lg:col-2 lg:mb-0">
        <h3>Dificultad</h3>
        <Dropdown v-model="selectedMusculo3" :options="musculos3" optionLabel="name" optionValue="code" placeholder="Elija dificultad" />
      </div>
    
        
      </div>
    </div>







<div class="grid">
		<div class="col-12">
			<div class="card">
				<DataView :value="dataviewValue" :layout="layout" :paginator="true" :filters="filters1" v-model:filters="filters1" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
					<template #header>
						<div class="grid grid-nogutter">
							<div class="col-4 text-left">
								<Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)"/>
							</div>
                <div class="col-4 text-center">
                    <span class="p-input-icon-left mb-2">
                        <i class="pi pi-search" />
                    </span>
                </div>
							<div class="col-4 text-right">
								<DataViewLayoutOptions v-model="layout" />
							</div>
						</div>
					</template>
					<template #list="slotProps">
						<div class="col-12 md:col-4">
            <div class="item container">
                <div class="ejercicioCard row ">
                    <img src="" class="ejercicio-img col">
                    <div class="ejercicio-container col-8">
                      <div class="ejercicio-head row">
                        <div class="ejercicio-title col">{{slotProps.data.name}}</div>
                        <span class="calorias col-4">({{slotProps.data.exercise_base}}Kc)</span>
                      </div>
                    <ul>
                      <li class="text">Dificultad {{slotProps.data.category}}</li>
                      <li class="text">Material {{slotProps.data.url_main}}</li>
                      <li class="text">Tiempo {{slotProps.data.muscle_name}}</li>
                    </ul>
                    <img src="{{slotProps.data.url_main}}" class="zonaEjercicio-img">
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
/* document.getElementById("slider1").addEventListener() */

export default {
  data() {
    return {
      calorias: [20,80],
      selectedMusculo: null,
      selectedMusculo2: null,
      selectedMusculo3: null,
      dataviewValue: null,
      musculos: [
                {name: 'Piernas', code: 'NY'},
                {name: 'Espalda y Hombros', code: 'RM'},
                {name: 'Brazos', code: 'LDN'},
                {name: 'Abdominales', code: 'IST'},
                {name: 'Pecho', code: 'PRS'}
            ],
                  musculos2: [
                {name: 'Sin material', code: 'NY'},
                {name: 'Con mancuerna', code: 'RM'},
                {name: 'Con maquinas', code: 'LDN'},
            ],
                  musculos3: [
                {name: 'Principiante', code: 'NY'},
                {name: 'Fácil', code: 'RM'},
                {name: 'Medio', code: 'LDN'},
                {name: 'Difícil', code: 'IST'},
                {name: 'Muy Difícil', code: 'PRS'}
            ],
      products: null,
      lineData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Revenue",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: "#2f4860",
            borderColor: "#2f4860",
            tension: 0.4,
          },
          {
            label: "Sales",
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: "#00bb7e",
            borderColor: "#00bb7e",
            tension: 0.4,
          },
        ],
      },
      items: [
        { label: "Add New", icon: "pi pi-fw pi-plus" },
        { label: "Remove", icon: "pi pi-fw pi-minus" },
      ],
      lineOptions: null,
    };
  },
  themeChangeListener: null,
  mounted() {
    this.fetchItems();
  },
  methods: {
    fetchItems() {
      this.axios.get("/ejercicio").then((response) => {
        let ejercicios = response.data;
        let data = [];
        for (let ejercicio of ejercicios) {
          var id = ejercicio["muscles"][0];
          if (id!=undefined) {
            this.axios.get("/musculo/"+id).then((res) => {
              ejercicio.muscle_name =  res.data[0]["name"];
              ejercicio["muscle_url_main"] =  res.data[0]["image_url_main"];
              data.push(ejercicio)
            });
          }
          else {
              ejercicio.muscle_name =  "N/A";
              ejercicio["muscle_url_main"] =  "";
              data.push(ejercicio)
          }
          //console.log(data);
        }
        console.log(data);
        this.dataviewValue = data;
      });
    },
    formatCurrency(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
    isDarkTheme() {
      return this.$appState.darkTheme === true;
    },
    applyLightTheme() {
      this.lineOptions = {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
          y: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
        },
      };
    },
    applyDarkTheme() {
      this.lineOptions = {
        plugins: {
          legend: {
            labels: {
              color: "#ebedef",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#ebedef",
            },
            grid: {
              color: "rgba(160, 167, 181, .3)",
            },
          },
          y: {
            ticks: {
              color: "#ebedef",
            },
            grid: {
              color: "rgba(160, 167, 181, .3)",
            },
          },
        },
      };
    },
  },
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
    .calorias {
        margin-right: 1vw;
        overflow: visible;
        z-index:2;
        font-size: calc(0.4vw + 0.4vh + 0.4vmin);
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