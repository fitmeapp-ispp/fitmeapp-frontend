<template>
        <div class="col-12">
            <h3>Recetas </h3>
            <div class="col-12">
                <DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
                    <!--
                    <template #header>
                        <div class="grid grid-nogutter">
                            <div class="col-4 text-left">
                                <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Ordenar por" @change="onSortChange($event)"/>
                            </div>
                            <div class="col-4 text-center">
                                <span class="p-input-icon-left mb-2">
                                    <i class="pi pi-search" />
                                    <InputText placeholder="Buscar" style="width: 100%" @keyup.enter="enterClicked()" id="BuscadorComidas"/>
                                </span>
                            </div>
                            <div class="col-4 text-right">
                                <DataViewLayoutOptions v-model="layout" />
                            </div>
                        </div>
                    </template>
                    -->
                    <template #list="slotProps">
                        <div class="col-12">
                            <div class="font-bold text-2xl" style="color:#256029;">
                                {{ slotProps.data.nombre }}
                            </div>
                        </div>
                    </template>
				</DataView>
            </div>
        </div>
</template>



<style>
.ff {
    height: 10px;
}
</style>


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
          let uri = '/recetas';
          axios.get(uri).then((response) => {
            this.dataviewValue = response.data;
            console.log(this.dataviewValue);
          });
    },
  },
};
</script>
