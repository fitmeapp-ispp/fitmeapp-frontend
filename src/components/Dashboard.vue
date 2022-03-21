<template>
	<div class="grid">

        <!-- PARTE IZQUIERDA -->
        <div class="col-12 lg:col-6">
            <div class="card">
                <canvas id="donut_chart"></canvas>
                <br>
                <div class="card flex align-items-stretch">
                    <div class="lg:col-6">
                    <Tag class="mr-2" style="font-size:1.75rem; font-weight:600; background:#1da750;">Desayuno</Tag>
                    <p style="margin-top:0.5em">Carbohidratos (g): {{carbsDesayuno}}</p>
                    <p>Proteínas (g): {{protDesayuno}}</p>
                    <p>Grasas (g): {{grasasDesayuno}}</p>
                    <Button label="Añadir desayuno" class="p-button-outlined p-button-secondary" style="margin-top:1em" />
                    </div>
                    <div class="lg:col-6">
                        <Carousel :value="imagenesDesayuno" :numVisible="1" :numScroll="1" orientation="horizontal" verticalViewPortHeight="300px" style="max-width: 500px;">
                            <template #item="slotProps">
                                <div class="product-item">
                                    <div class="product-item-content flex align-items-stretch">
                                        <div class="mb-3">
                                            <img :src=slotProps.data.url :alt="slotProps.data.nombre" class="product-image-2"/>
                                        </div>
                                        <div>
                                            <h4 class="mb-1" style="margin-right:1em">{{slotProps.data.nombre}}</h4>                                            
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Carousel>
                    </div>
                </div>
                <div class="card flex align-items-stretch">
                    <div class="lg:col-6">
                    <Tag class="mr-2" style="font-size:1.75rem; font-weight:600; background:#1da750;">Almuerzo</Tag>
                    <p style="margin-top:0.5em">Carbohidratos (g): {{carbsAlmuerzo}}</p>
                    <p>Proteínas (g): {{protAlmuerzo}}</p>
                    <p>Grasas (g): {{grasasAlmuerzo}}</p>
                    <Button label="Añadir almuerzo" class="p-button-outlined p-button-secondary" style="margin-top:1em" />
                    </div>
                    <div class="lg:col-6">
                        <Carousel :value="imagenesAlmuerzo" :numVisible="1" :numScroll="1" orientation="horizontal" verticalViewPortHeight="300px" style="max-width: 500px;">
                            <template #item="slotProps">
                                <div class="product-item">
                                    <div class="product-item-content flex align-items-stretch">
                                        <div class="mb-3">
                                            <img :src=slotProps.data.url :alt="slotProps.data.nombre" class="product-image-2"/>
                                        </div>
                                        <div>
                                            <h4 class="mb-1" style="margin-right:1em">{{slotProps.data.nombre}}</h4>                                            
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Carousel>
                    </div>
                </div>        
                <div class="card flex align-items-stretch">
                    <div class="lg:col-6">
                    <Tag class="mr-2" style="font-size:1.75rem; font-weight:600; background:#1da750;">Cena</Tag>
                    <p style="margin-top:0.5em">Carbohidratos (g): {{carbsCena}}</p>
                    <p>Proteínas (g): {{protCena}}</p>
                    <p>Grasas (g): {{grasasCena}}</p>
                    <Button label="Añadir cena" class="p-button-outlined p-button-secondary" style="margin-top:1em" />
                    </div>
                    <div class="lg:col-6">
                        <Carousel :value="imagenesCena" :numVisible="1" :numScroll="1" orientation="horizontal" verticalViewPortHeight="300px" style="max-width: 500px;">
                            <template #item="slotProps">
                                <div class="product-item">
                                    <div class="product-item-content flex align-items-stretch">
                                        <div class="mb-3">
                                            <img :src=slotProps.data.url :alt="slotProps.data.nombre" class="product-image-2"/>
                                        </div>
                                        <div>
                                            <h4 class="mb-1" style="margin-right:1em">{{slotProps.data.nombre}}</h4>                                            
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Carousel>
                    </div>
                </div>       
            </div>	
        </div>

        <!-- PARTE DERECHA -->
        <div class="col-12 lg:col-6">
            <div>
                <div class="card flex align-items-stretch">
                    <div class="lg:col-6" style="text-align:center">
                        <Tag class="mr-2" style="font-size:2.50rem; font-weight:800; background:#1da750;">{{pasosRecomendados}} pasos recomendados</Tag>
                        <Knob id="graficoPasos" :strokeWidth="5"  v-model="porcentajePasos" :valueTemplate="pasos + ' pasos'" :size="340" valueColor="#1da750" />
                    </div>

                    <div class="lg:col-6" style="text-align:center">
                        <Tag class="mr-2" style="font-size:2.50rem; font-weight:800; background:#1da750;">Ejercicios realizados</Tag>
                        <Carousel :value="imagenes" :numVisible="1" :numScroll="1" orientation="vertical" verticalViewPortHeight="200px" style="max-width: 400px; margin-top: 2em;">
                            <template #item="slotProps">
                                <div class="product-item">
                                    <div class="product-item-content">
                                        <div class="mb-3">
                                            <img :src=slotProps.data.url :alt="slotProps.data.nombre" class="product-image"/>
                                        </div>
                                        <div>
                                            <h4 class="mb-1">{{slotProps.data.nombre}}</h4>                                            
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Carousel>
                        <Button label="Añadir ejercicio" class="p-button-outlined p-button-secondary" />
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
            carbsDesayuno: 150,
            protDesayuno: 26,
            grasasDesayuno: 9,
            carbsAlmuerzo: 324,
            protAlmuerzo: 44,
            grasasAlmuerzo: 13,
            carbsCena: 70,
            protCena: 6,
            grasasCena: 4,
            imagenes: [{
                    url: "https://cdn-icons-png.flaticon.com/512/2780/2780119.png",
                    nombre: "Ejercicio 1"
                },
                {   url: "https://cdn-icons-png.flaticon.com/512/10/10699.png",
                    nombre: "Ejercicio 2"
                }
            ],
            imagenesDesayuno: [{
                    url: "https://www.coosur.com/uploads/todoSobreAceite/Pan_aceite_de_oliva800.jpg",
                    nombre: "Tostada con aceite"
                },
                {   url: "https://www.semana.com/resizer/PgBjXiUVPcInqFVT_VMAD3MVy8g=/1200x675/filters:format(jpg):quality(50)//cloudfront-us-east-1.images.arcpublishing.com/semana/UM4AUXGP25H6NM6CS7UENR32DQ.jpg",
                    nombre: "Manzana verde"
                }
            ],
            imagenesAlmuerzo: [{
                    url: "https://www.cocinacaserayfacil.net/wp-content/uploads/2018/07/macarrones-con-tomate-y-atun.jpg",
                    nombre: "Macarrones con tomate y atún"
                },
                {   url: "https://libbys.es/wordpress/wp-content/uploads/2019/01/platanofresa.jpg",
                    nombre: "Fresas con plátano"
                }
            ],
            imagenesCena: [{
                    url: "https://www.antojoentucocina.com/wp-content/uploads/2022/02/sopa-fideos-2-1024x683.jpg",
                    nombre: "Sopa con fideos"
                }
            ],
            type:"doughnut",
			doughnutData: {
            labels: ['Carbohidratos (g)','Proteinas (g)','Grasas (g)'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: ["#00bb7e","#36A2EB","#2f4860"],
                    hoverBackgroundColor: ["#00bb7e","#36A2EB","#2f4860"],
                }
            ]},
			options: {
                responsive: true,
                aspectRatio: 3.5,
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

    .product-item .product-item-content {
            border: 1px solid var(--surface-border);
            border-radius: 3px;
            margin: .3rem;
            text-align: center;
            padding: 2rem 0;
        }

        .product-image {
            width: 25%;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
        }

        .product-image-2 {
            width: 50%;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
        }
</style>