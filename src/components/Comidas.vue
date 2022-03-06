<template>
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
                            <Button label="Favoritos" icon="pi pi-star" class="p-button-warning mr-2" />
                            <Button label="Recientes"  class="mr-2" />
                            <Button label="Creados"  class="p-button-success mr-2" />
                        </template>
                        <template v-slot:end>
                            <SplitButton label="Alérgenos" :model="toolbarItems"></SplitButton>
                        </template>
                    </Toolbar>
                </div>
            </div>
    </div>

	<div class="grid">
		<div class="col-12">
			<div class="card">
				<DataView :value="dataviewValue" :layout="layout" :paginator="true" :filters="filters1" v-model:filters="filters1" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
					<template #header>
						<div class="grid grid-nogutter">
							<div class="col-4 text-left">
								<Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)"/>
							</div>
                            <div class="col-4 text-center">
                                <span class="p-input-icon-left mb-2">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filters1['global'].value" placeholder="Keyword Search" style="width: 100%"/>
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
								<img :src="'images/product/' + slotProps.data.image" :alt="slotProps.data.name" class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" />
								<div class="flex-1 text-center md:text-left">
									<div class="font-bold text-2xl">{{slotProps.data.name}}</div>
									<div class="mb-3">{{slotProps.data.description}}</div>

								</div>
								<div class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
									<Button icon="pi pi-check" class="p-button-success p-button-icon-only p-button-rounded"></Button>
								</div>
							</div>
						</div>
					</template>

					<template #grid="slotProps">
						<div class="col-12 md:col-4">
							<div class="card m-3 border-1 surface-border">
                                <div class="text-align-center"> 
                                    <div class="grid grid-nogutter">
                                        <div class="col-4 text-left">
                                            <img :src="'images/product/' + slotProps.data.image" :alt="slotProps.data.name" class="w-9 shadow-2 my-3 mx-0"/>
                                        </div>
                                        <div class="col-8 text-left">
                                            <div class="text-2xl font-bold">{{slotProps.data.name}}</div>
                                            <div class="mb-3">{{slotProps.data.description}}</div>
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
	</div>
</template>

<script>
	import ProductService from "../service/ProductService";
    import {FilterMatchMode,FilterOperator} from 'primevue/api';
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
				dataviewValue: null,
				layout: 'grid',
				sortKey: null,
				sortOrder: null,
				sortField: null,
				sortOptions: [
					{label: 'Price High to Low', value: '!price'},
					{label: 'Price Low to High', value: 'price'},
				]
			}
		},
		productService: null,
		created() {
			this.productService = new ProductService();
            this.initFilters1();
		},
		mounted() {
			this.productService.getProducts().then(data => this.dataviewValue = data);
		},
		methods: {
            initFilters1() {
				this.filters1 = {
					'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
					'name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
					'country.name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
					'representative': {value: null, matchMode: FilterMatchMode.IN},
					'date': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}]},
					'balance': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
					'status': {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
					'activity': {value: null, matchMode: FilterMatchMode.BETWEEN},
					'verified': {value: null, matchMode: FilterMatchMode.EQUALS}
				}
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
</style>