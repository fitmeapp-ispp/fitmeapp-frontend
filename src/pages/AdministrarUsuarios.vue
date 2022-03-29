<template>
    <h3>ADMINISTRAR USUARIOS</h3>
    <div class="grid">
        <div class="col-12 xl:col-8">
            <div class="tabla">
            <DataTable :value="dataviewValue" :rows="7" :paginator="true" class="p-datatable-gridlines" dataKey="id">

                <Column field="usuario" header="Usuario" :style="{width:'100px'}">
                <template #body="{data}">
                    <router-link :to="'/'">{{data.username}}</router-link>
                </template>
                </Column>

                <Column field="name" header="Nombre" :style="{width:'100px'}">
                <template #body="{data}">
                    <span class="text-bold">{{data.name}}   
                    </span> 
                </template>
                </Column>

                <Column field="email" header="Email" :style="{width:'100px'}">
                <template #body="{data}">
                    <span class="text-bold">{{data.email}}   
                    </span> 
                </template>
                </Column>

                <Column field="admin" header="Administrador" :style="{width:'100px'}">
                <template #body="{data}">
                    <span class="text-bold">{{data.password}}   
                    </span> 
                </template>
                </Column>

                <Column field="test" header="Usuario Piloto" :style="{width:'100px'}">
                </Column>

            </DataTable>

            </div>

        </div>

        <!-- Añadir ruta a nuevo -->
        <div class="col-12 xl:col-2">
            <router-link to="/add_usuario">
            <button class="p-button p-component mr-2 mb-2" style="background-color: #9c9c9c;">
                <h5> Añadir nuevo</h5>
            </button>
            </router-link>
        </div>

    </div>
</template>




<script>
import axios from "axios"

export default {
  data() {
    return {

      dataviewValue: null
    };
  },

  mounted() {
    this.fetchItems();
  },

  methods: {
    
    fetchItems(){
          let uri = '/users';
          axios.get(uri).then((response) => {
          this.dataviewValue = response.data;
          console.log(this.dataviewValue);
          });
    },



  },
};
</script>