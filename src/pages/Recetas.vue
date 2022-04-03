<template>
	<div class="grid">			

        <div class="col-12 xl:col-6">
            <h3>Recetas </h3>
            <div class="col-12">
            <DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="9" :sortOrder="-1">
                <template #grid="slotProps">
                    <div class="col-12 md:col-4 item">
                        <div class="ff">{{slotProps.data.nombre}}</div>
					</div>
				</template>
			</DataView>
            </div>
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
