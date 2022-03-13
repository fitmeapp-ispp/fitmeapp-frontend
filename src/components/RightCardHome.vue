<template>
    <div class="col-12 lg:col-6">
        <div>
            <div class="card">
                <div class="lg:col-6" style="text-align:center">
                    <label for="graficoPasos" style="font-size:20px; color:cyan"> {{pasosRecomendados}} pasos recomendados</label>
                    <Knob id="graficoPasos" :strokeWidth="5"  v-model="porcentajePasos" :valueTemplate="pasos + ' pasos'" :size="340"  />
                </div>
            </div>
        </div> 

        <div class="card grid p-fluid">
            <div class="card col-12 md:col-12">
                <div class="text-center">
                    <Tag class="mr-2" value="Peso objetivo: 74.5" style="font-size:2.75rem; font-weight:800; background:#1da750;"></Tag>
                </div>
            </div>
            
            <div class="col-12 md:col-3" >
                <div class="card flex align-items-center" style="height:48%;">
                    <div class="text-center">
                        <Tag class="mr-2" value="Peso actual:" :rounded="true" style="font-size:1.25rem; font-weight:800; background:#1da750; margin-bottom:0.5rem"></Tag>
                        <InputNumber v-model="pesoActual" :step="0.5" showButtons buttonLayout="horizontal" decrementButtonClass="p-button-success" incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"></InputNumber>
                    </div>
                </div>
            
                <div class="card flex align-items-center" style="height:48%;">
                    <div class="text-center">
                        <Tag class="mr-2" value="Peso de ayer:" :rounded="true" style="font-size:1.25rem; font-weight:800; background:#1da750; margin-bottom:0.5rem"></Tag>
                        <InputNumber v-model="pesoDeAyer" :step="0.5" :disabled="true"></InputNumber>
                    </div>
                </div>
            </div>
            
            <div class="card col-12 md:col-9" style="height:100%">  
                <h5 class="text-center"><i class="pi pi-chart-line"/> Gráfica de peso</h5>
                <Chart type="line" :data="lineData" :options="lineOptions" />
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
            pasos:3550,
            pesoActual: 76.5,
            pesoDeAyer: 77.0,
            lineData: {
				labels: ['04/03', '05/03', '06/03', '07/03', '08/03', '09/03', 'Ayer'],
				datasets: [
					{
						label: 'Peso registrado',
						data: [79.0, 78.0, 78.0, 77.5, 77.0, 77.0, 76.5],
						fill: false,
						backgroundColor: '#2f4860',
						borderColor: '#2f4860',
						tension: .4
					},
					{
						label: 'Peso objetivo',
						data: [74.5, 74.5, 74.5, 74.5, 74.5, 74.5, 74.5],
						fill: false,
						backgroundColor: '#00bb7e',
						borderColor: '#00bb7e',
						tension: .4
					}
				],
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
			},
			lineOptions: null
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
