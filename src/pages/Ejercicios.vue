<template>
  <div class="grid">
    <!-- PARTE IZQUIERDA -->
    <div class="col-12 lg:col-6">
      <div class="grid col-12 justify-content-center align-items-center"  style="margin-bottom:1em">
        <div class="col-12">
          <h2 class="text-center"> EJERCICIOS RECOMENDADOS DEL DÍA </h2>
        </div>
        <div class="card">
          <DeferredContent @load="fetchItems">
            <DataView :value="dataviewValue" :layout="layout">
              <template #list="slotProps">
                <div class="card col-12 pt-1 pb-1">
                  <div class="formgroup-inline">
                    <div class="field ml-5">
                      <Galleria :value="slotProps.data.images" :numVisible="1" containerStyle="max-width: 150px; max-height:150px;"
                          :circular="true" :autoPlay="true" :transitionInterval="1500">
                          <template #item="slotProps">
                              <img :src="slotProps.item"  style="width: 90px; height:90px; display: block;" />
                          </template>
                          <template #thumbnail="slotProps">
                            <img src="" :alt="slotProps.item.alt" style="display: block;" />
                        </template>
                      </Galleria>
                    </div>
                    <div class="field">
                      {{slotProps.data.name}}
                    </div>
                  </div>
                </div>
              </template>
              <template #empty>No tiene ningún ejercicio recomendado</template>
            </DataView>
          </DeferredContent>
        </div>    
      </div>
    </div>
    <!-- PARTE DERECHA -->
    <div class="col-12 lg:col-6">
      <div class="grid col-12 justify-content-center align-items-center">
        <div class="col-12">
          <h2 class="p-flex text-center">BUSCADOR DE EJERCICIOS</h2>
        </div>
        <router-link to= "/ejercicio">
          <img src='../../public/images/buscador_ejercicios.png' alt='Buscador de Ejercicios' class="img-fluid"/>
        </router-link>
        <h4 class="p-flex text-center"> En esta sección podrás buscar a partir de unos filtros establecidos.</h4>
      </div>
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
            console.log(this.dataviewValue);
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