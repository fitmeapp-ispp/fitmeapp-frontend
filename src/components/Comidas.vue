<template>
	<div class="box shadow-7 mb-3 col-12 headerComida">
		<div class="formgroup-inline justify-content-around align-items-center">
			<div class="field formgroup-inline m-0 align-items-center">
				<Toast/>
					<div class="" v-if="tipo == 'Desayuno'">
						<Button class="p-button-text" :disabled="true"/>
					</div>
					<div class="" v-if="tipo == 'Almuerzo'">	
						<Button class="p-button-text p-button-rounded mr-2" icon="pi pi-angle-left" @click="cambiarTipo('Desayuno')"/>
					</div>
					<div class="" v-if="tipo == 'Cena'">	
						<Button class="p-button-text p-button-rounded mr-2" icon="pi pi-angle-left" @click="cambiarTipo('Almuerzo')"/>
					</div>
					<div class="">
						<h2 class="text-center mt-3" style="color:#256029; font-size:2.5rem; font-family: 'Oswald', sans-serif;">{{ tipo }}</h2>
					</div>
					<div v-if="tipo == 'Desayuno'">
						<Button class="p-button-text p-button-rounded ml-2" icon="pi pi-angle-right" @click="cambiarTipo('Almuerzo')"/>
					</div>
					<div v-if="tipo == 'Almuerzo'">
						<Button class="p-button-text p-button-rounded ml-2" icon="pi pi-angle-right" @click="cambiarTipo('Cena')"/>
					</div>
					<div v-if="tipo == 'Cena'">
						<Button class="p-button-text" :disabled="true"/>
					</div>
			</div>
			<div class="field formgroup-inline justify-content-center m-0">
				<div class="field ml-3 w-14rem mb-0">
					<label class="col-12 text-center" style="color:#256029; font-size:1.75rem; font-family: 'Oswald', sans-serif;">Kcalorías</label>
					<div class="border-round overflow-hidden" style="height:15px" id="barraKcal">
						<div class="h-full"  v-bind:style="'width:' + ratiokcal + '%'" id="kcalIngeridos"> </div>
					</div>
					<label class="col-12 text-center text-lg">{{ Math.trunc(dia.kcalIngeridas) }}/{{ Math.trunc(dia.kcalRec) }} Kcal</label>
				</div>
				<div class="field ml-3 w-14rem mb-0">
					<label class="col-12 text-center" style="color:#256029; font-size:1.75rem; font-family: 'Oswald', sans-serif;">Proteínas</label>
					<div class="border-round overflow-hidden" style="height:15px" id="barraProteinas">
						<div class="h-full"  v-bind:style="'width:' + ratioProteina + '%'" id="protIngeridos"> </div>
					</div>
					<label class="col-12 text-center text-lg">{{ Math.trunc(dia.proteinasIngeridas) }}/{{ Math.trunc(dia.proteinasRec) }} g</label>
				</div>
				<div class="field ml-3 w-14rem mb-0">
					<label class="col-12 text-center" style="color:#256029; font-size:1.75rem; font-family: 'Oswald', sans-serif;">Carbohidratos</label>
					<div class="border-round overflow-hidden" style="height:15px" id="barraCarb">
						<div class="h-full"  v-bind:style="'width:' + ratioCarbohidrato + '%'" id="carbIngeridos"> </div>
					</div>
					<label class="col-12 text-center text-lg">{{ Math.trunc(dia.carbIngeridas) }}/{{ Math.trunc(dia.carbRec) }} g</label>
				</div>
				<div class="field ml-3 w-14rem mb-0">
					<label class="col-12 text-center" style="color:#256029; font-size:1.75rem; font-family: 'Oswald', sans-serif;">Grasas</label>
					<div class="border-round overflow-hidden" style="height:15px" id="barraGrasas">
						<div class="h-full"  v-bind:style="'width:' + ratioGrasa + '%'" id="grasasIngeridos"> </div>
					</div>
					<label class="col-12 text-center text-lg">{{ Math.trunc(dia.grasasIngeridas)}}/{{Math.trunc(dia.grasasRec) }} g</label>
				</div>
			</div>
			<div class="field m-0 justify-content-center">
				<router-link to="/alimentos/form">
					<Button label="Añadir Comida" icon="pi pi-plus" class="p-button-success"/>
				</router-link>
			</div>
		</div>
	</div>
	
	<div class="box shadow-7 mb-3 col-12 headerComidaMovil">
		<div class="formgroup-inline justify-content-around align-items-center">
			<Toast/>
			<div class="" v-if="tipo == 'Desayuno'">
				<Button class="p-button-text" :disabled="true"/>
			</div>
			<div class="" v-if="tipo == 'Almuerzo'">	
				<Button class="p-button-text p-button-rounded mr-2" icon="pi pi-angle-left" @click="cambiarTipo('Desayuno')"/>
			</div>
			<div class="" v-if="tipo == 'Cena'">	
				<Button class="p-button-text p-button-rounded mr-2" icon="pi pi-angle-left" @click="cambiarTipo('Almuerzo')"/>
			</div>
			<div class=""  @click="infoDetalles">
				<h2 class="text-center mt-3 flex align-items-center" style="color:#256029; font-size:2.5rem; font-family: 'Oswald', sans-serif;" >{{ tipo }} <i class="pi pi-chart-bar ml-3"></i></h2>
			</div>
			<div v-if="tipo == 'Desayuno'">
				<Button class="p-button-text p-button-rounded ml-2" icon="pi pi-angle-right" @click="cambiarTipo('Almuerzo')"/>
			</div>
			<div v-if="tipo == 'Almuerzo'">
				<Button class="p-button-text p-button-rounded ml-2" icon="pi pi-angle-right" @click="cambiarTipo('Cena')"/>
			</div>
			<div v-if="tipo == 'Cena'">
				<Button class="p-button-text" :disabled="true"/>
			</div>
			<Dialog v-model:visible="detallesDialog" header="Información nutricional" :modal="true" class="p-fluid">
				<div class="field formgroup-inline justify-content-center m-0">
					<div class="field ml-3 w-14rem mb-0">
						<label class="col-12 text-center font-bold text-xl">Kcalorías</label>
						<div class="border-round overflow-hidden" style="height:15px" id="barraKcal">
							<div class="h-full"  v-bind:style="'width:' + ratiokcal + '%'" id="kcalIngeridos"> </div>
						</div>
						<label class="col-12 text-center text-lg">{{ Math.trunc(dia.kcalIngeridas) }}/{{ Math.trunc(dia.kcalRec) }} Kcal</label>
					</div>
					<div class="field ml-3 w-14rem mb-0">
						<label class="col-12 text-center font-bold text-xl">Proteínas</label>
						<div class="border-round overflow-hidden" style="height:15px" id="barraProteinas">
							<div class="h-full"  v-bind:style="'width:' + ratioProteina + '%'" id="protIngeridos"> </div>
						</div>
						<label class="col-12 text-center text-lg">{{ Math.trunc(dia.proteinasIngeridas) }}/{{ Math.trunc(dia.proteinasRec) }} g</label>
					</div>
					<div class="field ml-3 w-14rem mb-0">
						<label class="col-12 text-center font-bold text-xl">Carbohidratos</label>
						<div class="border-round overflow-hidden" style="height:15px" id="barraCarb">
							<div class="h-full"  v-bind:style="'width:' + ratioCarbohidrato + '%'" id="carbIngeridos"> </div>
						</div>
						<label class="col-12 text-center text-lg">{{ Math.trunc(dia.carbIngeridas) }}/{{ Math.trunc(dia.carbRec) }} g</label>
					</div>
					<div class="field ml-3 w-14rem mb-0">
						<label class="col-12 text-center font-bold text-xl">Grasas</label>
						<div class="border-round overflow-hidden" style="height:15px" id="barraGrasas">
							<div class="h-full"  v-bind:style="'width:' + ratioGrasa + '%'" id="grasasIngeridos"> </div>
						</div>
						<label class="col-12 text-center text-lg">{{ Math.trunc(dia.grasasIngeridas)}}/{{Math.trunc(dia.grasasRec) }} g</label>
					</div>
				</div>
				<div class="field m-0 justify-content-center">
					<router-link to="/alimentos/form">
						<Button label="Añadir Comida" icon="pi pi-plus" class="p-button-success"/>
					</router-link>
				</div>
			</Dialog>
		</div>
	</div>
	
	<div class="grid mt-5">
			<div class="card mb-3 col-12" v-show="carruselVacio">
				<div class="col-12 ">
					<div class="card">
						<Carousel :value="dataviewValueCarrusel" :numVisible="4" :numScroll="3" :responsiveOptions="responsiveOptions">
								<template #item="slotProps">
									<div class="product-item">
										<div class="product-item-content">
											
											<h4 class="mb-1"> <i :class="{'pi text-blue-500 pi-lock-open mr-3': slotProps.data.calculadora, 
											'pi text-blue-500 pi-lock mr-3':!slotProps.data.calculadora}"></i> 
											
											{{slotProps.data.alimento.nombre}}</h4>
											
												{{Math.round((slotProps.data.alimento.kcal_100g + Number.EPSILON) * 100) / 100}} kcal/100g. Cantidad:
												<InputNumber inputStyle="width: 20px;" class="mt-2 mb-2 ml-5 mr-5 flex" width="10px" suffix=" g" v-model="slotProps.data.cantidad" showButtons mode="decimal" 
												:min="0" :maxFractionDigits="2" autofocus/>
												<Button  @click="anyadirConsumicion(slotProps.data.alimento._id, slotProps.data.cantidad)" label="Guardar" class="ml-2 mb-2 mr-2 p-button-secondary" />
											<div>
												<Button  v-if="!slotProps.data.calculadora" @click="aCalculadora(slotProps.data._id,slotProps.data.alimento._id)" label="A calculadora" class=" mr-2 p-button-warning" />
												<Button label="Quitar" class="p-button-danger" align="right" v-on:click="eliminarDelCarrusel( slotProps.data._id )" />
											</div>
										</div>
									</div>
								</template>
						</Carousel>
					</div>
				</div>
			</div>
		<!-- Fin del header-->
		<!-- Comienza el cuerpo-->
			<div class="card col-12">
				<div class="col-12 card surface-400">
					<div class="grid justify-content-between">
						<div class="formgroup-inline justify-content-center mt-2">
							<div class="field">
								<Button label="Favoritos" icon="pi pi-star" class="p-button-warning" @click="favoritos()" />
							</div>
							<div class="field">
								<Button label="Recientes" icon="pi pi-clock" @click="recientes()" />
							</div>
							<div class="field">
								<Button label="Creados" icon="pi pi-pencil" class="p-button-success" @click="creados()"/>
							</div>
							<div class="field">
								<Button label="Limpiar Filtros" icon="pi pi-filter-slash" class="p-button-danger" @click="limpiarFiltros()"/>
							</div>
						</div>
						<div class="formgroup-inline justify-content-center mt-2">
							<i v-if="calculando" class="pi pi-spin pi-spinner mt-2 mr-2" style="font-size: 2rem"></i>
							<div class="text-left field">
								<Button label="Calculadora" class=" text-left p-button-warning" @click="calculadora()"/>
							</div>
							<div class="text-left field">
								<Button icon="pi pi-info-circle" class=" text-left p-button-info" @click="infocalculadora()"/>
							</div>
						</div>
						<div class="mt-1">
							<Dropdown id="alergenos" v-model="alergenosSel2" :options="selector_alergenos2" optionLabel="name" placeholder="Alérgenos" @change="alergenos()"></Dropdown>
						</div>
					</div>
				</div>
				<DataView :value="dataviewValue" :layout="layout"  :totalRecords="totalRecords" :lazy="true"
					:paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField" @page="onPage($event)">
					<template #header>
						<div class="grid formgroup-inline justify-content-between ">
							<div class="field">
								<Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Ordenar por" @change="onSortChange($event)"/>
							</div>
							<div class="field">
								<span class="p-input-icon-left mb-2">
									<i class="pi pi-search" />
									<InputText placeholder="Buscar" style="width: 100%" @keyup.enter="fetchItems()" id="BuscadorComidas"/>
								</span>
							</div>
							<div class="field">
								<DataViewLayoutOptions v-model="layout" />
							</div>
						</div>
					</template>
					<template #list="slotProps">
						<div class="col-12">
							<div class="flex flex-column md:flex-row align-items-center p-3 w-full"  @click="detallesAlimento(slotProps.data)">
								<img :src="slotProps.data.imagen || 'https://i.imgur.com/Z8jQBw4.png'" :alt="slotProps.data.nombre" class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5 product-image" 
									style="width: 100%; display: block;" id="imagen-busqueda"/>
								<div class="flex-1 text-center md:text-left">
									<div class="font-bold text-2xl" style="color:#256029;">
										{{ slotProps.data.nombre }} 
									</div>
									<div class="mb-3" style="color:#256029;">
										{{ slotProps.data.kcal_100g }} kcal
									</div>
									<div class="mb-3" style="color:#256029;">
										Grasas {{ slotProps.data.grasa_100g }} g
									</div>
									<div class="mb-3" style="color:#256029;">
										Carbohidratos {{ slotProps.data.carbohidratos_100g }} g
									</div>
									<div class="mb-3" style="color:#256029;">
										Proteínas {{ slotProps.data.proteinas_100g }} g
									</div>
									<div class="mb-3">
										Cantidad máxima recomendada: {{slotProps.data.calculadora}}g
									</div>
								</div>
								<div class=" flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0" 
										v-if="slotProps.data.verificado">
									<i class="pi text-green-500 pi-check-circle" style="transform: scale(1.5);"></i>
								</div>
							</div>
						</div>
					</template>
					<template #grid="slotProps">
						<div  class="col-12 md:col-4">
							<div class="card m-3 border-1 surface-border" style="min-height: 92%">
								<div @click="detallesAlimento(slotProps.data)" class="text-align-center">
									<div class="grid grid-nogutter alimento-busqueda">
										<div class="col-4 text-left">
											<img :src="slotProps.data.imagen ||'https://i.imgur.com/Z8jQBw4.png'" :alt="slotProps.data.nombre" 
													class="w-9 shadow-2 my-3 mx-0" id="imagen-busqueda"/>
										</div>											
										<div class="col-8 text-left">
											<div class="flex align-items-center justify-content-between"
													v-if="slotProps.data.verificado">
												<div></div>
												<i class="pi text-green-500 pi-check-circle" style="transform: scale(1.5);"></i>
											</div>
											<div class="text-2xl mt-2 font-bold">
												{{ slotProps.data.nombre }}
											</div>
											<div class="mb-3"></div>
											<div class="mb-3">
												
												{{ Math.round((slotProps.data.kcal_100g + Number.EPSILON) * 100) / 100 }} kcal
											</div>
											<div class="mb-3">
												Grasas {{ Math.round((slotProps.data.grasa_100g + Number.EPSILON) * 100) / 100 }} g
											</div>
											<div class="mb-3">
												Carbohidratos {{ Math.round((slotProps.data.carbohidratos_100g + Number.EPSILON) * 100) / 100 }} g
											</div>
											<div class="mb-3">
												Proteínas {{ Math.round((slotProps.data.proteinas_100g + Number.EPSILON) * 100) / 100 }} g
											</div>
											<div class="mb-3">
												Cantidad máxima recomendada: {{slotProps.data.calculadora}}g
											</div>
										</div>
									</div>
								</div>
								<div class="grid grid-nogutter">		
									<div class="text-left font-bold col-6">
										
										<Button icon="pi pi-plus" class="p-button-rounded p-button-primary mr-2 mb-2" @click="anyadirADataViewCarrusel(slotProps.data._id, false);" />
									</div>					
									<div class="text-right font-bold col-6">
										
										<Button icon="pi pi-star" :id="slotProps.data._id" class="p-button-rounded p-button-warning mr-2 mb-2" :class="{'p-button-outlined': !this.favoritosList.includes(slotProps.data._id)}" @click="funcionFavoritos(slotProps.data._id);" />
									</div>
								</div>
							</div>
						</div>
					</template>
				</DataView>
			</div>
			<!-- Fin tabla con los alimentos-->
			<!-- Comienzan los detalles-->
			<Dialog v-model:visible="alimentoDialog" header="Detalles del alimento" :modal="true" class="p-fluid" style="flex: 0 0 auto; width: 66.6667%" @close="this.imagenesAlergenos = []">
				<div class="contenedor-imagen-detalles">
					<img :src="!(alimento.imagen_peq) ? sinAlimento : alimento.imagen_peq" :alt="alimento.nombre" class="mt-0 mx-auto mb-5 block shadow-2 imagen-comida-detalles"/>
					<h4 class="centered" style="color:#256029; font-size:2.5rem; font-family: 'Oswald', sans-serif;">{{ alimento.nombre }}</h4>
				</div>
				<div class="container">
					<div class="grid justify-content-center mb-3">
						<div class="bg-gray-300 card field col-10">
							<div class="formgroup-inline align-content-center justify-content-center">
								<div class="field mt-4 text-center" style="color: black; font-size: large">
									Añadir
								</div>
								<div class="field mt-2">
									<InputNumber id="cantidad" v-model="cantidad" showButtons mode="decimal" :min="0" :maxFractionDigits="2" autofocus class="col-1"/>
								</div>
								<div class="field mt-4 text-center" style="color: black; font-size: large">
									gramos de alimento al registro diario de hoy
								</div>
								<div class="field mt-3">
									<Button class="p-button" @click="anyadirConsumicion(alimento._id,null)">
										<span class="p-button-label">Añadir</span>
									</Button>
								</div>
							</div>
						</div>
					</div>
					<div class="formgroup-inline justify-content-around">
						<div class=" field bg-gray-300 card lg:col-6 md:col-12 justify-content-center">
							<div class="row justify-content-center text-center flex">
								<h4 class="tituloDetalles text-center p-flex" style="color:#256029; font-size:2rem; font-family: 'Oswald', sans-serif;">
									Valores nutricionales (100g)
								</h4>
							</div>
								<br>
							<div class="formgroup-inline justify-content-around row text-center flex">
								<div class="field">
									<h5 class="p-flex">
										{{ Math.round((alimento.kcal_100g + Number.EPSILON) * 100) / 100 }} Kcal
									</h5>
								</div>
								<div class="field">
									<h5 class="p-flex align-self-center">
										<b>Proteinas:</b> {{ Math.round((alimento.proteinas_100g + Number.EPSILON) * 100) / 100 }} g
									</h5>
								</div>
							</div>
							<div class="formgroup-inline justify-content-around row text-center flex">
								<div class="field">
									<h5 class="p-flex">
										<b>Carbohidratos:</b> {{ Math.round((alimento.carbohidratos_100g + Number.EPSILON) * 100) / 100 }} g de
										los cuales <b>azúcares: </b>{{Math.round((alimento.azucares_100g + Number.EPSILON) * 100) / 100 }} g
									</h5>
								</div>
							</div>
							<div class="formgroup-inline justify-content-around row text-center flex">
								<div class="field">
									<h5 class="p-flex">
										<b>Grasas:</b> {{ Math.round((alimento.grasa_100g + Number.EPSILON) * 100) / 100 }} g de las cuales
										<b>saturadas: </b>{{ Math.round((alimento['grasas-std_100g'] + Number.EPSILON) * 100) / 100 }} g
									</h5>
								</div>
							</div>
							<div class="formgroup-inline justify-content-around row text-center flex">
								<div class="field">
									<h5 class="p-flex"><b>Sal:</b> {{ Math.round((alimento.sal_100g + Number.EPSILON) * 100) / 100 }} g</h5>
								</div>
								<div class="field">
									<h5 class="p-flex">
										<b>Sodio:</b> {{ Math.round((alimento.sodio_100g + Number.EPSILON) * 100) / 100 }} g
									</h5>
								</div>
								<div class="field">
									<h5 class="p-flex">
										<b>Fibra:</b> {{ Math.round((alimento.fibra_100g + Number.EPSILON) * 100) / 100 }} g
									</h5>
								</div>
								<div class="field">
									<h5 class="p-flex">
										<b>Colesterol:</b> {{ Math.round((alimento.colesterol_100g + Number.EPSILON) * 100) / 100 }} g
									</h5>
								</div>
								<div class="field">
									<h5 class="p-flex">
										<b>Potasio:</b> {{ Math.round((alimento.potasio_100g+ Number.EPSILON) * 100) / 100 }} g
									</h5>
								</div>
							</div>
						</div>
						<div class="field bg-gray-300 card lg:col-5 md:col-12 justify-content-center">
							<div class="row justify-content-center text-center flex">
								<h4 class="tituloDetalles text-center p-flex" style="color:#256029; font-size:2rem; font-family: 'Oswald', sans-serif;">Alérgenos</h4>
							</div>
							<br>
							<div class="formgroup-inline row flex justify-content-around">
								<div class="field" v-for="alergeno of obtenerAlergenos(alimento.alergenos)" :key="alergeno">
									<span class="p-image p-component p-image-preview-container">
										<img :src="'images/alergenos/' + alergeno + '.svg'" width="100" :alt="alergeno"/>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Dialog>
			<!-- Fin detalles-->

			<Dialog v-model:visible="infoDialog" header="Información sobre el funcionamiento de la Calculadora" :modal="true" class="p-fluid" style="flex: 0 0 auto; width: 66.6667%">
				<div class="container">
					<div class="grid justify-content-center mb-3">
						<div class="bg-gray-300 card field col-10">
							<div class="formgroup-inline align-content-center justify-content-center">
								<span>
									Para indicar qué alimentos han sido consumidos en cada comida, disponemos de un carrusel donde aparecerán todos los alimentos que marquemos,
									así como un campo donde se podrá modificar la cantidad de ese alimento que se ha tomado. Para el correcto funcionamiento de la calculadora
									será necesario indicar un mínimo de 3 alimentos.  Aunque todos los alimentos se añadan al carrusel, no todos tiene porque ser calculados, es decir,
									es posible que el cliente quiera fijar la cantidad a comer de ciertos alimentos.
								</span>

							</div>
						</div>
						<br>
						<div class="bg-gray-300 card field col-10">
							<div class="formgroup-inline align-content-center justify-content-center">
								<span>
									Tenemos dos formas de añadir alimentos al carrusel: 
								</span>
								<ol>
									<li>Pulsando el botón + en las tarjetas del alimento deseado.</li>

									<li>Entrando en el detalle de un alimento: encontraremos un campo a rellenar con los gramos 
										a los que queremos fijar ese alimento.</li>
								</ol> 

							</div>
						</div>
						<br>
						<div class="bg-gray-300 card field col-10">
							<div class="formgroup-inline align-content-center justify-content-center">
								<span>
									En el carrusel tenemos 3 botones:
								</span>
								<ol>
									<li>“Quitar”: Para eliminar un alimento del carrusel, es decir, borrar la consumición. </li>

									<li> “Guardar”:  nos permitirá almacenar el cambio de cantidades o fijar sus cantidades.</li>

									<li> "A calculadora": nos permite entrar en “Modo calculadora”, 
										que nos permite cambiar las cantidades de todos los alimentos para que se calculen las propiedades.</li>
								</ol> 
								<img style="width: 70%;height: auto;" src='https://i.imgur.com/SnyNZ62.png' alt='Captura de la aplicación'>
							</div>
						</div>
						<div class="bg-gray-300 card field col-10">
							<div class="formgroup-inline align-content-center justify-content-center">
								<span>
									Para aquellos alimentos que estén fijados, aparecerá además un botón "A calcular", lo cual hará 
									que ese alimento deje de estar fijo, y se incluya entre los alimentos a calcular.
								</span>
								<span>
									Una vez hayamos hecho nuestra selección de alimentos fijos, podremos pulsar el botón. 
									Una vez finalizado el cálculo, se actualizan los datos. Se fijarán en el carrusel y se actualizarán los
									indicadores de macronutrientes, que la calculadora buscará orientar a nuestro objetivo.
								</span>
								<img style="width: 70%;height: auto;" src='https://i.imgur.com/oFPc6VX.png' alt='Captura de la aplicación'>
							</div>
						</div>
						
					</div>
				</div>
			</Dialog>
		<!-- Fin cuerpo-->
	</div> 
</template>

<script>
	import AlimentoService from "../service/AlimentoService";
	import UserService from "../service/UserService";
	import sinAlimento from "../../public/images/sin_imagen_alimento.png";
	require("dotenv").config();
	export default {
		data() {
			return {
				sinAlimento: sinAlimento,
				calculando: false,
				cambioFav: false,
				tipo: "",
				dia: {},
				alimentoDialog: false,
				infoDialog: false,
				detallesDialog: false,
				carruselVacio: false,
				dataUserView: {},
				kcal_recomendadas: 0,
				carbohidratos_recomendados: 0,
				proteinas_recomendadas: 0,
				grasas_recomendadas: 0,
				ratiokcal: 0,
				ratioProteina: 0,
				ratioCarbohidrato: 0,
				ratioGrasa: 0,
				dataviewValueComida: {'kcal_100g':0,'proteinas_100g':0,'carbohidratos_100g':0,'grasa_100g':0},
				layout: 'grid',
				cantidad: null,
				sortKey: null,
				sortOrder: null,
				sortField: null,
				sortOptions: [
					{label: 'Mayor a menor número de Kcal', value: '!kcal_100g'},
					{label: 'Menor a mayor número de kcal', value: 'kcal_100g'},
					{label: 'Alfabéticamente', value: 'nombre'},
					{label: 'Alfabéticamente inverso', value: '!nombre'},
				],
				alergenosSel2: [],
				selector_alergenos2: [
					{name: 'Gluten', code: 'gluten'},
					{name: 'Crustáceos', code: 'crustaceos'},
					{name: 'Huevos', code: 'huevos'},
					{name: 'Pescado', code: 'pescado'},
					{name: 'Cacahuetes', code: 'cacahuetes'},
					{name: 'Soja', code: 'soja'},
					{name: 'Leche', code: 'leche'},
					{name: 'Frutos de cáscara', code: 'frutos_de_cascara'},
					{name: 'Apio', code: 'apio'},
					{name: 'Mostaza', code: 'mostaza'},
					{name: 'Granos de Sésamo', code: 'Sesamo'},
					{name: 'Dióxido de azufre y sulfitos', code: 'azufre_sulfitos'},
					{name: 'Altramuces', code: 'altramuces'},
					{name: 'Moluscos', code: 'moluscos'}
				],
				dctAlergenos: {
					'gluten': /(gluten)/,
					'crustaceos': /(crustaceans|crustaceos)/,
					'huevo': /(eggs|huevos)/,
					'pescado': /(fish|pescado)/,
					'cacahuetes': /(peanuts|cacahuetes)/,
					'soja': /(soybeans|soja)/,
					'leche': /(milk|leche)/,
					'frutos_de_cascara': /(nuts|frutos)/,
					'apio': /(celery|apio)/,
					'mostaza': /(mustard|mostaza)/,
					'sesamo': /(sesame|sesamo)/,
					'azufre_sulfitos': /(sulphites|sulfitos)/,
					'altramuces': /(lupins|altramuces)/,
					'moluscos': /(molluscs|moluscos)/
				},
				responsiveOptions: [
					{
						breakpoint: '1460px',
						numVisible: 3,
						numScroll: 3
					},
					{
						breakpoint: '1080px',
						numVisible: 2,
						numScroll: 2
					},
					{
						breakpoint: '820px',
						numVisible: 1,
						numScroll: 1
					}
				],
				dataviewValue: null,
				totalRecords: 0,
				lazyParams: {},
				isRecientes: false,
				isFavoritos: false,
				isCreados: false,
				dataviewValueCarrusel: [{'alimento': {'nombre': "nombre"}}]
			}
		},
		alimentoService: null,
		userService: null,
		favoritosList: [],
		created(){
			this.alimentoService = new AlimentoService();
			this.userService = new UserService();
			this.inicio();
		},
		mounted() {
			this.lazyParams = {
				pagina: 0,
				sort: [], //2 items: sortField y sortOrder (Ejemplo: Nombre,-1 ==> Ordenar por nombre inversamente)
				filters: ''
			};
			this.fetchItems();
			
		},
		methods: {
			inicio(){
				this.alimentoService.getDia(this.$store.state.userId, this.$route.params.tipo, this.$store.state.fechaHome).then(data =>{this.dia = data
				this.alimentoService.limpiarCarrusel(this.$store.state.userId,this.dia._id,this.$route.params.tipo)
				});
				this.fetchItems();
			},
			//EMPIEZA BUSCADOR/PAGINACION/FILTRO/ORDEN
			fetchItems(){

				if (this.isRecientes === true){
					this.userService.getFavoritos(this.$store.state.userId).then(data => {this.favoritosList = data
						this.alimentoService.getRecientes(this.$store.state.userId, this.lazyParams, document.getElementById('BuscadorComidas').value)
						.then(data => {
							this.totalRecords = data.total;
							this.dataviewValue = data.resultado;
							this.obtenerDatosDia(); 
						});
					});
				}else if (this.isFavoritos === true){
					this.userService.getFavoritos(this.$store.state.userId).then(data => {this.favoritosList = data
						this.alimentoService.getFavoritos(this.$store.state.userId, this.lazyParams, document.getElementById('BuscadorComidas').value,this.favoritosList)
						.then(data => {
							this.totalRecords = data.total;
							this.dataviewValue = data.resultado;
							this.obtenerDatosDia(); 
						});
					})
				}else if (this.isCreados === true){
					this.userService.getFavoritos(this.$store.state.userId).then(data => {this.favoritosList = data
						this.alimentoService.getCreados(this.$store.state.username, this.lazyParams, document.getElementById('BuscadorComidas').value)
						.then(data => {
							this.totalRecords = data.total;
							this.dataviewValue = data.resultado;
							this.obtenerDatosDia(); 
						});

					})
				}else{
					
					this.userService.getFavoritos(this.$store.state.userId).then(data => {
							this.favoritosList = data
							
						this.alimentoService.getAlimentos(this.lazyParams, document.getElementById('BuscadorComidas').value)
						.then(data => {
							this.totalRecords = data.total;
							this.dataviewValue = data.resultado;
							this.obtenerDatosDia(); 
							
						});

					})	
				}
			},
			onPage(event){
				this.lazyParams.pagina = event.page;
				this.fetchItems();	
			},
			alergenos(){
				this.lazyParams.filters = this.alergenosSel2.code;
				this.fetchItems();
			},
			onSortChange(event){
				let value = event.value.value;
				if (value.indexOf('!') === 0) {
					let sortField = value.substring(1, value.length)
					this.lazyParams.sort = [sortField,'-1']
				}
				else {
					this.lazyParams.sort = [value,'1']
				}
				this.fetchItems();
			},
			limpiarFiltros(){
				this.lazyParams = {
					pagina: 0,
					sort: [], 
					filters: ''
				};
				this.isCreados = false;
				this.isRecientes = false;
				this.isFavoritos = false;
				this.alergenosSel2 = [];
				this.sortKey = null,
				this.sortOrder = null,
				this.sortField = null,
				this.fetchItems();
			},
			//TERMINA BUSCADOR/PAGINACION/FILTRO/ORDEN
			obtenerDatosDia(){

				this.tipo = this.$route.params.tipo;
				this.$store.dispatch("saveTipo", this.tipo);
				this.alimentoService.getDia(this.$store.state.userId, this.tipo, this.$store.state.fechaHome).then(data =>{this.dia = data,

				this.dia.kcalRec = (this.dia.kcalRec/3).toFixed(2)
				if(this.tipo != "Cena"){
					this.dia.carbRec = (this.dia.carbRec/2).toFixed(2)
				}else{
					this.dia.carbRec = 0
				}
					
					
				this.dia.proteinasRec = (this.dia.proteinasRec/3).toFixed(2)
				this.dia.grasasRec = (this.dia.grasasRec/3).toFixed(2)
				this.ratios();
				
				this.carruselVacio = this.dia.consumiciones[0]._id 
				
				if (this.carruselVacio){
					this.dataviewValueCarrusel = this.dia.consumiciones
				}

				this.dia.kcalIngeridas = this.dia.kcalIngeridas.toFixed(2)
				this.dia.proteinasIngeridas = this.dia.proteinasIngeridas.toFixed(2)
				this.dia.grasasIngeridas = this.dia.grasasIngeridas.toFixed(2)
				this.dia.carbIngeridas = this.dia.carbIngeridas.toFixed(2)
				
				for (var i = 0; i< this.dataviewValue.length; i++){
					var min = 0
					var g_kcal = Math.round((this.dia.kcalRec - this.dia.kcalIngeridas)*100/this.dataviewValue[i].kcal_100g)
					var g_proteinas = Math.round((this.dia.proteinasRec - this.dia.proteinasIngeridas)*100/this.dataviewValue[i].proteinas_100g)
					var g_grasas = Math.round((this.dia.grasasRec - this.dia.grasasIngeridas)*100/this.dataviewValue[i].grasa_100g)
					var g_carb = Math.round((this.dia.carbRec - this.dia.carbIngeridas)*100/this.dataviewValue[i].carbohidratos_100g)
					this.dataviewValue[i].calculadora = Math.max(min,Math.min(g_kcal,g_proteinas,g_grasas,g_carb))
				}
				});
				
			},
			ratios(){
				this.ratiokcal = Math.round(this.dia.kcalIngeridas / this.dia.kcalRec * 100);
				if (this.ratiokcal>100) this.ratiokcal = 100;
				this.ratioProteina = Math.round(this.dia.proteinasIngeridas  / this.dia.proteinasRec * 100);
				if (this.ratioProteina>100) this.ratioProteina = 100;
				this.ratioCarbohidrato = Math.round(this.dia.carbIngeridas / this.dia.carbRec * 100);
				if (this.ratioCarbohidrato>100) this.ratioCarbohidrato = 100;
				this.ratioGrasa = Math.round(this.dia.grasasIngeridas /  this.dia.grasasRec * 100);
				if (this.ratioGrasa>100) this.ratioGrasa = 100;
			},
			favoritos(){
				this.isCreados = false;
				this.isRecientes = false;
				this.isFavoritos = true;
				this.fetchItems();
			},
			recientes(){
				this.isCreados = false;
				this.isRecientes = true;
				this.isFavoritos = false;
				this.fetchItems();
			},
			creados(){
				this.isCreados = true;
				this.isRecientes = false;
				this.isFavoritos = false;
				this.fetchItems();
			},
			eliminarDelCarrusel(consumicionId){
				this.alimentoService.deleteFromCarrusel(consumicionId,this.dia.tipo,this.dia._id).then(() => {this.obtenerDatosDia()});
			},
			detallesAlimento(alimento) {
				this.alimento = alimento;
				this.alimentoDialog = true;
			},
			infocalculadora(){
				this.infoDialog = true;
			},
			infoDetalles(){
				this.detallesDialog = true;
			},
			anyadirConsumicion(alimentoId, cantidad){
				if (cantidad == null){
					cantidad = this.cantidad
				}
				
				this.alimentoService.anyadirACarrusel(alimentoId,cantidad,this.dia._id,this.dia.tipo, false)
				.then(() => {
					this.obtenerDatosDia()
					this.cantidad = 0;
					this.alimentoDialog = false	
					
				});
			},
			anyadirADataViewCarrusel(alimentoId,aCalcular){
				
				if(!this.dataviewValueCarrusel.map(x=>x.alimento._id).includes(alimentoId) || aCalcular){

				
					this.alimentoService.anyadirACarrusel(alimentoId,0,this.dia._id,this.dia.tipo, true)
					.then(() => {
						this.obtenerDatosDia()
						this.cantidad = 0;
						this.alimentoDialog = false	
						
					});

				}
				
			},aCalculadora(consumicionId,alimentoId){
				this.alimentoService.deleteFromCarrusel(consumicionId,this.dia.tipo,this.dia._id).then(() => {this.anyadirADataViewCarrusel(alimentoId, true);});
				
			},
			obtenerAlergenos(alergenosAlimento){
				let imagenesAlergenos = [];
				if(alergenosAlimento != undefined){
					for (let [alergeno, expresion] of Object.entries(this.dctAlergenos))
					{
						if (expresion.test(alergenosAlimento.toLowerCase()))
						{
							imagenesAlergenos.push(alergeno);
						}
					}
				}
				return imagenesAlergenos;
			},
			cambiarTipo(tipo){
				this.$store.dispatch("saveTipo", tipo);
				location.href ='/comidas/'+tipo
			},
			funcionFavoritos(alimentoId){
				if(!this.favoritosList.includes(alimentoId)){
					this.favoritosList.push(alimentoId)
					//this.$forceUpdate();
					document.getElementById(alimentoId).className = document.getElementById(alimentoId).className.replace("p-button-outlined","");

					this.userService.postFavoritos(this.$store.state.userId,alimentoId)
				}else{
					this.favoritosList = this.favoritosList.filter(e => e != alimentoId)
					//this.$forceUpdate();
					if(!this.isFavoritos){
						document.getElementById(alimentoId).className += " p-button-outlined";
					}
					
					
					this.userService.deleteFavoritos(this.$store.state.userId,alimentoId).then(()=>{
						if(this.isFavoritos){
							this.fetchItems();
						}
					})

					
				}
				
				
			},
			deleteAFavoritos(alimentoId){
				this.favoritosList = this.favoritosList.filter(e => e != alimentoId)
				this.$forceUpdate();
				document.getElementById(alimentoId).className += " p-button-outlined";
				this.userService.deleteFavoritos(this.$store.state.userId,alimentoId)
			},
			calculadora(){
				this.calculando = true;
				var alimentosACalcuar = this.dataviewValueCarrusel.filter(x=>x.calculadora).map(x=>x.alimento)
				var alimentosFijos = this.dataviewValueCarrusel.filter(x=>!x.calculadora)
				var kcalRecCalculadora = this.dia.kcalRec
				var carbRecCalculadora = this.dia.carbRec
				var proteinasRecCalculadora = this.dia.proteinasRec
				var grasasRecCalculadora = this.dia.grasasRec
				if (alimentosFijos.length > 0){
					for (var i=0; i<alimentosFijos.length;i++){
						kcalRecCalculadora -= alimentosFijos[i].cantidad * alimentosFijos[i].alimento.kcal_100g/100
						carbRecCalculadora -= alimentosFijos[i].cantidad * alimentosFijos[i].alimento.carbohidratos_100g/100
						proteinasRecCalculadora -= alimentosFijos[i].cantidad * alimentosFijos[i].alimento.proteinas_100g/100
						grasasRecCalculadora -= alimentosFijos[i].cantidad * alimentosFijos[i].alimento.grasa_100g/100
					}
				}

				this.alimentoService.calculadora(alimentosACalcuar,{"kcal_100g":kcalRecCalculadora,
				"carbohidratos_100g":carbRecCalculadora, "proteinas_100g":proteinasRecCalculadora, "grasa_100g":grasasRecCalculadora},this.$toast).then(data=>{
					this.calculando = false;
					async function recargaDatos(service,dia,alimentosACalcuar){
						for (var j=0; j<data.length;j++){
						
							await service.anyadirACarrusel(alimentosACalcuar[j]._id,data[j],dia._id,dia.tipo, false);
						}
						
					}
					
					recargaDatos(this.alimentoService,this.dia,alimentosACalcuar).then(()=>{this.fetchItems()});

				})

			}
		}
	}

</script>

<style scoped lang="scss">
@import "../assets/demo/badges.scss";
@import "../assets/styles/comidas.scss";

.headerComida{
	position: -webkit-sticky;
	position: sticky;
    background-color: white;
	top: 70px;
	z-index: 999;
}

.headerComidaMovil{
	position: -webkit-sticky;
	position: sticky;
	display:none;
	top: 70px;
	z-index: 999;
    background-color: white;
}

@media only screen and (max-width: 1377px){
	.headerComida{
		display:none;
	}

	.headerComidaMovil{
		display: block;
	}

}

</style>