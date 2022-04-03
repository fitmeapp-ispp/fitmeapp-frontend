<template>
    <h3>ADMINISTRAR EJERCICIOS</h3>
    <div class="grid">
        <div class="col-12 xl:col-8">
            
		<div class="tabla">
        <DataTable :value="dataviewValue" :rows="7" :paginator="true" class="p-datatable-gridlines" dataKey="id">
                      
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

            <!-- Añadir botones editar y eliminar -->

            <Column field="actions" header="Acciones" :style="{width:'25px'}">
            </Column>

            <Column field="eliminar" header="Eliminar" :style="{width:'25px'}">
               <Button icon="pi pi-trash" class="p-button-danger"/>
            </Column>


        </DataTable>
		</div>

        
	</div>



        <!-- Añadir ruta a nuevo -->
        <div class="col-12 xl:col-2">
            <router-link to="/add_ejercicio">
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

        toolbarItems: [
            {
            label: 'Save',
            icon: 'pi pi-check'
            },
            {
            label: 'Update',
            icon: 'pi pi-upload'
            },
            {
            label: 'Delete',
            icon: 'pi pi-trash'
            },
            {
            label: 'Home Page',
            icon: 'pi pi-home'
            },
        ],


        cardMenu:  [
            { label: 'Save', icon: 'pi pi-fw pi-check' },
            { label: 'Update', icon: 'pi pi-fw pi-refresh' },
            { label: 'Delete', icon: 'pi pi-fw pi-trash' },
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
    },


  },
};
</script>
