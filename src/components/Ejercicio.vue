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
						<div class="col-12">
							<div class="flex flex-column md:flex-row align-items-center p-3 w-full">
								<div class="flex-1 text-center md:text-left">
									<div class="font-bold text-2xl">{{slotProps.data.name}}</div>
									<div class="mb-3">{{slotProps.data.description}}</div>

								</div>
								<div class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
									<Button icon="pi pi-check" class="p-button-success p-button-icon-only p-button-rounded"></Button>
								</div>
							</div>
						</div>
					</template>

					<template #grid="slotProps">
						<div class="col-12 md:col-4">
							<div class="card m-3 border-1 surface-border">
                                <div class="text-align-center"> 
                                    <div class="grid grid-nogutter">
                                        <div class="col-4 text-left">
                                        </div>
                                        <div class="col-8 text-left">
                                            <div class="text-2xl font-bold">{{slotProps.data.name}}</div>
                                            <div class="text-2xl font-bold">{{slotProps.data.description}}</div>

                                        </div>
                                    </div>
                                </div>
								<div class="flex align-items-center justify-content-between">
                                    <div></div>
									<Button icon="pi pi-check" class="p-button-success p-button-icon-only p-button-rounded"></Button>
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
            fetchItems()
        {
          let uri = 'http://localhost:3000/ejercicio';
          this.axios.get(uri).then((response) => {
          this.dataviewValue = response.data;
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