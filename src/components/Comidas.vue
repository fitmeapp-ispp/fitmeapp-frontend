<template>
<div>
    <div class="grid">
            <div class="col-12">
                <div class="card">
                    <div class="grid grid-nogutter mb-3">
                        <div class="col-9 text-left">
                            <h1> {{ $store.state.tipo}} </h1>

                        </div>

							<div class="col-5 text-center">
							<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
								<span class="text-900 font-medium mr-2 mb-1 md:mb-0">KCalorías</span>
								<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
								<div class="bg-teal-500 h-full" style="width:3%"></div>
							</div>
							<span class="text-teal-500 ml-3 font-medium">{{dataviewValueComida[0]["kcal_100g"]}} Kcal / {{ kcal_recomendadas }} Kcal</span>
							</div>

							<div class="col-3 text-center"></div>

							<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
								<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Proteínas</span>
								<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
								<div class="bg-teal-500 h-full" style="width:7%"></div>
							</div>
							<span class="text-teal-500 ml-3 font-medium">{{dataviewValueComida[0].proteinas_100g}} g / {{ proteinas_recomendadas }} g</span>
							</div>
                        </div>

                        <div class="col-4 text-center">
							<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
								<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Carbohidratos</span>
								<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
									<div class="bg-teal-500 h-full" style="width:36%"></div>
								</div>
								<span class="text-teal-500 ml-3 font-medium"> {{dataviewValueComida[0].carbohidratos_100g}} g / {{ carbohidratos_recomendados }} g</span>
							</div>
							<div class="col-3 text-center"></div>
							<div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
								<span class="text-900 font-medium mr-2 mb-1 md:mb-0">Grasas</span>
								<div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height:8px">
									<div class="bg-teal-500 h-full" style="width:50%"></div>
								</div>
								<span class="text-teal-500 ml-3 font-medium"> {{dataviewValueComida[0].grasa_100g}} g / {{ grasas_recomendadas }} g</span>
							</div>

                        </div>
                        <div class="col-3 text-right">
							<router-link to="/alimentos_recetas">
                            <Button label="Añadir Comida" icon="pi pi-plus" class="p-button-success mr-2" />
							</router-link>
                        </div>
                    </div>
                    <Toolbar>
                        <template v-slot:start>
                            <Button label="Favoritos" icon="pi pi-star" class="p-button-warning mr-2" v-on:click="favoritos()"/>
                            <Button label="Recientes"  class="mr-2" v-on:click="recientes()"/>
                            <Button label="Creados"  class="p-button-success mr-2" v-on:click="creados()" />
                        </template>
                        <template v-slot:end>
                            <SplitButton label="Alérgenos" :model="toolbarItems"></SplitButton>
                        </template>
                    </Toolbar>
                </div>

			<!-- Inicio del carrousel -->
			<div v-show=carruselVacio>
				<div class="col-12 ">
					<div class="card">
						<h5>Comida {{ $store.state.tipo}}</h5>
						<Carousel :value="dataviewValueCarrusel" :numVisible="4" :numScroll="3" :circular="false">
								<template #item="slotProps">
									<div class="col-12" style="text-align: center">
										<div class="carrousel-comidas">
											<div class="card">
												<div class="font-bold" style="margin: 4px">{{slotProps.data.alimento.nombre}}</div>
												<div style="margin: 4px">Kcal: {{slotProps.data.alimento.kcal_100g}}g. Cantidad: {{slotProps.data.cantidad}}g</div>
												<div><Button label="Quitar" style="margin: 4px" class="p-button-success" align="right" v-on:click="eliminarDelCarrusel( slotProps.data.alimento._id )" /></div>
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
				<DataView :value="dataviewValue" :layout="layout" :paginator="true" :filters="filters1" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
					<template #header>
						<div class="grid grid-nogutter">
							<div class="col-4 text-left">
								<Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Ordenar por" @change="onSortChange($event)"/>
							</div>
                            <div class="col-4 text-center">
                                <span class="p-input-icon-left mb-2">
                                    <i class="pi pi-search" />
                                    <InputText  placeholder="Buscar" style="width: 100%" @keyup.enter="enterClicked()" id="BuscadorComidas"/>
                                </span>
                            </div>
							<div class="col-4 text-right">
								<DataViewLayoutOptions v-model="layout" />
							</div>
						</div>
					</template>
					<template #list="slotProps">
						<div class="col-12" >
							<div class="flex flex-column md:flex-row align-items-center p-3 w-full" >
								<img :src=slotProps.data.imagen :alt="slotProps.data.nombre" class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5 product-image" tyle="width: 100%; display: block;"  id="imagen-busqueda"/>
								<div class="flex-1 text-center md:text-left">
									<div class="font-bold text-2xl">{{slotProps.data.nombre}}</div>
									<div class="mb-3">Kcal {{slotProps.data.kcal_100g}} g</div>
                                    <div class="mb-3">Grasas {{slotProps.data.grasa_100g}} g</div>
									<div class="mb-3">Carbohidratos {{slotProps.data.carbohidratos_100g}} g</div>
									<div class="mb-3">Proteínas {{slotProps.data.proteinas_100g}} g</div>

								</div>
								<div class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0" v-if="slotProps.data.verificado">
									<Button icon="pi pi-check" class="p-button-success p-button-icon-only p-button-rounded"></Button>
								</div>
							</div>
						</div>
					</template>

					<template #grid="slotProps">
						<div class="col-12 md:col-4">
							<div class="card m-3 border-1 surface-border">
                                <div class="text-align-center"> 
                                    <div class="grid grid-nogutter alimento-busqueda">
                                        <div class="col-4 text-left" >
                                            <img :src="slotProps.data.imagen || 'https://i.imgur.com/Z8jQBw4.png'" :alt="slotProps.data.nombre" class="w-9 shadow-2 my-3 mx-0 " id="imagen-busqueda"/>
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
								<div class="flex align-items-center justify-content-between" v-if="slotProps.data.verificado">
                                    <div></div>
									<Button icon="pi pi-check" class="p-button-success p-button-icon-only p-button-rounded"></Button>
								</div>
							</div>
						</div>
					</template>
				</DataView>
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import AlimentoService from "../service/AlimentoService";
	export default {
		data() {
			return {
				picklistValue: [[
					{name: 'San Francisco', code: 'SF'},
					{name: 'London', code: 'LDN'},
					{name: 'Paris', code: 'PRS'},
					{name: 'Istanbul', code: 'IST'},
					{name: 'Berlin', code: 'BRL'},
					{name: 'Barcelona', code: 'BRC'},
					{name: 'Rome', code: 'RM'},
				],[]],
				orderlistValue: [
					{name: 'San Francisco', code: 'SF'},
					{name: 'London', code: 'LDN'},
					{name: 'Paris', code: 'PRS'},
					{name: 'Istanbul', code: 'IST'},
					{name: 'Berlin', code: 'BRL'},
					{name: 'Barcelona', code: 'BRC'},
					{name: 'Rome', code: 'RM'},
				],
				carruselVacio: false,
				dataviewValue: {},
				dataviewValueCarrusel: {},
				dataUserView: {},
				kcal_recomendadas: 0,
				carbohidratos_recomendados: 0,
				proteinas_recomendadas: 0,
				grasas_recomendadas: 0,
				dataviewValueComida: [{'kcal_100g':0}],
				layout: 'grid',
				sortKey: null,
				sortOrder: null,
				sortField: null,
				sortOptions: [
					{label: 'Mayor a menor número de Kcal', value: '!kcal_100g'},
					{label: 'Menor a mayor número de kcal', value: 'kcal_100g'},
					{label: 'Alfabéticamente', value: 'nombre'},
					{label: 'Alfabéticamente inverso', value: '!nombre'},
				]
			}
		},
		alimentoService: null,
		created() {
			
            this.alimentoService= new AlimentoService();
		},
		mounted() {
			this.fetchItems();
			this.carrousel();
			this.userKcal();
			this.comidaCarrusel();
		},
		methods: {
			enterClicked(){
			this.alimentoService.getBuscador(document.getElementById('BuscadorComidas').value).then(data => this.dataviewValue = data);
			},
			creados(){
				this.alimentoService.getCreados(this.$store.state.username).then(data =>{ this.dataviewValue = data
				console.log(data)});
			},
			alergenos(alergeno){
				this.alimentoService.getAlimentosNoAlergeno(alergeno).then(/*data =>{ this.dataviewValue = data}*/);
			},
			comidaCarrusel(){
				this.alimentoService.getComida(this.$store.state.tipo,this.$store.state.fecha,this.$store.state.username).then(data =>{ this.dataviewValueComida = data});
			},
			carrousel(){
				this.alimentoService.getCarrusel(this.$store.state.tipo,this.$store.state.fecha,this.$store.state.username).then(data =>{ this.dataviewValueCarrusel = data
				this.carruselVacio = data.length >0});
			},
			
			userKcal(){
				this.alimentoService.getUserKcak(this.$store.state.username).then(data =>{this.dataUserView = data
				this.kcal_recomendadas = (this.dataUserView[0].kcal_recomendadas/3).toFixed(2)
				this.carbohidratos_recomendados = (this.dataUserView[0].carbohidratos_recomendados/3).toFixed(2)
				this.proteinas_recomendadas = (this.dataUserView[0].proteinas_recomendadas/3).toFixed(2)
				this.grasas_recomendadas = (this.dataUserView[0].grasas_recomendadas/3).toFixed(2)

				} );
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
			eliminarDelCarrusel(alimentoId){
				this.alimentoService.deleteFromCarrusel(alimentoId,this.$store.state.tipo,this.$store.state.fecha,this.$store.state.username).then(this.$router.go());
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
			}
		}
	}
</script>

<style scoped lang="scss">
@import '../assets/demo/badges.scss';
@import '../assets/styles/comidas.scss';
</style>