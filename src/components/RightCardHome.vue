<template>
    <div class="col-12 lg:col-6">
        <div class="card">
            <div class="lg:col-6" style="text-align:center">
                <label for="graficoPasos" style="font-size:20px; color:cyan"> {{pasosRecomendados}} pasos recomendados</label>
                <Knob id="graficoPasos" :strokeWidth="5"  v-model="porcentajePasos" :valueTemplate="pasos + ' pasos'" :size="340"  />
            </div>
        </div>
    </div> 
</template>

<script>
export default {
	data() {
		return {
            pasosRecomendados:5000,
            porcentajePasos:50,
            pasos:3550
        }
    }
}
</script>
<style>
    .p-knob-text {
        font: bolder;
        font-size:13.2px !important;
        position: relative !important;
        bottom: 50px
    }
</style>
