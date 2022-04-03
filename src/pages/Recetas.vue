<template>
	<div class="grid">			

        <div class="col-12 xl:col-6">
            <h3>Recetas </h3>
            <div class="col-12">
            <DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="9" :sortOrder="-1" :sortField="name">
                <template #grid="slotProps">
                    <div class="col-12 md:col-4">
                        <div>{{slotProps.data.nombre}}</div>
					</div>
				</template>
			</DataView>
            </div>
        </div>
	</div>
</template>



<style>

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
    exercise_url(url){
        return url._id;
    }
  },
};
</script>
