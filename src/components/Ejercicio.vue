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
  methods: {
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