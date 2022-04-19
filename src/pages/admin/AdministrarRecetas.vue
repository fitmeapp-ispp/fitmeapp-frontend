<template>
    <div class="grid">
        <div class="col-12">
            <div class="tabla">
                <div class="card">
                    <h4 class="m-0">ADMINISTRAR RECETAS</h4>
                    <br>
                    <Toast/>
                    <Toolbar class="mb-4">
                        <template v-slot:start>
                            <div class="my-2">
                                <Button label="Añadir" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                            </div>
                        </template>
                    </Toolbar>

                    <DataTable ref="dt" :value="dataviewValue"  dataKey="_id" :paginator="true" :rows="10" :filters="filters"
							paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
							currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} recetas" responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							
							<span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                            </span>
						</div>
					</template>
                        
                        <Column field="nombre" header="Receta" :sortable=true headerStyle="width:15%; min-width:10rem;">
                            <template #body="slotProps">
                            <span class="p-column-title">Receta</span>
                            {{slotProps.data.nombre}}
                            </template>
                        </Column>
                        <Column field="raciones" header="Raciones" :sortable=true headerStyle="width:10%; min-width:10rem;">
                            <template #body="slotProps">
                            <span class="p-column-title">Raciones</span>
                            {{slotProps.data.raciones}}
                            </template>
                        </Column>
                        <Column field="ingredientes" header="Ingredientes" headerStyle="width:20%; min-width:10rem;">
                            <template #body="slotProps">
                                <span class="p-column-title">Ingredientes</span>
                                <template v-for="ingredientesItem in slotProps.data.ingredientes" v-bind:key="ingredientesItem">
                                    <li>{{ingredientesItem.ingrediente}}: {{ingredientesItem.cantidad}} </li>
                                </template>
                            </template>
                        </Column>
                        <Column field="pasos" header="Pasos" headerStyle="width:20%; min-width:10rem;">
                            <template #body="slotProps">
                            <span class="p-column-title">Pasos</span>
                                <ul>
                                    <template v-for="pasosItem in slotProps.data.pasos" v-bind:key="pasosItem">
                                        <li>{{pasosItem}}</li>
                                    </template>
                                </ul>
                            </template>
                        </Column>
                        <!-- acciones -->
                        <Column headerStyle="width:20%; min-width:10rem;">
                            <template #body="slotProps">
                                <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning mr-2" @click="editRecipe(slotProps.data)" />
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mt-2" @click="confirmDeleteRecipe(slotProps.data)" />
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <!--Create-->
                <Dialog v-model:visible="recipeDialog" :style="{width: '500px'}" header="Detalles de Receta" :modal="true" class="p-fluid">					
                    <div class="field">
                        <label for="nombre">Nombre</label>
                        <InputText id="nombre" v-model.trim="recipe.nombre" required="true" autofocus :class="{'p-invalid': submitted && !recipe.nombre}"/>
                    </div>
                    <div class="field">
                        <label for="raciones">Raciones</label>
                        <InputNumber id="raciones" v-model="recipe.raciones" required="true" :class="{'p-invalid': submitted && !recipe.nombre}"/>
                    </div>
				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
                        <div class="card text-center" style="background-color:#4CD07D; color:white; font-size:x-large">
                            Ingredientes
                        </div>
                        <div class="p-fluid formgrid grid" v-for="(ingrediente,indiceIngredientes) in ingredientes" :key="indiceIngredientes">
                            <div class="field col-12 md:col-7">
                                <InputText id="ingrediente" v-model="ingrediente.ingrediente" placeholder="Ingrediente" required="true" autofocus :class="{'p-invalid': this.submitted && !ingrediente.ingrediente}" />
                            </div>
                            <div class="field col-12 md:col-5">
                                <InputText id="cantidad" v-model="ingrediente.cantidad" placeholder="Cantidad" required="true" autofocus :class="{'p-invalid': this.submitted && !cantidad}" />
                            </div>
                            <div class="field col-12 md:col-10 md:col-offset-1">
                                <Button class="p-button-success"  @click="anyadirIngrediente(indiceIngredientes)" v-show="indiceIngredientes == ingredientes.length-1">
                                    <span class="p-button-label">Añadir</span>
                                </Button>
                            </div>
                        </div>
                        
					</div>
					<div class="field col-12 md:col-6">
                        <div class="card text-center" style="background-color:#4CD07D; color:white; font-size:x-large">
                            Pasos
                        </div>

                        <div class="formgrid grid justify-content-center" v-for="(paso,indicePasos) in pasos" :key="indicePasos">
                            <div class="field col-12">
                                <InputText id="pasos" v-model="paso.paso" placeholder="Añada un paso" required="true" autofocus :class="{'p-invalid': this.submitted && !paso.paso}" />
                            </div>
                            <div class="field col-12 md:col-10 md:col-offset-1">
                                <Button class="p-button-success" @click="anyadirPaso(indicePasos)" v-show="indicePasos == pasos.length-1">
                                    <span class="p-button-label">Añadir</span>
                                </Button>
                            </div>
                        </div>
					</div>
				</div>
                    <template #footer>
                        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideRecipeDialog"/>
                        <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveReceta" v-if="this.editing==false"/>
                        <Button label="Editar" icon="pi pi-check" class="p-button-text" @click="putRecipe" v-if="this.editing==true"/>
                    </template>
                </Dialog>
                <!-- confirmacion para borrar -->
				<Dialog v-model:visible="deleteRecipeDialog" :style="{width: '450px'}" header="Confirmación" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="recipe">¿Quieres borrar la receta <b>{{recipe.nombre}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteRecipeDialog = false"/>
						<Button label="Sí" icon="pi pi-check" class="p-button-text" @click="deleteRecipe" />
					</template>
				</Dialog>
            </div>
        </div>
        <div class="col-12">
            <Button label="Volver" class="p-button-success col-12" @click="volver" />
        </div>  
    </div>
</template>

<script>
import axios from "axios"
import {FilterMatchMode} from 'primevue/api';
import RecetaService from '../../service/RecetaService';
export default {
    data() {
        return {
            filters: {},
            dataviewValue: null,
            submitted: false,
            recipe: {},
            ingredientes: [{
                ingrediente: '',
                cantidad: ''
            }],
            pasos: [{
                paso: ''
            }],
            recipeDialog: false,
            selectedRecipes: null,
            deleteRecipeDialog: false,
            editing: false,
        };
    },
    created() {
        this.recetaService = new RecetaService();
        this.initFilters();
    },
    mounted() {
        this.fetchItems();
        this.recetaService.getRecetas().then(data => this.recipe = data);
    },
    
    methods: {
    fetchItems(){
			axios.get("/recetas", {
				params: {
					recetaId: this.$store.state.recetaId
				}
			})
			.then((response) => {
				this.dataviewValue = response.data;
			});
    },

    openNew() {
        this.recipe = {};
        this.submitted = false;
        this.recipeDialog = true;
	},

    hideDialog() {
			this.recipeDialog = false;
			this.submitted = false;
	},

    saveReceta() {
        this.submitted = true;
        if (this.recipe.nombre) {
        //Put
        if (this.recipe._id) {
            this.deleteRecipeDialog = false;
            let data = {...this.recipe}
            let id = this.recipe._id.split("").join("");
            axios.put("/recetas/" + id, data);
            this.$toast.add({severity:'success', summary: 'Correcto', detail: 'Receta Actualizada', life: 3000});
        }
        //Create
        else {
            axios.post('/recetas', this.recipe);
            this.dataviewValue.push(this.recipe)
            this.$toast.add({severity:'success', summary: 'Correcto', detail: 'Receta Creada', life: 3000});
        }
        this.recipeDialog = false;
        this.recipe = {};
        }
    },

	
        
    initFilters() {
        this.filters = {
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        }
    },
    newRecipe() {
        this.recipe = {};
        this.ingredientes= [{ingrediente: '',cantidad: ''}];
        this.pasos= [{paso: ''}];
        this.submitted = false;
        this.recipeDialog = true;
    },
    hideRecipeDialog() {
        this.submitted = false;
        this.recipeDialog = false;
        this.editing = false;
        this.recipe={};
        this.ingredientes= [{ingrediente: '',cantidad: ''}];
        this.pasos= [{paso: ''}];
    },

    /*
    saveRecipe() {
        this.submitted = true;
        console.log(this.recipe);
        let data = {};
        data["nombre"]=this.recipe["nombre"];
        data["raciones"]=this.recipe["raciones"];
        data["pasos"]=this.pasos;
        data["ingredientes"]=this.ingredientes;
        axios.post("/recetas", data);
        this.recipeDialog = false;
        this.recipe={};
        this.ingredientes= [{ingrediente: '',cantidad: ''}];
        this.pasos= [{paso: ''}];
        this.editing = false;
    },
    */

    editRecipe(recipe) {
		this.recipe = recipe;
		this.recipeDialog = true;
	},
    /*
    editRecipe(recipe){ 
        this.recipeDialog = true;
        this.recipe = recipe;
        this.editing = true;
        this.ingredientes = [];
        this.recipe.ingredientes.forEach(element => 
            this.ingredientes.push({ingrediente:element.ingrediente,cantidad:element.cantidad})
        );
        this.pasos = [];
        this.recipe.pasos.forEach(element => 
            this.pasos.push({paso:element})
        );
    },
    */
    putRecipe() {
        this.editing = false;
        this.recipeDialog = false;
        //TODO
        let data = {};
        data["nombre"]=this.recipe["nombre"];
        data["raciones"]=this.recipe["raciones"];
        data["pasos"]=[];
        this.recipe.pasos.forEach(element => 
            data["pasos"].push({paso:element})
        );
        data["ingredientes"]=this.ingredientes;
        axios.post("/recetas/"+(this.recipe["_id"]), data);
        this.recipe={};
        this.ingredientes= [{ingrediente: '',cantidad: ''}];
        this.pasos= [{paso: ''}];
    },
    confirmDeleteRecipe(recipe) {
        this.recipe = {...recipe};
        this.deleteRecipeDialog=true;
    },
    deleteRecipe() {
        this.deleteRecipeDialog = false;
			let id = this.recipe._id.split("").join("");
			axios.delete('/recetas/' + id);
			this.dataviewValue = this.dataviewValue.filter(val => val._id !== this.recipe._id);
			this.$toast.add({severity:'success', summary: 'Correcto', detail: 'Receta eliminada', life: 3000});
    },
    anyadirIngrediente(){
        this.ingredientes.push({ 
            ingrediente: '',
            cantidad:''
        });
    },
    anyadirPaso(){
        this.pasos.push({ 
            paso: ''
        });
    },
    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.dataviewValue.length; i++) {
            if (this.dataviewValue[i]._id === id) {
                index = i;
                break;
            }
        }
        return index;
    },
    exportCSV() {
		this.$refs.dt.exportCSV();
	},
    volver(){
        this.$router.push('/administrar')
    }
  },
};
</script>