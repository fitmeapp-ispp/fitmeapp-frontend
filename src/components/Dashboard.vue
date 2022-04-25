<template>
	<div class="grid">
        <!-- BANNER CONSULTA POR DIAS -->
        <div class="col-12 lg:col-12">
            <div class="card flex">
                <div class="col-4 lg:col-4" align="left"> 
                    <Button icon="pi pi-angle-left" class="p-button-rounded p-button-success p-button-outlined" @click="retrasarDia()"/>
                </div>
                <div class="col-4 lg:col-4" align="center"> 
                    <Calendar id="buttonbar" dateFormat="dd-mm-yy" v-model="fechaConsulta" :showButtonBar="true" :maxDate="new Date()" :showIcon="true" :locale="es" @date-select="cambiarFecha($event)"/>
                </div>
                <div class="col-4 lg:col-4" align="right">
                    <Button icon="pi pi-angle-right" class="p-button-rounded p-button-success p-button-outlined"  @click="avanzarDia()" :disabled="comprobarFecha"/>
                </div>
            </div>
        </div>
        <!-- PARTE IZQUIERDA -->
        {{dia}}
        {{indiceEjercicio}}
        <div class="col-12 lg:col-6">
            <div class="grid card col-12 justify-content-center align-items-center"  style="margin-bottom:1em">
                <div class="grid card col-12 align-content-center justify-content-center">
                    <div class="col-12 lg:col-6 flex flex-column align-items-center justify-content-between">
                        <Tag class="col-12 textoResponsive">Calorías</Tag>
                        <div class="col-12 grid justify-content-between">
                            <div class="col-12 lg:col-4 flex flex-column align-items-center">
                                <h4 class="col-12 flex justify-content-center titulo-calorias">Consumidas</h4>
                                <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                                    <Badge class="col-12 flex justify-content-center align-items-center line-height-1" severity="info" size="xlarge" :value="Math.trunc(dia.kcalIngeridasDesayuno + dia.kcalIngeridasAlmuerzo + dia.kcalIngeridasCena)" />
                                </div>
                            </div>
                            <div class="col-12 lg:col-4 flex flex-column align-items-center">
                                <h4 class="col-12 flex justify-content-center titulo-calorias">Quemadas</h4>
                                <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                                    <Badge class="col-12 flex justify-content-center align-items-center line-height-1" severity="warning" size="xlarge" :value="Math.trunc(kcalQuemadas + kcalQuemadasPasos)" />
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="col-12 flex flex-column align-items-center">
                                <h3 class="col-12 flex justify-content-center">Restantes</h3>
                                <div class="flex align-items-center py-3 px-2 border-top-1 surface-border">
                                    <Badge class="col-12 flex justify-content-center align-items-center line-height-1" :severity="Math.trunc(dia.kcalRec - dia.kcalIngeridasDesayuno - dia.kcalIngeridasAlmuerzo - dia.kcalIngeridasCena + kcalQuemadas + kcalQuemadasPasos) == 0 ? 'success' : 'danger'" size="xlarge" :value="Math.trunc(dia.kcalRec - dia.kcalIngeridasDesayuno - dia.kcalIngeridasAlmuerzo - dia.kcalIngeridasCena + kcalQuemadas + kcalQuemadasPasos)" />
                                </div>
                                <h3 v-if="Math.trunc(dia.kcalRec - dia.kcalIngeridasDesayuno - dia.kcalIngeridasAlmuerzo - dia.kcalIngeridasCena + kcalQuemadas + kcalQuemadasPasos) == 0">Objetivo conseguido!</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 lg:col-6 flex flex-column align-items-center">
                        <Tag class="col-12 textoResponsive">Macronutrientes</Tag>
                        <div class="col-10">
                            <Chart style="max-width:310px; align-content:center;" type="doughnut" :data="pieData" :options="lightOptions" />
                        </div>
                    </div>
                </div>

                <div class="grid card col-12 align-content-center justify-content-center mt-3">
                    <Tag class="mr-2 col-12" style="font-size:1.75rem; font-weight:600; background:#1da750; ">Desayuno</Tag>
                    <div class="p-fluid col-12 lg:col-8 md:col-8"> 
                        <div class="formgroup-inline align-content-center justify-content-around">
                            <div class="field ml-2 mr-0 mb-0 text-center">
                                <label class="col-12">KCalorías</label>
                                <div class="border-round overflow-hidden w-10rem" style="height:10px;" id="barraKcal">
                                    <div class="h-full"  v-bind:style="'width:' + (dia.kcalIngeridasDesayuno/(dia.kcalRec/3))*100 + '%'" id="kcalIngeridos"> </div>
                                </div>
                                <label class="col-12">{{Math.trunc(dia.kcalIngeridasDesayuno)}}/{{ Math.trunc((dia.kcalRec/3))}} kcal</label>
                            </div>
                            <div class="field ml-2 mr-0 mb-0">
                                <label class="col-12 text-center">Carbohidratos</label>

                                <div class="border-round overflow-hidden w-10rem" style="height:10px;" id="barraCarb">
                                    <div class="h-full"  v-bind:style="'width:' + (carbsDesayuno/(dia.carbRec/2))*100 + '%'" id="carbIngeridos"> </div>
                                </div>
                                <label class="col-12 text-center">{{Math.trunc(carbsDesayuno)}}/{{ Math.trunc(dia.carbRec/2)}} g</label>
                            </div>
                        </div>
                        <div class="formgroup-inline align-content-center justify-content-around">
                            <div class="field ml-2 mr-1 mb-0">
                                <label class="col-12 text-center">Proteínas</label>
                                <div class="border-round overflow-hidden w-10rem" style="height:10px;" id="barraProteinas">
                                    <div class="h-full"  v-bind:style="'width:' + (protDesayuno/(dia.proteinasRec/3))*100 + '%'" id="protIngeridos"> </div>
                                </div>
                                <label class="col-12 text-center">{{ Math.trunc(protDesayuno)}}/{{  Math.trunc(dia.proteinasRec/3)}} g</label>
                            </div>
                            <div class="field ml-2 mr-0 mb-0">
                                <label class="col-12 text-center">Grasas</label>
                                <div class="border-round overflow-hidden w-10rem" style="height:10px;" id="barraGrasas">
                                    <div class="h-full"  v-bind:style="'width:' + (grasasDesayuno/(dia.grasasRec/3))*100 + '%'" id="grasasIngeridos"> </div>
                                </div>
                                <label class="col-12 text-center">{{ Math.trunc(grasasDesayuno)}}/{{ Math.trunc(dia.grasasRec/3)}} g</label>
                            </div>
                        </div>
                    </div>
                    <div class="grid col-12 lg:col-4 md:col-4 justify-content-center align-items-center" v-if="imagenesDesayuno.length > 0">

                        <Galleria class="col-12" :value="imagenesDesayuno" :numVisible="1" :circular="true" :autoPlay="true" :transitionInterval="2000" containerStyle="max-width: 500px; margin: auto">
                            <template #item="slotProps" class="flex flex-column">
                                <div class="flex justify-content-center" style="height:120px;">
                                    <img :src="slotProps.item[1]" :alt="slotProps.item[0]" style="display: block;"  class="product-image-2 mt-2"/>
                                </div>
                                <div class="my-4 textoImagen text-center white-space-nowrap overflow-hidden text-overflow-ellipsis font-bold" style="width:200px">
                                    {{slotProps.item[0]}}
                                </div>
                            </template>
                        </Galleria>
                    </div>
                    <div class="grid col-12 lg:col-4 md:col-4 justify-content-center align-items-center" v-else>
                        <Galleria :value="sinConsumicion" :numVisible="1" :circular="false" :autoPlay="false" orientation="horizontal" verticalViewPortHeight="300px" style="max-width: 500px; margin-top:1em">
                            <template #item="slotProps" class="flex flex-column">
                                <div class="flex justify-content-center" style="height:120px;">
                                    <img :src="slotProps.item[1]" :alt="slotProps.item[0]" style="display: block;"  class="product-image-2 mt-2"/>
                                </div>
                                <div class="my-4 textoImagen text-center white-space-nowrap overflow-hidden text-overflow-ellipsis font-bold" style="width:200px">
                                    {{slotProps.item[0]}}
                                </div>
                            </template>
                        </Galleria>
                    </div>
                    <router-link to="/comidas/Desayuno" class="mt-1 col-12">
                        <Button label="Añadir desayuno" class="p-button-outlined p-button-secondary col-12"/>
                    </router-link>
                </div>
                <!--Almuerzo-->
                <div class="grid card col-12 align-content-center justify-content-center">
                    <Tag class="mr-2 col-12" style="font-size:1.75rem; font-weight:600; background:#1da750; ">Almuerzo</Tag>
                    <div class="p-fluid col-12 lg:col-8 md:col-8"> 
                        <div class="formgroup-inline align-content-center justify-content-around">
                            <div class="field ml-2 mr-0 mb-0">
                                <label class="col-12 text-center">KCalorías</label>

                                <div class="border-round overflow-hidden w-10rem" style="height:10px;" id="barraKcal">
                                    <div class="h-full" v-bind:style="'width:' + (dia.kcalIngeridasAlmuerzo/(dia.kcalRec/3))*100 + '%'" id="kcalIngeridos"> </div>
                                </div>
                                <label class="col-12 text-center">{{Math.trunc(dia.kcalIngeridasAlmuerzo)}}/{{ Math.trunc(dia.kcalRec/3) }} kcal</label>
                            </div>
                            <div class="field ml-2 mr-0 mb-0">
                                <label class="col-12 text-center">Carbohidratos</label>
                                <div class="border-round overflow-hidden w-10rem" style="height:10px;" id="barraCarb">
                                    <div class="h-full"  v-bind:style="'width:' + (carbsAlmuerzo/(dia.carbRec/2))*100 + '%'" id="carbIngeridos"> </div>
                                </div>
                                <label class="col-12 text-center">{{ Math.trunc(carbsAlmuerzo)}}/{{ Math.trunc(dia.carbRec/2)}} g</label>
                            </div>
                        </div>
                        <div class="formgroup-inline align-content-center justify-content-around">
                            <div class="field ml-2 mr-1 mb-0">
                                <label class="col-12 text-center">Proteínas</label>
                                <div class="border-round overflow-hidden w-10rem" style="height:10px;" id="barraProteinas">
                                    <div class="h-full"  v-bind:style="'width:' + (protAlmuerzo/(dia.proteinasRec/3))*100 + '%'" id="protIngeridos"> </div>
                                </div>
                                <label class="col-12 text-center">{{ Math.trunc(protAlmuerzo)}}/{{Math.trunc(dia.proteinasRec/3)}} g</label>
                            </div>
                            <div class="field ml-2 mr-0 mb-0">
                                <label class="col-12 text-center">Grasas</label>
                                <div class="border-round overflow-hidden w-10rem" style="height:10px;" id="barraGrasas">
                                    <div class="h-full"  v-bind:style="'width:' + (grasasAlmuerzo/(dia.grasasRec/3))*100 + '%'" id="grasasIngeridos"> </div>
                                </div>
                                <label class="col-12 text-center">{{ Math.trunc(grasasAlmuerzo)}}/{{Math.trunc(dia.grasasRec/3)}} g</label>
                            </div>
                        </div>
                    </div>
                    <div class="grid col-12 lg:col-4 md:col-4 justify-content-center align-items-center" v-if="imagenesAlmuerzo.length > 0">
                        <Galleria :value="imagenesAlmuerzo" :numVisible="1" :circular="true" :autoPlay="true" :transitionInterval="2000" containerStyle="max-width: 500px; margin: auto">
                            <template #item="slotProps" class="flex flex-column">
                                <div class="flex justify-content-center" style="height:120px;">
                                    <img :src="slotProps.item[1]" :alt="slotProps.item[0]" style="display: block;"  class="product-image-2 mt-2"/>
                                </div>
                                <div class="my-4 textoImagen text-center white-space-nowrap overflow-hidden text-overflow-ellipsis font-bold" style="width:200px">
                                    {{slotProps.item[0]}}
                                </div>
                            </template>
                        </Galleria>
                    </div>
                    <div class="grid col-12 lg:col-4 md:col-4 justify-content-center align-items-center" v-else>
                        <Galleria :value="sinConsumicion" :numVisible="1" :circular="false" :autoPlay="false" orientation="horizontal" verticalViewPortHeight="300px" style="max-width: 500px; margin-top:1em">
                            <template #item="slotProps" class="flex flex-column">
                                <div class="flex justify-content-center" style="height:120px;">
                                    <img :src="slotProps.item[1]" :alt="slotProps.item[0]" style="display: block;"  class="product-image-2 mt-2"/>
                                </div>
                                <div class="my-4 textoImagen text-center white-space-nowrap overflow-hidden text-overflow-ellipsis font-bold" style="width:200px">
                                    {{slotProps.item[0]}}
                                </div>
                            </template>
                        </Galleria>
                    </div>
                    <router-link to="/comidas/Almuerzo" class="mt-1 col-12">
                        <Button label="Añadir almuerzo" class="p-button-outlined p-button-secondary col-12"/>
                    </router-link>
                </div>
                <!--Cena-->
                <div class="grid card col-12 align-content-center justify-content-center">
                    <Tag class="mr-2 col-12" style="font-size:1.75rem; font-weight:600; background:#1da750; ">Cena</Tag>
                    <div class="p-fluid col-12 lg:col-8 md:col-8"> 
                        <div class="formgroup-inline align-content-center justify-content-around">
                            <div class="field ml-2 mr-0 mb-0">
                                <label class="col-12 text-center">KCalorías</label>
                                <div class="border-round overflow-hidden w-10rem" style="height:10px;" id="barraKcal">
                                    <div class="h-full"  v-bind:style="'width:' + (dia.kcalIngeridasCena/(dia.kcalRec/3))*100 + '%'" id="kcalIngeridos"> </div>
                                </div>
                                <label class="col-12 text-center">{{Math.trunc(dia.kcalIngeridasCena)}}/{{ Math.trunc(dia.kcalRec/3 )}} kcal</label>
                            </div>
                            <div class="field ml-2 mr-0 mb-0">
                                <label class="col-12 text-center">Carbohidratos</label>
                                <div class="border-round overflow-hidden w-10rem" style="height:10px;" id="barraCarb">
                                    <div class="h-full"  v-bind:style="'width:' + (carbsCena)*100 + '%'" id="carbIngeridos"> </div>
                                </div>
                                <label class="col-12 text-center">{{ Math.trunc(carbsCena)}}/0g</label>
                            </div>
                        </div>
                        <div class="formgroup-inline align-content-center justify-content-around">
                            <div class="field ml-2 mr-1 mb-0">
                                <label class="col-12 text-center">Proteínas</label>
                                <div class="border-round overflow-hidden w-10rem" style="height:10px;" id="barraProteinas">
                                    <div class="h-full"  v-bind:style="'width:' + (protCena/(dia.proteinasRec/3))*100 + '%'" id="protIngeridos"> </div>
                                </div>
                                <label class="col-12 text-center">{{ Math.trunc(protCena)}}/{{Math.trunc(dia.proteinasRec/3)}} g</label>
                            </div>
                            <div class="field ml-2 mr-0 mb-0">
                                <label class="col-12 text-center">Grasas</label>
                                <div class="border-round overflow-hidden w-10rem" style="height:10px;" id="barraGrasas">
                                    <div class="h-full"  v-bind:style="'width:' + (grasasCena/(dia.grasasRec/3))*100 + '%'" id="grasasIngeridos"> </div>
                                </div>
                                <label class="col-12 text-center">{{ Math.trunc(grasasCena)}}/{{Math.trunc(dia.grasasRec/3)}} g</label>
                            </div>
                        </div>
                    </div>
                    <div class="grid col-12 lg:col-4 md:col-4 justify-content-center align-items-center" v-if="imagenesCena.length > 0">
                        <Galleria :value="imagenesCena" :numVisible="1" :circular="true" :autoPlay="true" :transitionInterval="2000" containerStyle="max-width: 500px; margin: auto">
                            <template #item="slotProps" class="flex flex-column">
                                <div class="flex justify-content-center" style="height:120px;">
                                    <img :src="slotProps.item[1]" :alt="slotProps.item[0]" style="display: block;"  class="product-image-2 mt-2"/>
                                </div>
                                <div class="my-4 textoImagen text-center white-space-nowrap overflow-hidden text-overflow-ellipsis font-bold" style="width:200px">
                                    {{slotProps.item[0]}}
                                </div>
                            </template>
                        </Galleria>
                    </div>
                    <div class="grid col-12 lg:col-4 md:col-4 justify-content-center align-items-center" v-else>
                        <Galleria :value="sinConsumicion" :numVisible="1" :circular="false" :autoPlay="false" orientation="horizontal" verticalViewPortHeight="300px" style="max-width: 500px; margin-top:1em">
                            <template #item="slotProps" class="flex flex-column">
                                <div class="flex justify-content-center" style="height:120px;">
                                    <img :src="slotProps.item[1]" :alt="slotProps.item[0]" style="display: block;"  class="product-image-2 mt-2"/>
                                </div>
                                <div class="my-4 textoImagen text-center white-space-nowrap overflow-hidden text-overflow-ellipsis font-bold" style="width:200px">
                                    {{slotProps.item[0]}}
                                </div>
                            </template>
                        </Galleria>
                    </div>
                    <router-link to="/comidas/Cena" class="mt-1 col-12">
                        <Button label="Añadir cena" class="p-button-outlined p-button-secondary col-12"/>
                    </router-link>
                </div>
            </div>
        </div>

        <!-- PARTE DERECHA -->

       <div class="col-12 lg:col-6">
           <div class="grid card col-12 p-fluid justify-content-center align-items-start">

                <div class="grid col-12 lg:col-6 align-content-center justify-content-center mr-2">
                    <Tag class="col-12 text-center" style="font-size:2rem; font-weight:800; background:#1da750;">Pasos</Tag>
                    
                    <div class="my-2 text-center">
                        <Knob v-model="porcentajePasos" :valueColor="colorProgresoPasos" :strokeWidth="18" :size="175" readonly/>
                        <h3 class="mt-0" v-if="porcentajePasos >= 100">Objetivo conseguido!</h3>
                    </div>

                    <div class="card flex justify-content-center align-items-center">
                        <div class="text-center">
                            <Tag class="col-12 mb-2 text-center" value="Pasos realizados" style="font-size:1.25rem; font-weight:800; background:#1da750;"></Tag>
                            <InputNumber v-model="dia.pasosRealizados" :step="50" showButtons buttonLayout="horizontal" decrementButtonClass="p-button-success"
                            incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :min="0"
                            @focusout="actualizarPasos()" inputClass="text-center text-900 text-xl font-medium" />
                        </div>
                    </div>
                
                    <div class="card flex justify-content-center align-items-center col-12">
                        <div class="col-12 text-center">
                            <Tag class="col-12 mb-2 text-center" value="Pasos recomendados" style="font-size:1.25rem; font-weight:800; background:#1da750"></Tag>
                            <h5 class="m-0 mt-2">{{dia.pasosObjetivo}}</h5>
                        </div>
                    </div>
                </div>

                <div class="grid col-12 lg:col-6 align-content-center justify-content-center" v-if="imagenesEjercicios.length > 0"> 
                    <Tag class="col-12 text-center" style="font-size:2rem; font-weight:800; background:#1da750;">Ejercicios realizados</Tag>
                    <Carousel :value="imagenesEjercicios" :numVisible="1" :numScroll="1" orientation="vertical" verticalViewPortHeight="300px"
                    class="col-12 grid justify-content-center align-items-center mt-2 ml-1" :index="indiceEjercicio">
                        <template #item="slotProps">
                            <div class="product-item">
                                <div class="product-item-content">
                                    <Button icon="pi pi-times" class="p-button-text boton-borrar-ejercicio" 
                                    @click="confirmDeleteExercises(deleteExerciseIndex = slotProps.index)" v-tooltip.top="'Borrar ejercicio'" />
                                    <router-link :to="'/ejercicio/detalles/'+slotProps.data.ejercicio._id+'/editar/'+slotProps.data.ejecucion._id" class="link-ejercicio">
                                        <div class="mb-3">
                                            <img :src="slotProps.data.foto" :alt="slotProps.data.ejercicio.name" class="product-image"/>
                                        </div>
                                        <div>
                                            <h4 class="mb-1 text-900">{{slotProps.data.ejercicio.name}}</h4>   
                                        </div>
                                    </router-link>
                                </div>
                            </div>

                            <Dialog v-model:visible="deleteExerciseDialog" :style="{width: '450px'}" header="Confirmación" :modal="true">
                                <div class="flex align-items-center justify-content-center">
                                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                    <span v-if="exerciseToDelete">¿Quieres eliminar el ejercicio <b>{{exerciseToDelete.ejercicio.name}}</b>?</span>
                                </div>
                                <template #footer>
                                    <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteExerciseDialog = false" autofocus />
                                    <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteExercise(); slotProps.index--" />
                                </template>
                            </Dialog>
                        </template>
                    </Carousel>
                    <router-link to="/ejercicios" class="mt-1 col-9 text-center">
                        <Button label="Añadir ejercicio" class="p-button-outlined p-button-secondary col-12"/>
                        <div class="mt-2 text-center" v-if="round(dia.kcalIngeridasDesayuno + dia.kcalIngeridasAlmuerzo + dia.kcalIngeridasCena) > dia.kcalRec">
                            <h4>¡Has consumido más kcal de las recomendadas!</h4>
                            <!-- <img alt="Alerta calorías" :src="imagenBalanza()" width="150" /> -->
                        </div>
                    </router-link>
                </div>
                <div class="grid col-12 lg:col-6 align-content-center justify-content-center" v-else> 
                    <Tag class="col-12 text-center" style="font-size:2rem; font-weight:800; background:#1da750;">Ejercicios realizados</Tag>
                    <Carousel :value="sinEjercicio" :numVisible="1" :numScroll="1" orientation="vertical" verticalViewPortHeight="240px" class="col-12 grid justify-content-center align-items-center mt-2 ml-1">
                        <template #item="slotProps">
                            <div class="product-item">
                                <div class="product-item-content">
                                    <div class="mb-3">
                                        <img :src="slotProps.data[1]" :alt="slotProps.data[0]" class="product-image"/>
                                    </div>
                                    <div>
                                        <h4 class="mb-1">{{slotProps.data[0]}}</h4>                                            
                                    </div>
                                </div>
                            </div>
                        </template>
                    </Carousel>
                    <router-link to="/ejercicios" class="mt-1 col-9 text-center">
                        <Button label="Añadir ejercicio" class="p-button-outlined p-button-secondary col-12"/>
                        <div class="mt-2 text-center" v-if="round(dia.kcalIngeridasDesayuno + dia.kcalIngeridasAlmuerzo + dia.kcalIngeridasCena) > dia.kcalRec">
                            <h4>¡Has consumido más kcal de las recomendadas!</h4>
                            <!-- <img alt="Alerta calorías" :src="imagenBalanza()" width="150" /> -->
                        </div>
                    </router-link>
                </div>

            </div>

            <div class="card grid col-12 p-fluid">
                <div class="col-6">
                    <div class="card flex justify-content-center align-items-center">
                        <div class="col-12 text-center">
                            <Tag class="col-12 mb-2 text-center" value="Peso objetivo" style="font-size:1.25rem; font-weight:800; background:#1da750;" />
                            <h5 class="m-0 mt-2">{{pesoObjetivo}} kg</h5>
                        </div>
                    </div>
                </div>

                <div class="col-6" >
                    <div class="card flex justify-content-center align-items-center">
                        <div class="text-center">
                            <Tag class="col-12 mb-2 text-center" value="Peso actual" style="font-size:1.25rem; font-weight:800; background:#1da750;"></Tag>
                            <InputNumber v-model="dia.pesoActual" :step="0.5" showButtons buttonLayout="horizontal" decrementButtonClass="p-button-success"
                            incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :min="0"
                            @focusout="savePeso()" suffix=" kg" inputClass="text-center text-900 text-xl font-medium" />
                        </div>
                    </div>
                </div>
                
                <div class="card col-12 md:col-12">  
                    <h5 class="text-center"><i class="pi pi-chart-line"/> Gráfica de peso</h5>
                    <Chart type="line" :data="lineData" :options="lineOptions" />
                </div>
            </div>

            <!--contador agua-->
             <div class="card grid col-12 p-fluid">

                <div class="card col-12 md:col-12">
                    <div class="text-center">
                    <Tag class="col-12 text-center" style="font-size:2.75rem; font-weight:800; background:#1da750;">Contador de agua</Tag>
                    </div>
                </div>

                <div class="field ml-2 mr-0 mb-0">
                    <label class="col-12 text-center">Litros de agua</label>
                    <div class="border-round overflow-hidden w-20rem" style="height:25px; background:#96DDFF">
                        <div class="h-full"  v-bind:style="'width:' + agua*100 + '%'" id="agua"> </div>
                    </div>
                    <label class="col-12 text-center">{{agua}}/2 L</label>
                </div>
                
                <div class="card col-12 md:col-5">
                    <Tag class="col-12 mb-2 text-center" value="Añadir agua" style="font-size:1.25rem; font-weight:800; background:#1da750;"></Tag>
                    <InputNumber v-model="agua" :step="0.125" showButtons buttonLayout="horizontal" decrementButtonClass="p-button-success"
                            incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" 
                            :min="0" :max="2" suffix=" L"/>
                </div>

                
                
                
            </div>



        </div>
	</div>

    <!-- Dialogs -->

    <!-- <Dialog v-model:visible="deleteExerciseDialog" :style="{width: '450px'}" header="Confirmación" :modal="true">
        <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="exerciseToDelete">¿Quieres eliminar el ejercicio <b>{{exerciseToDelete.ejercicio.name}}</b>?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteExerciseDialog = false" autofocus />
            <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteExercise" />
        </template>
    </Dialog> -->

</template>

<script>
    import moment from "moment";
    import DiaService from "../service/DiaService";
    import UserService from "../service/UserService";
    import ExerciseService from "../service/ExerciseService";
    import sinEjercicio from "../../public/images/sin_imagen_ejercicio.png";
    import sinAlimento from "../../public/images/sin_imagen_alimento.png";

    export default {
        data() {
            return {
                indiceEjercicio: 0,
                dia: {
                    pasosRealizados: 0,
                    pasosObjetivo: 0,
                },
                fechaConsulta: this.$store.state.fechaHome,
                fecha: "",
                user: "",
                tipo: "",
                comidasDesayuno: [],
                comidasAlmuerzo: [],
                comidasCena: [],
                arrayPesos: [],
                agua: 0,
                pesoObjetivo: 0,
                carbohidratos_recomendados: 0,
                proteinas_recomendadas: 0,
                grasas_recomendadas: 0,
                carbsDesayuno: 0,
                protDesayuno: 0,
                grasasDesayuno: 0,
                carbsAlmuerzo: 0,
                protAlmuerzo: 0,
                grasasAlmuerzo: 0,
                carbsCena: 0,
                protCena: 0,
                grasasCena: 0,
                sinConsumicion: [["No se han añadido consumiciones todavía", sinAlimento]],
                sinEjercicio: [["No se han realizado ejercicios todavía", sinEjercicio]],

                imagenesEjercicios: [],
                imagenesDesayuno: [],
                imagenesAlmuerzo: [],
                imagenesCena: [],
                
                type:"doughnut",
                pieData: {},
                lightOptions:{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                },

                lineData: {},
                kcalQuemadas: 0,
                kcalQuemadasPasos: 0,
                lineOptions: null,
                diaService: null,
                userService: null,
                exerciseService: null,
                deleteExerciseDialog: false,
                deleteExerciseIndex: 0,
            }
        },
        computed: {
            porcentajePasos() {
                let res = this.round(this.dia.pasosRealizados/this.dia.pasosObjetivo*100)
                return res >= 100 ? 100 : this.round(this.dia.pasosRealizados/this.dia.pasosObjetivo*100)
            },
            colorProgresoPasos() {
                let porcentaje = this.porcentajePasos
                if (porcentaje < 34)
                    return "red"
                else if (porcentaje < 67)
                    return "orange"
                else if (porcentaje < 100)
                    return "var(--green-500)"
                else
                    return "green"
            },
            comprobarFecha(){
                return (moment(this.$store.state.fechaHome, "YYYY-MM-DD").format('YYYY-MM-DD') == moment().format('YYYY-MM-DD'));
            },
        },
        created() {
            this.diaService = new DiaService()
            this.userService = new UserService()
            this.exerciseService = new ExerciseService()
        },
        mounted() {
            this.changeToSpanish()
            this.getPesoObjetivo()
            this.obtenerDatosHome()
            this.getEjecucionesEjercicio()
        },
        methods: {
            changeToSpanish(){
                this.$primevue.config.locale.clear = 'Limpiar';
                this.$primevue.config.locale.today = 'Hoy';
                this.$primevue.config.locale.dayNamesMin = ["Do","Lu","Ma","Mi","Ju","Vi","Sa"];
                this.$primevue.config.locale.monthNames = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
            },
            cambiarFecha(evento){
                let fechaNueva = new Date(evento).toLocaleDateString("es-ES").replaceAll("/","-");
                let day = moment(fechaNueva, "DD-MM-YYYY").format('YYYY-MM-DD');
                this.$store.dispatch("saveFechaHome", day);
                this.fechaConsulta = day;
                
                this.getPesoObjetivo();
                this.obtenerDatosHome();
                this.getEjecucionesEjercicio();
            },
            avanzarDia(){
                let dia = this.$store.state.fechaHome;
                let day = moment(dia, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');

                this.$store.dispatch("saveFechaHome", day);
                this.fechaConsulta = day;
                
                this.getPesoObjetivo();
                this.obtenerDatosHome();
                this.getEjecucionesEjercicio();
            },
            retrasarDia(){
                let dia = this.$store.state.fechaHome;
                let day = moment(dia, 'YYYY-MM-DD').subtract(1, 'days').format('YYYY-MM-DD');

                this.$store.dispatch("saveFechaHome", day);
                this.fechaConsulta = day;
                
                this.getPesoObjetivo();
                this.obtenerDatosHome();
                this.getEjecucionesEjercicio();
            },
            imagenBalanza() {
                return '/images/icono_balanza.png';
            },
            imagen_ejecucion_alta() {
                return '/images/ejecucion_alta.png';
            },
            imagen_ejecucion_media() {
                return '/images/ejecucion_media.png';
            },
            imagen_ejecucion_baja() {
                return '/images/ejecucion_baja.png';
            },
            round(num) {
                return Math.round((num + Number.EPSILON) * 100) / 100
            },
            confirmDeleteExercises() {
                this.deleteExerciseDialog = true
                this.exerciseToDelete = this.imagenesEjercicios[this.deleteExerciseIndex]
            },
            deleteExercise() {
                try {
                    this.exerciseService.borrarEjecucion(this.exerciseToDelete.ejecucion._id)
                    this.imagenesEjercicios.splice(this.deleteExerciseIndex, 1)
                    this.deleteExerciseDialog = false
                } catch (error) {
                    console.log("Error: ", error)
                }
            },
            obtenerDatosHome(){
                
                this.user = this.$store.state.username;
                this.fecha = this.$store.state.fechaHome;

                this.diaService.getDatosDia(this.user,this.fecha).then(data =>{
                    this.dia = data
                    
                    this.agua = this.dia.agua;
                    this.carbsDesayuno = this.dia.carbIngeridasDesayuno;
                    this.protDesayuno = this.dia.proteinasIngeridasDesayuno;
                    this.grasasDesayuno = this.dia.grasasIngeridasDesayuno;

                    this.carbsAlmuerzo = this.dia.carbIngeridasAlmuerzo;
                    this.protAlmuerzo = this.dia.proteinasIngeridasAlmuerzo;
                    this.grasasAlmuerzo = this.dia.grasasIngeridasAlmuerzo;
                    
                    this.carbsCena = this.dia.carbIngeridasCena;
                    this.protCena = this.dia.proteinasIngeridasCena;
                    this.grasasCena = this.dia.grasasIngeridasCena;

                    var sumCarbs = Math.trunc(this.carbsDesayuno + this.carbsAlmuerzo + this.carbsCena);
                    var sumProt = Math.trunc(this.protDesayuno + this.protAlmuerzo + this.protCena);
                    var sumGrasas = Math.trunc(this.grasasDesayuno + this.grasasAlmuerzo + this.grasasCena);

                    var restanteCarb = Math.trunc(Math.abs(data.carbRec - sumCarbs));
                    var restanteProt = Math.trunc(Math.abs(data.proteinasRec - sumProt));
                    var restanteGrasas = Math.trunc(Math.abs(data.grasasRec - sumGrasas));

                    this.pieData = {
                        labels: ['Carbohidratos consumidos','Carbohidratos restantes', 'Proteínas consumidas','Proteínas restantes', 'Grasas consumidas', 'Grasas restantes'],
                        datasets: [
                            {
                                data: [sumCarbs, restanteCarb, sumProt, restanteProt, sumGrasas, restanteGrasas],
                                backgroundColor: ["#b35a02","#d7a57b","#e30000","rgb(216 169 169)","#eec137","rgb(228 218 190)"],
                                hoverBackgroundColor: ["#b35a02","#d7a57b","#e30000","rgb(216 169 169)","#eec137","rgb(228 218 190)"],
                            }
                        ]
                    }

                    this.obtenerDesayuno();
                    this.obtenerAlmuerzo();
                    this.obtenerCena();
                    this.obtenerPesos();
                });
            },

            getPesoObjetivo() {
                this.user = this.$store.state.username;

                this.userService.getUser(this.user).then(data =>{
                    this.pesoObjetivo = data.objetivo_peso;
                })
            },

            obtenerDesayuno() {
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
                })
            },

            obtenerAlmuerzo() {
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
                })
            },

            obtenerCena() {
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
                })
            },

            obtenerPesos() {
                this.user = this.$store.state.username;
                this.fecha = this.$store.state.fechaHome;

                this.diaService.getPesosSemana(this.user,this.fecha).then(data =>{

                    this.lineData = {
                            
                        labels: data.dias,
                        datasets: [
                            {
                                label: 'Peso registrado',
                                data: data.pesos,
                                fill: false,
                                backgroundColor: '#2f4860',
                                borderColor: '#2f4860',
                                tension: .4
                            },
                            {
                                label: 'Peso objetivo',
                                data: Array(data.dias.length).fill(this.pesoObjetivo),
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
                    }
                });
            },
            savePeso() {
                this.userService.savePeso(this.dia.pesoActual, this.$store.state.userId, this.dia._id);
            },
            actualizarPasos() {
                this.diaService.actualizarDia(this.dia._id, {pasosRealizados: this.dia.pasosRealizados});
                this.kcalQuemadasPasos = 350/10000 * this.dia.pasosRealizados
            },
            saveAgua() {
                this.userService.saveAgua(this.agua, this.dia._id);
            },
            async getEjecucionesEjercicio() {
                let ejecuciones = await this.exerciseService.getEjecuciones(this.$store.state.userId, this.$store.state.fechaHome)
                this.ejecucionesEjercicio = ejecuciones.data

                let ejercicios = []
                
                for (let ejecucion of ejecuciones.data) {
                    this.kcalQuemadas += ejecucion.kcal;
                    let ejercicio = await this.exerciseService.getExerciseById(ejecucion.ejercicio)
                    
                    ejercicios.push(ejercicio)

                    switch (ejecucion.intensidad) {
                        case "Alta":
                            this.imagenesEjercicios.push({foto: this.imagen_ejecucion_alta(), ejecucion: ejecucion, ejercicio: ejercicio.data})
                            break
                        case "Media":
                            this.imagenesEjercicios.push({foto: this.imagen_ejecucion_media(), ejecucion: ejecucion, ejercicio: ejercicio.data})
                            break
                        case "Baja":
                            this.imagenesEjercicios.push({foto: this.imagen_ejecucion_baja(), ejecucion: ejecucion, ejercicio: ejercicio.data})
                            break
                    }
                }
            }
        }
    }
</script>
<style lang="scss">

    .p-button {
        color: #ffffff;
        background: #1da750;
        border: 1px solid #ced4da;
    }

    .p-button:enabled:hover {
        background: #1da750;
        color: #ffffff;
        border-color: #343a40;
    }

    .p-button.p-button-text {
        background-color: transparent;
        color: #1da750;
        border-color: transparent;
    }

    .p-button.p-button-text:enabled:hover {
        background: #1da750;
        color: #ffffff;
        border-color: #343a40;
    }

    .p-carousel .p-carousel-indicators .p-carousel-indicator.p-highlight button {
        background-color: #1da750;
    }

    .p-knob-text {
        font: bolder;
        font-size:16px !important;
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
        height: auto;
        max-height: 300px;
        min-height: 120px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
    }

    .p-galleria-item{
        flex-direction: column;
    }

    .link-ejercicio {
        position: relative;
        top: -20px;
    }

    .textoResponsive{
        font-size:1.75rem; 
        font-weight:600; 
        background:#1da750;
    }

    .boton-borrar-ejercicio {
            position: relative;
            left: 40%;
            top: -1rem;
            width: 10% !important;
            height: 16% !important;
            color: red !important;
            border-radius: 100%;

        .pi.pi-times.p-button-icon {
            font-size: 175%;
        }
    }

    @media only screen and (max-width: 1438px) {
        .product-image-2 {
            width: 100%;
        }
        .textoImagen {
            display: none;
        }
    }

    @media only screen and (max-width: 650px) {
        .p-inputtext{
            display: none;
        }
        .p-calendar.p-calendar-w-btn .p-datepicker-trigger {
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
        }
    }

    @media only screen and (max-width: 1168px){
        .textoResponsive{
            font-size:1.50rem;
        }
    }

    @media only screen and (max-width: 323px){
        .textoResponsive{
            font-size:1.10rem;
        }
    }
</style>

<style scoped lang="scss">
@import "../assets/styles/comidas.scss";
</style>