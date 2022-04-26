<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
    <div class="grid">
        <div class="col-12">
            <div class="tabla">
                <div class="card">
                    <h4 class="m-0" style="color:#256029; font-size:2.5rem; font-family: 'Oswald', sans-serif;">Administrar recetas</h4>
                    <br>
                    <Toast/>
                    <Toolbar class="mb-4">
                        <template v-slot:start>
                            <div class="my-2">
                                <Button label="Añadir" icon="pi pi-plus" class="p-button-success mr-2" @click="newRecipe" />
                            </div>
                        </template>
                    </Toolbar>

                    <DataTable :value="dataviewValue" dataKey="_id" :paginator="true" :rows="10" :filters="filters" currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} recetas">
                        <!--Buscador-->
                        <template #header>
                            <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                                
                                <span class="block mt-2 md:mt-0 p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                                </span>
                            </div>
                        </template>
                        
                        <Column field="receta" header="Receta" :style="{width:'100px'}" :sortable=true>
                            <template #body="slotProps">
                            <span class="p-column-title">Receta</span>
                            {{slotProps.data.nombre}}
                            </template>
                        </Column>
                        <Column field="raciones" header="Raciones" :style="{width:'100px'}" :sortable=true>
                            <template #body="slotProps">
                            <span class="p-column-title">Raciones</span>
                            {{slotProps.data.raciones}}
                            </template>
                        </Column>
                        <Column field="ingredientes" header="Ingredientes" :style="{width:'100px'}">
                            <template #body="slotProps">
                                <span class="p-column-title">Ingredientes</span>
                                <template v-for="ingredientesItem in slotProps.data.ingredientes">
                                    {{ingredientesItem.ingrediente}}: {{ingredientesItem.cantidad}}, 
                                </template>
                            </template>
                        </Column>
                        <Column field="pasos" header="Pasos" :style="{width:'100px'}">
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
                        <Column headerStyle="min-width:10rem;">
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
                    <template #footer>
                        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideRecipeDialog"/>
                        <Button label="Crear" icon="pi pi-check" class="p-button-text" @click="saveRecipe" v-if="this.editing==false"/>
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
export default {
    data() {
        return {
            filters: {},
            dataviewValue: null,
            submitted: false,
            recipe: {},
            recipeDialog: false,
            selectedRecipes: null,
            deleteRecipeDialog: false,
            editing: false,
        };
    },
    mounted() {
        this.fetchItems();
    },
    created() {
        this.initFilters();
    },
  methods: {
    fetchItems(){
          let uri = '/recetas';
          axios.get(uri).then((response) => {
            this.dataviewValue = response.data;
            console.log(this.dataviewValue);
          });
    },
    initFilters() {
        this.filters = {
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        }
    },
    newRecipe() {
        this.recipe = {};
        this.submitted = false;
        this.recipeDialog = true;
    },
    hideRecipeDialog() {
        this.submitted = false;
        this.recipeDialog = false;
        this.editing = false;
        this.recipe={};
    },
    saveRecipe() {
        this.submitted = true;
        console.log(this.recipe);
        //TODO
        let data = {};
        data["nombre"]=this.recipe["nombre"];
        data["raciones"]=this.recipe["raciones"];
        data["pasos"]=[];
        data["ingredientes"]=[];
        axios.post("/recetas", data);
        this.recipeDialog = false;
        this.recipe={};
        this.editing = false;
    },
    editRecipe(recipe){ //TODO: Add data arg
        this.recipeDialog = true;
        this.recipe = recipe;
        this.editing = true;
    },
    putRecipe() {
        this.editing = false;
        this.recipeDialog = false;
        //TODO
        let data = {};
        data["nombre"]=this.recipe["nombre"];
        data["raciones"]=this.recipe["raciones"];
        data["pasos"]=[];
        data["ingredientes"]=[];
        axios.post("/recetas/"+(this.recipe["_id"]), data);
        this.recipe={};
    },
    confirmDeleteRecipe(recipe) {
        this.recipe = {...recipe};
        this.deleteRecipeDialog=true;
    },
    deleteRecipe() {
        this.dataviewValue = this.dataviewValue.filter(val => val._id !== this.recipe._id);
        this.deleteRecipeDialog = false;
        console.log(this.dataviewValue); //TODO Delete in database and in dataviewvalue
        this.recipe = {};
        this.$toast.add({severity:'success', summary: 'Correcto', detail: 'Receta eliminada', life: 3000});
    },
    volver(){
        this.$router.push('/administrar')
    }
  },
};
</script>