<template>
	<div class="grid">
        <!-- PARTE IZQUIERDA -->
        <div class="col-12 lg:col-6">
            <div class="grid card col-12 justify-content-center align-items-center"  style="margin-bottom:1em">
                <Chart type="doughnut" :data="pieData" :options="pieOptions"/>

                <div class="grid card col-12 align-content-center justify-content-center mt-3">
                    <div class="p-fluid col-12 lg:col-6 md:col-6">

                        <Tag class="mr-2 col-12" style="font-size:1.75rem; font-weight:600; background:#1da750; ">Desayuno</Tag>

                        <div class="formgroup-inline align-content-center justify-content-center">
                            <div class="field ml-2 mr-0 mb-0">
                                <label class="col-12 text-center">Carbohidratos</label>
                                <div class="surface-300 border-round overflow-hidden w-10rem lg:w-8rem" style="height:10px">
                                    <div class="bg-purple-500 h-full"  v-bind:style="'width:' + carbsDesayuno + '%'"> </div>
                                </div>
                                <label class="col-12 text-center">{{carbsDesayuno}}/{{carbohidratos_recomendados}}g</label>
                            </div>
                            <div class="field ml-2 mr-1 mb-0">
                                <label class="col-12 text-center">Proteínas</label>
                                <div class="surface-300 border-round overflow-hidden w-10rem lg:w-8rem" style="height:10px">
                                    <div class="bg-cyan-500 h-full"  v-bind:style="'width:' + protDesayuno + '%'"> </div>
                                </div>
                                <label class="col-12 text-center">{{protDesayuno}}/{{proteinas_recomendadas}}g</label>
                            </div>
                            <div class="field ml-2 mr-0 mb-0">
                                <label class="col-12 text-center">Grasas</label>
                                <div class="surface-300 border-round overflow-hidden w-10rem lg:w-8rem" style="height:10px">
                                    <div class="bg-yellow-400 h-full"  v-bind:style="'width:' + grasasDesayuno + '%'"> </div>
                                </div>
                                <label class="col-12 text-center">{{grasasDesayuno}}/{{grasas_recomendadas}}g</label>
                            </div>
                        </div>
                        <router-link to="/comidas/Desayuno" class="mt-1">
                            <Button label="Añadir desayuno" class="p-button-outlined p-button-secondary"/>
                        </router-link>
                    </div>
                    <div class="grid col-12 lg:col-6 md:col-6 justify-content-center align-items-center" v-if="imagenesDesayuno">
                        <Carousel :value="imagenesDesayuno" :numVisible="1" :numScroll="1" orientation="horizontal" verticalViewPortHeight="300px" style="max-width: 500px; margin-top:1em">
                            <template #item="slotProps">
                                <div class="product-item">
                                    <div class="product-item-content flex align-items-stretch">
                                        <div class="mb-3">
                                            <img :src=slotProps.data[1] :alt="slotProps.data[0]" class="product-image-2" width="100"/>
                                        </div>
                                        <div>
                                            <h4 class="mb-1 textoImagen" style="margin-right:1em">{{slotProps.data[0]}}</h4>                                           
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Carousel>
                    </div>
                </div>
                <!--Almuerzo-->
                <div class="grid card col-12 align-content-center justify-content-center">
                    <div class="p-fluid col-12 lg:col-6 md:col-6">
                        <Tag class="mr-2 col-12" style="font-size:1.75rem; font-weight:600; background:#1da750; ">Almuerzo</Tag>
                        <div class="formgroup-inline align-content-center justify-content-center">
                            <div class="field ml-2 mr-0 mb-0">
                                <label class="col-12 text-center">Carbohidratos</label>
                                <div class="surface-300 border-round overflow-hidden w-10rem lg:w-8rem" style="height:10px">
                                    <div class="bg-purple-500 h-full"  v-bind:style="'width:' + carbsAlmuerzo + '%'"> </div>
                                </div>
                                <label class="col-12 text-center">{{carbsAlmuerzo}}/{{carbohidratos_recomendados}}g</label>
                            </div>
                            <div class="field ml-2 mr-1 mb-0">
                                <label class="col-12 text-center">Proteínas</label>
                                <div class="surface-300 border-round overflow-hidden w-10rem lg:w-8rem" style="height:10px">
                                    <div class="bg-cyan-500 h-full"  v-bind:style="'width:' + protAlmuerzo + '%'"> </div>
                                </div>
                                <label class="col-12 text-center">{{protAlmuerzo}}/{{proteinas_recomendadas}}g</label>
                            </div>
                            <div class="field ml-2 mr-0 mb-0">
                                <label class="col-12 text-center">Grasas</label>
                                <div class="surface-300 border-round overflow-hidden w-10rem lg:w-8rem" style="height:10px">
                                    <div class="bg-yellow-400 h-full"  v-bind:style="'width:' + grasasAlmuerzo + '%'"> </div>
                                </div>
                                <label class="col-12 text-center">{{grasasAlmuerzo}}/{{grasas_recomendadas}}g</label>
                            </div>
                        </div>
                        <router-link to="/comidas/Almuerzo" class="mt-1">
                            <Button label="Añadir almuerzo" class="p-button-outlined p-button-secondary"/>
                        </router-link>
                    </div>
                    <div class="grid col-12 lg:col-6 md:col-6 justify-content-center align-items-center" v-if="imagenesAlmuerzo">
                        <Carousel :value="imagenesAlmuerzo" :numVisible="1" :numScroll="1" orientation="horizontal" verticalViewPortHeight="300px" style="max-width: 500px; margin-top:1em">
                            <template #item="slotProps">
                                <div class="product-item">
                                    <div class="product-item-content flex align-items-stretch">
                                        <div class="mb-3">
                                            <img :src=slotProps.data[1] :alt="slotProps.data[0]" class="product-image-2" width="100"/>
                                        </div>
                                        <div>
                                            <h4 class="mb-1 textoImagen" style="margin-right:1em">{{slotProps.data[0]}}</h4>                                           
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </Carousel>
                    </div>
                </div>
                <!--Cena-->
                <div class="grid card col-12 align-content-center justify-content-center">
                    <div class="p-fluid col-12 lg:col-6 md:col-6">
                        <div class="field grid align-content-md-center justify-content-md-center">
                            <Tag class="mr-2 col-12" style="font-size:1.75rem; font-weight:600; background:#1da750; ">Cena</Tag>
                        </div>
                        <div class="formgroup-inline align-content-center justify-content-center">
                            <div class="field ml-2 mr-0 mb-0">
                                <label class="col-12 text-center">Carbohidratos</label>
                                <div class="surface-300 border-round overflow-hidden w-10rem lg:w-8rem" style="height:10px">
                                    <div class="bg-purple-500 h-full"  v-bind:style="'width:' + carbsCena + '%'"> </div>
                                </div>
                                <label class="col-12 text-center">{{carbsCena}}/{{carbohidratos_recomendados}}g</label>
                            </div>
                            <div class="field ml-2 mr-1 mb-0">
                                <label class="col-12 text-center">Proteínas</label>
                                <div class="surface-300 border-round overflow-hidden w-10rem lg:w-8rem" style="height:10px">
                                    <div class="bg-cyan-500 h-full"  v-bind:style="'width:' + protCena + '%'"> </div>
                                </div>
                                <label class="col-12 text-center">{{protCena}}/{{proteinas_recomendadas}}g</label>
                            </div>
                            <div class="field ml-2 mr-0 mb-0">
                                <label class="col-12 text-center">Grasas</label>
                                <div class="surface-300 border-round overflow-hidden w-10rem lg:w-8rem" style="height:10px">
                                    <div class="bg-yellow-400 h-full"  v-bind:style="'width:' + grasasCena + '%'"> </div>
                                </div>
                                <label class="col-12 text-center">{{grasasCena}}/{{grasas_recomendadas}}g</label>
                            </div>
                        </div>
                        <router-link to="/comidas/Cena" class="mt-1">
                            <Button label="Añadir cena" class="p-button-outlined p-button-secondary"/>
                        </router-link>
                    </div>
                    <div class="grid col-12 lg:col-6 md:col-6 justify-content-center align-items-center" v-if="imagenesCena">
                        <Carousel :value="imagenesCena" :numVisible="1" :numScroll="1" orientation="horizontal" verticalViewPortHeight="300px" style="max-width: 500px; margin-top:1em">
                            <template #item="slotProps">
                                <div class="product-item">
                                    <div class="product-item-content flex align-items-stretch">
                                        <div class="mb-3">
                                            <img :src=slotProps.data[1] :alt="slotProps.data[0]" class="product-image-2" width="100"/>
                                        </div>
                                        <div>
                                            <h4 class="mb-1 textoImagen" style="margin-right:1em">{{slotProps.data[0]}}</h4>                                           
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
            <div class="grid card col-12  justify-content-between">
                <div class="grid col-12 lg:col-6 align-items-center justify-content-center">
                    <Tag class="col-12 text-center" style="font-size:2rem; font-weight:800; background:#1da750;">{{pasosRecomendados}} pasos recomendados</Tag>
                    <Knob class="grid justify-content-center align-item-center mt-1 text-fluid" id="graficoPasos" :strokeWidth="5"  v-model="porcentajePasos" :valueTemplate="pasos + ' pasos'" :size="250" valueColor="#1da750" />
                </div>

                <div class= "grid col-12 lg:col-6 align-content-center justify-content-center" v-if="imagenes"> <!--Si no hay ejercicios realizados no muestra esta sección-->
                    <Tag class="col-12 text-center" style="font-size:2rem; font-weight:800; background:#1da750;">Ejercicios realizados</Tag>
                    <Carousel :value="imagenes" :numVisible="1" :numScroll="1" orientation="vertical" verticalViewPortHeight="200px" class="grid justify-content-center align-item-center mt-2 ml-1">
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
                    <router-link to="/ejercicios" class="mt-1 col-12">
                        <Button label="Añadir ejercicio" class="p-button-outlined p-button-secondary col-12"/>
                    </router-link>
                </div>
            </div>

            <div class="card grid card col-12 p-fluid">
                <div class="card col-12 md:col-12">
                    <div class="text-center">
                        <Tag class="col-12 text-center" value="Peso objetivo: 74.5" style="font-size:2.75rem; font-weight:800; background:#1da750;"></Tag>
                    </div>
                </div>
                
                <div class="col-12 md:col-5" >
                    <div class="card flex justify-content-center align-items-center" style="height:48%;">
                        <div class="text-center">
                            <Tag class="col-12 text-center" value="Peso actual:"  style="font-size:1.25rem; font-weight:800; background:#1da750; margin-bottom:0.5rem"></Tag>
                            <InputNumber v-model="pesoActual" :step="0.5" showButtons buttonLayout="horizontal" decrementButtonClass="p-button-success" incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"></InputNumber>
                        </div>
                    </div>
                
                    <div class="card flex justify-content-center align-items-center" style="height:48%;">
                        <div class="text-center">
                            <Tag value="Peso de ayer:" style="font-size:1.25rem; font-weight:800; background:#1da750; margin-bottom:0.5rem"></Tag>
                            <InputNumber v-model="pesoDeAyer" :step="0.5" :disabled="true"></InputNumber>
                        </div>
                    </div>
                </div>
                
                <div class="card col-12 md:col-7">  
                    <h5 class="text-center"><i class="pi pi-chart-line"/> Gráfica de peso</h5>
                    <Chart type="line" :data="lineData" :options="lineOptions" />
                </div>
                
            </div>
        </div>
	</div>
</template>

<script>
    import DiaService from "../service/DiaService";

    export default {
        data() {
            return {
                dia: {},
                fecha: "",
                user: "",
                tipo: "",
                comidasDesayuno: {},
                comidasAlmuerzo: {},
                comidasCena: {},

                carbsDesayuno: 0,
                protDesayuno: 0,
                grasasDesayuno: 0,
                carbsAlmuerzo: 0,
                protAlmuerzo: 0,
                grasasAlmuerzo: 0,
                carbsCena: 0,
                protCena: 0,
                grasasCena: 0,
                
                pasosRecomendados:5000,
                porcentajePasos:71,
                pasos: 0,

                pesoActual: 76.5,
                pesoDeAyer: 77.0,

                imagenes: [{
                        url: "https://cdn-icons-png.flaticon.com/512/2780/2780119.png",
                        nombre: "Ejercicio 1"
                    },
                    {   url: "https://cdn-icons-png.flaticon.com/512/10/10699.png",
                        nombre: "Ejercicio 2"
                    }
                ],
                imagenesDesayuno: [],
                imagenesAlmuerzo: [],
                imagenesCena: [],

                type:"doughnut",
                pieData: {},
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
                lineData: { //CAMBIAR
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
                lineOptions: null,
                diaService: null
            }
        },
        created(){
            this.diaService = new DiaService();
        },
        mounted(){ // CAMBIAR POR UN INPUT Y QUE EL KNOB SE ACTUALICE EN FUNCIÓN DEL MISMO
            //this.pasos = this.pasosRecomendados * this.porcentajePasos / 100;
            this.obtenerDatosHome();
            this.obtenerDesayuno();
            this.obtenerAlmuerzo();
            this.obtenerCena();
        },
        methods: {
            obtenerDatosHome(){
                this.user = this.$store.state.username;
                this.fecha = this.$store.state.fechaHome;

                this.diaService.getDatosDia(this.user,this.fecha).then(data =>{
                    this.dia = data,
                    
                    this.pesoActual = this.dia.pesoActual;
                    this.pasosRecomendados = this.dia.pasosObjetivo;
                    this.pasos = this.dia.pasosRealizados;

                    this.carbsDesayuno = this.dia.carbIngeridasDesayuno;
                    this.protDesayuno = this.dia.proteinasIngeridasDesayuno;
                    this.grasasDesayuno = this.dia.grasasIngeridasDesayuno;

                    this.carbsAlmuerzo = this.dia.carbIngeridasAlmuerzo;
                    this.protAlmuerzo = this.dia.proteinasIngeridasAlmuerzo;
                    this.grasasAlmuerzo = this.dia.grasasIngeridasAlmuerzo;
                    
                    this.carbsCena = this.dia.carbIngeridasCena;
                    this.protCena = this.dia.proteinasIngeridasCena;
                    this.grasasCena = this.dia.grasasIngeridasCena;

                    var sumCarbs = this.carbsDesayuno + this.carbsAlmuerzo + this.carbsCena;
                    var sumProt = this.protDesayuno + this.protAlmuerzo + this.protCena;
                    var sumGrasas = this.grasasDesayuno + this.grasasAlmuerzo + this.grasasCena;
                    this.pieData = {
                        labels: ['Carbohidratos', 'Proteínas', 'Grasas'],
                        datasets: [
                            {
                                data: [sumCarbs, sumProt, sumGrasas],
                                backgroundColor: ["#a855f7","#06b6d4","#eec137"],
                                hoverBackgroundColor: ["#a855f7","#06b6d4","#eec137"],
                            }
                        ]
                    }
                });
            },

            obtenerDesayuno(){
                this.user = this.$store.state.username;
                this.fecha = this.$store.state.fechaHome;
                this.tipo = "Desayuno";

                this.diaService.getAlimentosDia(this.user,this.fecha,this.tipo).then(data =>{
                    this.comidasDesayuno = data;
                    var arrayAux = [];
                    for(var i = 0; i<this.comidasDesayuno.length; i++){
                        arrayAux.push(this.comidasDesayuno[i]);
                    }
                    this.imagenesDesayuno = arrayAux;
                    console.log(arrayAux);
                })
            },

            obtenerAlmuerzo(){
                this.user = this.$store.state.username;
                this.fecha = this.$store.state.fechaHome;
                this.tipo = "Almuerzo";

                this.diaService.getAlimentosDia(this.user,this.fecha,this.tipo).then(data =>{
                    this.comidasAlmuerzo = data;
                    var arrayAux = [];
                    for(var i = 0; i<this.comidasAlmuerzo.length; i++){
                        arrayAux.push(this.comidasAlmuerzo[i]);
                    }
                    this.imagenesAlmuerzo = arrayAux;
                    console.log(arrayAux);
                })
            },

            obtenerCena(){
                this.user = this.$store.state.username;
                this.fecha = this.$store.state.fechaHome;
                this.tipo = "Cena";

                this.diaService.getAlimentosDia(this.user,this.fecha,this.tipo).then(data =>{
                    this.comidasCena = data;
                    var arrayAux = [];
                    for(var i = 0; i<this.comidasCena.length; i++){
                        arrayAux.push(this.comidasCena[i]);
                    }
                    this.imagenesCena = arrayAux;
                    console.log(arrayAux);
                })
            }

        }
    }
</script>
<style>

    .p-knob {
        width: 100%;
        height: 100%;
    }

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

    @media only screen and (max-width: 1600px) {
        .textoImagen{
                    display: none;
        }
    }
</style>