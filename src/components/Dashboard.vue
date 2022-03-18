<template>
	<div class="grid">

        <!-- PARTE IZQUIERDA -->
        <div class="col-12 lg:col-6">
            <div class="card">
                <canvas id="donut_chart"></canvas>
                <br>
                <div class="card">
                    <h2>Desayuno</h2>
                </div>
                <div class="card">
                    <h2>Almuerzo</h2>  
                </div>        
                <div class="card">
                    <h2>Cena</h2>
                </div>        
            </div>	
        </div>

        <!-- PARTE DERECHA -->
        <div class="col-12 lg:col-6">
            <div>
                <div class="card">
                    <div class="lg:col-6" style="text-align:center">
                        <Tag class="mr-2" value="Peso objetivo: 74.5" style="font-size:2.50rem; font-weight:800; background:#1da750;">{{pasosRecomendados}} pasos recomendados</Tag>
                        <Knob id="graficoPasos" :strokeWidth="5"  v-model="porcentajePasos" :valueTemplate="pasos + ' pasos'" :size="340" valueColor="#1da750" />
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
	</div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
	data() {
		return {
            type:"doughnut",
			doughnutData: {
            labels: ['Carbohidratos (g)','Proteinas (g)','Grasas (g)'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: ["#FF6384","#36A2EB","#FFCE56"],
                    hoverBackgroundColor: ["#FF6384","#36A2EB","#FFCE56"],
                }
            ]},
			options: {
                responsive: true,
                aspectRatio: 2,
                align:"center",
                cutout:'70%',
                plugins:{
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            boxWidth: 20,
                            boxHeight: 20,
                            padding: 15,
                            font:{
                                size:18.3,
                                style:"normal"
                            }
                        }
                    }
                }
            },
            duotonePlugin : {
                id:"duotoneText",
                afterDatasetsDraw(chart){
                    const {ctx, chartArea:{
                        top,width,height
                    }} = chart;
                    ctx.font= "30px Arial"
                    ctx.textAlign="center"
                    ctx.fillText("",width/2,height/2+top)
                }
            },
            pasosRecomendados:5000,
            porcentajePasos:71,
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
    },    
	methods: {

    },
    components: {
    },
    mounted(){
        const ctx = document.getElementById('donut_chart');
        new Chart(ctx, {
        type:this.type,
        data: this.doughnutData,
        options: this.options,
        plugins: [this.duotonePlugin]
        });
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