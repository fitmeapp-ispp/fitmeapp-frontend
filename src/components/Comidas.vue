<template>
<div>
    <div class="grid">
            <div class="col-12">
                <div class="card">
                    <div class="grid grid-nogutter mb-3">
                        <div class="col-9 text-left">
                            <h1>Almuerzo</h1>

                        </div>

							<div class="col-5 text-center">
							<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
								<span class="text-900 font-medium mr-2 mb-1 md:mb-0">KCalorías</span>
								<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
								<div class="bg-teal-500 h-full" style="width:3%"></div>
							</div>
							<span class="text-teal-500 ml-3 font-medium">66 Kcal / 2185 Kcal</span>
							</div>

							<div class="col-3 text-center"></div>

							<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
								<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Proteínas</span>
								<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
								<div class="bg-teal-500 h-full" style="width:7%"></div>
							</div>
							<span class="text-teal-500 ml-3 font-medium">19.67 g / 273 g</span>
							</div>
                        </div>

                        <div class="col-4 text-center">
							<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
								<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Carbohidratos</span>
								<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
									<div class="bg-teal-500 h-full" style="width:36%"></div>
								</div>
								<span class="text-teal-500 ml-3 font-medium">110 g / 273 g</span>
							</div>
							<div class="col-3 text-center"></div>
							<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
								<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Grasas</span>
								<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
									<div class="bg-teal-500 h-full" style="width:50%"></div>
								</div>
								<span class="text-teal-500 ml-3 font-medium">38g / 73 g</span>
							</div>

                        </div>
                        <div class="col-3 text-right">
                            <Button label="Añadir Comida" icon="pi pi-plus" class="p-button-success mr-2" />
                        </div>
                    </div>
                    <Toolbar>
                        <template v-slot:start>
                            <Button label="Favoritos" icon="pi pi-star" class="p-button-warning mr-2" v-on:click="favoritos()"/>
                            <Button label="Recientes"  class="mr-2" @click="recientes"/>
                            <Button label="Creados"  class="p-button-success mr-2" />
                        </template>
                        <template v-slot:end>
                            <SplitButton label="Alérgenos" :model="toolbarItems"></SplitButton>
                        </template>
                    </Toolbar>
                </div>

			<!-- Inicio del carrousel -->
			<div v-if=dataviewValueCarrusel>
				<div class="col-12 ">
					<div class="card">
						<h5>Comida Almuerzo</h5>
						<Carousel :value="dataviewValueCarrusel" :numVisible="4" :numScroll="3" :circular="false">
								<template #item="slotProps">
									<div class="col-12" style="text-align: center">
										<div class="carrousel-comidas">
											<div class="card">
												<div class="font-bold" style="margin: 4px">{{slotProps.data.product_name}}</div>
												<div style="margin: 4px">Kcal: {{slotProps.data.energy_kcal_100g}}g. Cantidad: 100g</div>
												<div><Button label="Quitar" style="margin: 4px" class="p-button-success" align="right"/></div>
											</div>
										</div>
									</div>
								</template>
						</Carousel>
					</div>
				</div>
			</div>
			<!-- Fin del carrousel -->
            </div>
    </div>

	<div class="grid">
		<div class="col-12">
			<div class="card">
				<DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
					<template #header>
						<div class="grid grid-nogutter">
							<div class="col-4 text-left">
								<Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Ordenar por" @change="onSortChange($event)"/>
							</div>
                            <div class="col-4 text-center">
                                <span class="p-input-icon-left mb-2">
                                    <i class="pi pi-search" />
                                    <InputText placeholder="Keyword Search" style="width: 100%" @keyup.enter="enterClicked()" id="BuscadorComidas"/>
                                </span>
                            </div>
							<div class="col-4 text-right">
								<DataViewLayoutOptions v-model="layout" />
							</div>
						</div>
					</template>
					<template #list="slotProps">
						<div class="col-12">
							<div class="flex flex-column md:flex-row align-items-center p-3 w-full">
								<img :src=slotProps.data.imagen :alt="slotProps.data.nombre" class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5 product-image" tyle="width: 100%; display: block;"  id="imagen-busqueda"/>
								<div class="flex-1 text-center md:text-left">
									<div class="font-bold text-2xl">{{slotProps.data.nombre}}</div>
									<div class="mb-3">Kcal {{slotProps.data.kcal_100g}} g</div>
                                    <div class="mb-3">Grasas {{slotProps.data.grasa_100g}} g</div>
									<div class="mb-3">Carbohidratos {{slotProps.data.carbohidratos_100g}} g</div>
									<div class="mb-3">Proteínas {{slotProps.data.proteinas_100g}} g</div>

								</div>
								<div class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
									<Button icon="pi pi-check" class="p-button-success p-button-icon-only p-button-rounded"></Button>
								</div>
							</div>
						</div>
					</template>

					<template #grid="slotProps">
						<div  @click="detallesAlimento(slotProps.data)" class="col-12 md:col-4">
							<div class="card m-3 border-1 surface-border">
                                <div class="text-align-center"> 
                                    <div class="grid grid-nogutter alimento-busqueda">
                                        <div class="col-4 text-left" >
                                            <img :src=slotProps.data.imagen :alt="slotProps.data.nombre" class="w-9 shadow-2 my-3 mx-0 " id="imagen-busqueda"/>
                                        </div>
                                        <div class="col-8 text-left">
                                            <div class="text-2xl font-bold">{{slotProps.data.nombre}}</div>
											<div class="mb-3"></div>
											<div class="mb-3">Kcal {{slotProps.data.kcal_100g}} g</div>
                                            <div class="mb-3">Grasas {{slotProps.data.grasa_100g}} g</div>
											<div class="mb-3">Carbohidratos {{slotProps.data.carbohidratos_100g}} g</div>
											<div class="mb-3">Proteínas {{slotProps.data.proteinas_100g}} g</div>
                                        </div>
                                    </div>
                                </div>
								<div class="flex align-items-center justify-content-between">
                                    <div></div>
									<Button icon="pi pi-check" class="p-button-success p-button-icon-only p-button-rounded"></Button>
								</div>
							</div>
						</div>
					</template>
				</DataView>
			</div>
		</div>
		<Dialog v-model:visible="alimentoDialog" header="Detalles del alimento" :modal="true" class="p-fluid" style="flex: 0 0 auto; width: 66.6667%;" @close="this.imagenesAlergenos=[]">
			<div class="contenedor-imagen-detalles">
				<img :src="alimento.imagen_peq" :alt="alimento.nombre" class="mt-0 mx-auto mb-5 block shadow-2 imagen-comida-detalles" />
				<h4 class="centered">{{alimento.nombre}}</h4>
			</div>
			<div class="container">
				<div class="grid justify-content-center mb-3">
					<div class="bg-gray-300 card field col-10">
						<p class="p-flex">
							Añadir 
							<InputNumber id="cantidad" v-model="cantidad" showButtons mode="decimal" :min="0" :maxFractionDigits="2" autofocus class="col-1"/>
							gramos de alimento al registro diario de hoy
							<Button class="p-button"  @click="anyadirConsumicion(alimento._id)">
								<span class="p-button-label">Añadir</span>
							</Button>
						</p>
					</div>
				</div>
				<div class="grid justify-content-around">
					<div class="container bg-gray-500 card col-6 justify-content-center">
						<div class="row justify-content-center text-center flex">
							<h4 class="tituloDetalles text-center">Valores nutricionales (100g)</h4>
						</div>
						<div class="grid row pl-5" style="font-size:large;">
							<div class="col-6">
									<p class="p-flex"> <b>Kcal:</b> {{alimento.kcal_100g}} Kcal</p>
							</div>
							<div class="col-6">
								<p class="p-flex"> <b>Proteinas:</b> {{alimento.proteinas_100g}} g</p>
							</div>
						</div>
						<div class="row pl-5" style="font-size:large;">
							<p class="p-flex"> <b>Carbohidratos:</b> {{alimento.carbohidratos_100g}} g de los cuales <b>azúcares: </b>{{alimento.azucares_100g}} g</p>
						</div>
						<div class="row pl-5" style="font-size:large;">
							<p class="p-flex"> <b>Grasas:</b> {{alimento.grasa_100g}} g de las cuales <b>saturadas: </b>{{alimento.grasas_std_100g}} g</p>
						</div>
						<div class="grid row pl-5" style="font-size:large;">
							<div class="col-6">
								<p class="p-flex"> <b>Sal:</b> {{alimento.sal_100g}} g</p>
							</div>
							<div class="col-6">
								<p class="p-flex"> <b>Sodio:</b> {{alimento.sodio_100g}} g</p>
							</div>
						</div>
						<div class="grid row pl-5" style="font-size:large;">
							<div class="col-6">
								<p class="p-flex"> <b>Fibra:</b> {{alimento.fibra_100g}} g</p>
							</div>
							<div class="col-6">
								<p class="p-flex"> <b>Colesterol:</b> {{alimento.colesterol_100g}} g</p>
							</div>
						</div>
						<div class="row pl-5" style="font-size:large;">
							<p class="p-flex"> <b>Potasio:</b> {{alimento.potasio_100g}} g</p>
						</div>
					</div>
					<div class="container bg-gray-500 card col-5">
						<div class="row justify-content-center text-center">
							<h4 class="tituloDetalles text-center">Alérgenos</h4>
						</div>
						<div class="grid justify-content-center align-content-center">
							<div class="col-3 align-content-around" v-for="(alergeno) of obtenerAlergenos(alimento.alergenos)" :key="alergeno">
								<img :src="'images/alergenos/'+alergeno+'.svg'" :alt="alergeno" class="imagen-alergeno" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	</div>
</div>
</template>

<script>
	import AlimentoService from "../service/AlimentoService";

export default {
		data() {
			return {
				dataviewValue: {},
				dataviewValueCarrusel: {},
				alimentoDialog: false,
				alimento: null,
				layout: 'grid',
				cantidad: null,
				sortKey: null,
				sortOrder: null,
				sortField: null,
				sortOptions: [
					{label: 'Mayor a menor número de Kcal', value: '!energy_kcal_100g'},
					{label: 'Menor a mayor número de kcal', value: 'energy_kcal_100g'},
					{label: 'Alfabéticamente', value: 'product_name'},
					{label: 'Alfabéticamente inverso', value: 'product_name'},
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
			}
		},
		alimentoService: null,
		created(){
			this.alimentoService = new AlimentoService();	
		},
		mounted() {
			this.fetchItems();
			this.carrousel();
		},
		methods: {
			enterClicked(){
				let keyword = document.getElementById('BuscadorComidas').value ? '' : document.getElementById('BuscadorComidas').value.toString();
				this.alimentoService.getBuscador(keyword).then(data => this.dataviewValue = data);
			},
			carrousel(){
				this.alimentoService.getCarrusel().then(data => this.dataviewValueCarrusel = data);
			},

			fetchItems()
			{
				this.alimentoService.getAlimentos().then(data => this.dataviewValue = data);
			},
			favoritos()
			{
				this.alimentoService.getFavoritos(this.$store.state.username).then(data => this.dataviewValue = data);
			},
			recientes()
			{
				this.alimentoService.getRecientes(this.$store.state.username).then(data => this.dataviewValue = data);
			},
			onSortChange(event){
				const value = event.value.value;
				const sortValue = event.value;
				if (value.indexOf('!') === 0) {
					this.sortOrder = -1;
					this.sortField = value.substring(1, value.length);
					this.sortKey = sortValue;
				}
				else {
					this.sortOrder = 1;
					this.sortField = value;
					this.sortKey = sortValue;
				}
			},
			detallesAlimento(alimento) {
				this.alimento = alimento;
				this.alimentoDialog = true;
			},
			anyadirConsumicion(alimentoId){
				console.log('alimentoId'+alimentoId);
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
		}
	}
</script>

<style scoped lang="scss">
@import '../assets/demo/badges.scss';
@import '../assets/styles/comidas.scss';
</style>