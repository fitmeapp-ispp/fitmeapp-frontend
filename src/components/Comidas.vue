<template>
	<div class="grid">
		<div class="col-12">
			<div class="card mb-3 col-12">
				<div class="formgroup-inline justify-content-between align-items-between ">
					<div class="field text-center mt-3">


							<Button icon="pi pi-angle-left" v-if="tipo == 'Almuerzo'" @click="cambiarTipo('Desayuno')"/>
							<Button icon="pi pi-angle-left" v-if="tipo == 'Cena'" @click="cambiarTipo('Almuerzo')"/>

                            <h1 style="color:#256029;">{{ tipo }}</h1>
                            
                            <Button icon="pi pi-angle-right" v-if="tipo == 'Desayuno'" @click="cambiarTipo('Almuerzo')"/>
							<Button icon="pi pi-angle-right" v-if="tipo == 'Almuerzo'" @click="cambiarTipo('Cena')"/>
                            
					</div>
					<div class="field formgroup-inline justify-content-center">
						<div class="field">
							<label class="col-12 text-center">Kcalorías</label>
							<div class="surface-300 border-round overflow-hidden" style="height:10px">
								<div class="bg-orange-500 h-full"  v-bind:style="'width:' + ratiokcal + '%'"> </div>
							</div>
							<label class="col-12 text-center">{{ Math.round(dia.kcalIngeridas) }} Kcal /{{ dia.kcalRec }} Kcal</label>
						</div>
						<div class="field">
							<label class="col-12 text-center">Proteínas</label>
							<div class="surface-300 border-round overflow-hidden" style="height:10px">
								<div class="bg-purple-500 h-full"  v-bind:style="'width:' + ratioProteina + '%'"> </div>
							</div>
							<label class="col-12 text-center">{{ Math.round(dia.proteinasIngeridas) }} g /{{ dia.proteinasRec }} g</label>
						</div>
						<div class="field">
							<label class="col-12 text-center">Carbohidratos</label>
							<div class="surface-300 border-round overflow-hidden" style="height:10px">
								<div class="bg-cyan-500 h-full"  v-bind:style="'width:' + ratioCarbohidrato + '%'"> </div>
							</div>
							<label class="col-12 text-center">{{ Math.round(dia.carbIngeridas) }} g / {{ dia.carbRec }} g</label>
						</div>
						<div class="field">
							<label class="col-12 text-center">Grasas</label>
							<div class="surface-300 border-round overflow-hidden" style="height:10px">
								<div class="bg-yellow-400 h-full"  v-bind:style="'width:' + ratioGrasa + '%'"> </div>
							</div>
							<label class="col-12 text-center">{{ Math.round(dia.grasasIngeridas) }} g /{{ dia.grasasRec }} g</label>
						</div>
					</div>
					<div class="field mt-4 justify-content-center">
						<router-link to="/alimentos/form">
							<Button label="Añadir Comida" icon="pi pi-plus" class="p-button-success mr-2"/>
						</router-link>
					</div>
				</div>

				<div class="col-12 card surface-400">
					<div class="grid justify-content-between">
						<div class="formgroup-inline justify-content-center mt-2">
							<div class="field">
								<Button label="Favoritos" icon="pi pi-star" class="p-button-warning" @click="favoritos()"/>
							</div>
							<div class="field">
								<Button label="Recientes" @click="recientes()" />
							</div>
							<div class="field">
								<Button label="Creados" class="p-button-success" @click="creados()"/>
							</div>
							<div class="field">
								<Button label="Limpiar Filtros" icon="pi pi-filter-slash" class="p-button-danger" @click="limpiarFiltros()"/>
							</div>
						</div>
						<div class="mt-1">
							<Dropdown id="alergenos" v-model="alergenosSel2" :options="selector_alergenos2" optionLabel="name" placeholder="Alérgenos" @change="alergenos()"></Dropdown>
						</div>
					</div>
				</div>
				<div v-show=carruselVacio>
				<div class="col-12 ">
					<div class="card">
						<Carousel :value="dataviewValueCarrusel" :numVisible="4" :numScroll="3" :circular="false" :responsiveOptions="responsiveOptions">
								<template #item="slotProps">
									<div class="product-item">
										<div class="product-item-content">
											<h4 class="mb-1">{{slotProps.data.alimento.nombre}}</h4>
											<h6 class="mt-0 mb-3">Kcal: {{slotProps.data.alimento.kcal_100g}}g. Cantidad: {{slotProps.data.cantidad}}g</h6>
											<div>
												<Button label="Quitar" class="p-button-success" align="right" v-on:click="eliminarDelCarrusel( slotProps.data._id )" />
											</div>
										</div>
									</div>
								</template>
						</Carousel>
					</div>
				</div>
			</div>
			</div>
		</div>
		<!-- Fin del header-->
		<!-- Comienza el cuerpo-->
		<div class="grid col-12">
			<!-- Comienza la tabla con los alimentos-->
			<div class="col-12">
				<div class="card">
					<DataView :value="dataviewValue" :layout="layout"  :totalRecords="totalRecords" :lazy="true"
						:paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField" @page="onPage($event)">
						<template #header>
							<div class="grid grid-nogutter">
								<div class="col-4 text-left">
									<Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Ordenar por" @change="onSortChange($event)"/>
								</div>
								<div class="col-4 text-center">
									<span class="p-input-icon-left mb-2">
										<i class="pi pi-search" />
										<InputText placeholder="Buscar" style="width: 100%" @keyup.enter="fetchItems()" id="BuscadorComidas"/>
									</span>
								</div>
								<div class="col-4 text-right">
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
											Kcal {{ slotProps.data.kcal_100g }} g
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
									</div>
									<div class=" flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0" 
											v-if="slotProps.data.verificado">
										<Button icon="pi pi-check" class="p-button-success p-button-icon-only p-button-rounded"></Button>
									</div>
								</div>
							</div>
						</template>
						<template #grid="slotProps">
							<div @click="detallesAlimento(slotProps.data)" class="col-12 md:col-4">
								<div class="card m-3 border-1 surface-border">
									<div class="text-align-center">
										<div class="grid grid-nogutter alimento-busqueda">
											<div class="col-4 text-left">
												<img :src="slotProps.data.imagen ||'https://i.imgur.com/Z8jQBw4.png'" :alt="slotProps.data.nombre" 
														class="w-9 shadow-2 my-3 mx-0" id="imagen-busqueda"/>
											</div>
											<div class="col-8 text-left">
												<div class="text-2xl font-bold">
													{{ slotProps.data.nombre }}
												</div>
												<div class="mb-3"></div>
												<div class="mb-3">
													Kcal {{ slotProps.data.kcal_100g }} g
												</div>
												<div class="mb-3">
													Grasas {{ slotProps.data.grasa_100g }} g
												</div>
												<div class="mb-3">
													Carbohidratos {{ slotProps.data.carbohidratos_100g }} g
												</div>
												<div class="mb-3">
													Proteínas {{ slotProps.data.proteinas_100g }} g
												</div>
											</div>
										</div>
									</div>
									<div class="flex align-items-center justify-content-between"
											v-if="slotProps.data.verificado">
										<div></div>
										<Button icon="pi pi-check" class="p-button-success p-button-icon-only p-button-rounded"></Button>
									</div>
								</div>
							</div>
						</template>
					</DataView>
				</div>
			</div>
			<!-- Fin tabla con los alimentos-->
			<!-- Comienzan los detalles-->
			<Dialog v-model:visible="alimentoDialog" header="Detalles del alimento" :modal="true" class="p-fluid" style="flex: 0 0 auto; width: 66.6667%" @close="this.imagenesAlergenos = []">
				<div class="contenedor-imagen-detalles">
					<img :src="alimento.imagen_peq" :alt="alimento.nombre" class="mt-0 mx-auto mb-5 block shadow-2 imagen-comida-detalles"/>
					<h4 class="centered">{{ alimento.nombre }}</h4>
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
									<Button class="p-button" @click="anyadirConsumicion(alimento._id)">
										<span class="p-button-label">Añadir</span>
									</Button>
								</div>
							</div>
						</div>
					</div>
					<div class="formgroup-inline justify-content-around">
						<div class=" field bg-gray-500 card lg:col-6 md:col-12 justify-content-center">
							<div class="row justify-content-center text-center flex">
								<h4 class="tituloDetalles text-center p-flex">
									Valores nutricionales (100g)
								</h4>
							</div>
							<div class="formgroup-inline justify-content-around row text-center flex">
								<div class="field">
									<h5 class="p-flex">
										<b>Kcal:</b> {{ alimento.kcal_100g }} Kcal
									</h5>
								</div>
								<div class="field">
									<h5 class="p-flex align-self-center">
										<b>Proteinas:</b> {{ alimento.proteinas_100g }} g
									</h5>
								</div>
							</div>
							<div class="formgroup-inline justify-content-around row text-center flex">
								<div class="field">
									<h5 class="p-flex">
										<b>Carbohidratos:</b> {{ alimento.carbohidratos_100g }} g de
										los cuales <b>azúcares: </b>{{ alimento.azucares_100g }} g
									</h5>
								</div>
							</div>
							<div class="formgroup-inline justify-content-around row text-center flex">
								<div class="field">
									<h5 class="p-flex">
										<b>Grasas:</b> {{ alimento.grasa_100g }} g de las cuales
										<b>saturadas: </b>{{ alimento['grasas-std_100g'] }} g
									</h5>
								</div>
							</div>
							<div class="formgroup-inline justify-content-around row text-center flex">
								<div class="field">
									<h5 class="p-flex"><b>Sal:</b> {{ alimento.sal_100g }} g</h5>
								</div>
								<div class="field">
									<h5 class="p-flex">
										<b>Sodio:</b> {{ alimento.sodio_100g }} g
									</h5>
								</div>
								<div class="field">
									<h5 class="p-flex">
										<b>Fibra:</b> {{ alimento.fibra_100g }} g
									</h5>
								</div>
								<div class="field">
									<h5 class="p-flex">
										<b>Colesterol:</b> {{ alimento.colesterol_100g }} g
									</h5>
								</div>
								<div class="field">
									<h5 class="p-flex">
										<b>Potasio:</b> {{ alimento.potasio_100g }} g
									</h5>
								</div>
							</div>
						</div>
						<div class="field bg-gray-500 card lg:col-5 md:col-12 justify-content-center">
							<div class="row justify-content-center text-center flex">
								<h4 class="tituloDetalles text-center p-flex">Alérgenos</h4>
							</div>
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
		</div>
		<!-- Fin cuerpo-->
	</div> 
</template>

<script>
	import AlimentoService from "../service/AlimentoService";
	export default {
		data() {
			return {
				tipo: "",
				dia: {},
				alimentoDialog: false,
				carruselVacio: false,
				dataviewValueCarrusel: {},
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
						breakpoint: '1024px',
						numVisible: 3,
						numScroll: 3
					},
					{
						breakpoint: '600px',
						numVisible: 2,
						numScroll: 2
					},
					{
						breakpoint: '480px',
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
			}
		},
		alimentoService: null,
		created(){
			this.alimentoService = new AlimentoService();
			//this.dataviewValueCarrusel = [{'alimento': {"nombre": ""}}];
		},
		mounted() {
			this.lazyParams = {
				pagina: 0,
				sort: [], //2 items: sortField y sortOrder (Ejemplo: Nombre,-1 ==> Ordenar por nombre inversamente)
				filters: ''
			};
			this.fetchItems();
			this.obtenerDatosDia(); 
		},
		methods: {
			//EMPIEZA BUSCADOR/PAGINACION/FILTRO/ORDEN
			fetchItems(){
				if (this.isRecientes === true){
					this.alimentoService.getRecientes(this.$store.state.userId, this.lazyParams, document.getElementById('BuscadorComidas').value)
					.then(data => {
						this.totalRecords = data.total;
						this.dataviewValue = data.resultado;
					});
				}else if (this.isFavoritos === true){
					this.alimentoService.getFavoritos(this.$store.state.userId, this.lazyParams, document.getElementById('BuscadorComidas').value)
					.then(data => {
						this.totalRecords = data.total;
						this.dataviewValue = data.resultado;
				});
				}else if (this.isCreados === true){
					this.alimentoService.getCreados(this.$store.state.username, this.lazyParams, document.getElementById('BuscadorComidas').value)
					.then(data => {
						this.totalRecords = data.total;
						this.dataviewValue = data.resultado;
					});
				}else{
					this.alimentoService.getAlimentos(this.lazyParams, document.getElementById('BuscadorComidas').value)
					.then(data => {
						this.totalRecords = data.total;
						this.dataviewValue = data.resultado;
					});
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
				this.tipo = this.$route.params.tipo
				this.alimentoService.getDia(this.tipo).then(data =>{this.dia = data,
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
			anyadirConsumicion(alimentoId){
				this.alimentoService.anyadirACarrusel(alimentoId,this.cantidad,this.dia._id,this.dia.tipo)
				.then(() => {this.obtenerDatosDia()
					this.cantidad = 0;
					this.alimentoDialog = false
				});
			},
			obtenerAlergenos(alergenosAlimento){
				let imagenesAlergenos = [];
				for (let [alergeno, expresion] of Object.entries(this.dctAlergenos))
				{
					if (expresion.test(alergenosAlimento.toLowerCase()))
					{
						imagenesAlergenos.push(alergeno);
					}
				}
				return imagenesAlergenos;
			},
			cambiarTipo(tipo){
				location.href ='/comidas/'+tipo
			}
		}
	}
</script>

<style scoped lang="scss">
@import "../assets/demo/badges.scss";
@import "../assets/styles/comidas.scss";
</style>