<template>
    <div class="grid">
        <div class="col-12">
            <div class="tabla">
                <div class="card">
                    <h4 class="m-0" style="color:#256029; font-size:2.5rem; font-family: 'Oswald', sans-serif;">Administrar alimentos</h4>
                    <br>
                    <Toast/>
                    <Toolbar class="mb-4">
                        <template v-slot:start>
                            <div class="my-2">
                                <Button label="Añadir" icon="pi pi-plus" class="p-button-success mr-2" @click="newAlimento" />
                            </div>
                        </template>
                    </Toolbar>

                    <DataTable ref="dt" :value="dataviewValue" dataKey="_id" :paginator="true" :rows="9" :totalRecords="totalRecords" :lazy="true"
							paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
							currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} alimentos" responsiveLayout="scroll" @page="onPage($event)">
                        <template #header>
                            <div class="grid formgroup-inline justify-content-between ">
								<div class="field">
									<span class="p-input-icon-left mb-2">
										<i class="pi pi-search" />
										<InputText placeholder="Buscar" style="width: 100%" @keyup.enter="fetchItems()" id="BuscadorComidas"/>
									</span>
								</div>
							</div>
                        </template>
                    
                        <Column field="nombre" header="Alimento"  headerStyle="width:10%;">
                            <template #body="slotProps">
                            <span class="p-column-title">Alimento</span>
                                {{slotProps.data.nombre}}
                            </template>
                        </Column>
                        <Column field="kcal_100g" header="Kcal"  headerStyle="width:10%;">
                            <template #body="slotProps">
                            <span class="p-column-title">Kcal</span>
                                {{slotProps.data.kcal_100g}}
                            </template>
                        </Column>
                        <Column field="grasa_100g" header="Grasas"  headerStyle="width:10%;">
                            <template #body="slotProps">
                            <span class="p-column-title">Grasas</span>
                                {{slotProps.data.grasa_100g}}
                            </template>
                        </Column>
                        <Column field="carbohidratos_100g" header="Carbohidratos"  headerStyle="width:10%;">
                            <template #body="slotProps">
                            <span class="p-column-title">Carbohidratos</span>
                                {{slotProps.data.carbohidratos_100g}}
                            </template>
                        </Column>
                        <Column field="azucares_100g" header="Azúcares"  headerStyle="width:10%;">
                            <template #body="slotProps">
                            <span class="p-column-title">Azúcares</span>
                                {{slotProps.data.azucares_100g}}
                            </template>
                        </Column>
                        <Column field="proteinas_100g" header="Proteínas"  headerStyle="width:10%;">
                            <template #body="slotProps">
                            <span class="p-column-title">Proteínas</span>
                                {{slotProps.data.proteinas_100g}}
                            </template>
                        </Column>
                        <Column field="sal_100g" header="Sal"  headerStyle="width:10%;">
                            <template #body="slotProps">
                            <span class="p-column-title">Sal</span>
                                {{slotProps.data.sal_100g}}
                            </template>
                        </Column>
                        <Column field="fibra_100g" header="Fibra"  headerStyle="width:5%;">
                            <template #body="slotProps">
                            <span class="p-column-title">Fibra</span>
                                {{slotProps.data.fibra_100g}}
                            </template>
                        </Column>
                        <Column field="colesterol_100g" header="Colesterol"  headerStyle="width:5%;">
                            <template #body="slotProps">
                            <span class="p-column-title">Colesterol</span>
                                {{slotProps.data.colesterol_100g}}
                            </template>
                        </Column>
                        <!-- acciones -->
                        <Column headerStyle="min-width:10rem;">
                            <template #body="slotProps">
                                <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning mr-2" @click="editAlimento(slotProps.data)" />
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mt-2" @click="confirmDeleteAlimento(slotProps.data)" />
                            </template>
                        </Column>
                    </DataTable>
                </div>
                <!--Create-->
                <Dialog v-model:visible="alimentoDialog" :style="{width: '500px'}" header="Detalles del alimento" :modal="true" class="p-fluid" :dismissableMask="true" :draggable="false">					
                    <div class="field">
						<label for="nombre">Nombre*</label>
						<InputText id="nombre" v-model="alimento.nombre" required="true" autofocus :class="{'p-invalid': submitted && errorNombre}" />
						<small class="p-invalid" v-if="this.submitted && errorNombre">{{this.errorNombre}}</small>
                    </div>
                    <div class="field">
						<label for="marca">Marca*</label>
						<InputText id="marca" v-model="alimento.marca" required="true" autofocus :class="{'p-invalid': this.submitted && !alimento.marca}" />
                        <small class="p-invalid" v-if="this.submitted && errorMarca">{{this.errorMarca}}</small>
                    </div>
                    <div class="field">
						<label for="kcal">Energía* (Kcal)</label>
						<InputNumber id="kcal" mode="decimal" :min="0" v-model="alimento.kcal_100g" :maxFractionDigits="2" required="true" autofocus :class="{'p-invalid': this.submitted && !alimento.kcal_100g}"/>
						<small class="p-invalid" v-if="this.submitted && !alimento.kcal_100g">Debe indicar cuántas kcal tiene.</small>
                    </div>
                    <div class="field">
						<label for="proteinas">Proteinas* (g)</label>
						<InputNumber id="proteinas" mode="decimal" :min="0" v-model="alimento.proteinas_100g" :maxFractionDigits="2" required="true" autofocus :class="{'p-invalid': this.submitted && !alimento.proteinas_100g}"/>
						<small class="p-invalid" v-if="this.submitted && !alimento.proteinas_100g">Debe indicar si lleva proteinas.</small>
                    </div>
                    <div class="field">
						<label for="grasas">Grasas* (g)</label>
						<InputNumber id="grasas" mode="decimal" :min="0" v-model="alimento.grasa_100g" :maxFractionDigits="2" required="true" autofocus :class="{'p-invalid': this.submitted && !alimento.grasa_100g}"/>
						<small class="p-invalid" v-if="this.submitted && !alimento.grasa_100g">Debe indicar si lleva grasas.</small>
                    </div>
					<div class="field">
						<label for="grasasStd">Grasas saturadas* (g)</label>
						<InputNumber id="grasasStd" mode="decimal" :min="0" v-model="alimento['grasas-std_100g']" :maxFractionDigits="2" required="true" autofocus :class="{'p-invalid': this.submitted && !alimento['grasas-std_100g']}"/>
						<small class="p-invalid" v-if="this.submitted && !alimento['grasas-std_100g']">Debe indicar si lleva grasas saturadas.</small>
					</div>
                    <div class="field">
						<label for="carbs">Carbohidratos* (g)</label>
						<InputNumber id="carbs" mode="decimal" :min="0" v-model="alimento.carbohidratos_100g" :maxFractionDigits="2" required="true" autofocus :class="{'p-invalid': this.submitted && !alimento.carbohidratos_100g}"/>
						<small class="p-invalid" v-if="this.submitted && !alimento.carbohidratos_100g">Debe indicar si lleva carbohidratos.</small>
                    </div>
                    <div class="field">
						<label for="azu">Azúcares* (g)</label>
						<InputNumber id="azu" mode="decimal" :min="0" v-model="alimento.azucares_100g" :maxFractionDigits="2" required="true" autofocus :class="{'p-invalid': this.submitted && !alimento.azucares_100g}"/>
						<small class="p-invalid" v-if="this.submitted && !alimento.azucares_100g">Debe indicar si lleva azúcares.</small>
                    </div>
                    <div class="field">
						<label for="sodio">Sodio (g)</label>
						<InputNumber id="sodio" mode="decimal" :min="0" v-model="alimento.sodio_100g" :maxFractionDigits="2"/>
                    </div>
                    <div class="field">
						<label for="sal">Sal (g)</label>
						<InputNumber id="sal" mode="decimal" :min="0" v-model="alimento.sal_100g" :maxFractionDigits="2"/>
                    </div>
                    <div class="field">
						<label for="name2">Fibra (g)</label>
						<InputNumber id="name2" mode="decimal" :min="0" v-model="alimento.fibra_100g" :maxFractionDigits="2"/>
                    </div>
                    <div class="field">
						<label for="col">Colesterol (g)</label>
						<InputNumber id="col" mode="decimal" :min="0" v-model="alimento.colesterol_100g" :maxFractionDigits="2"/>
                    </div>
                    <div class="field">
						<label for="pot">Potasio (g)</label>
						<InputNumber id="pot" mode="decimal" :min="0" v-model="alimento.potasio_100g" :maxFractionDigits="2"/>
                    </div>
                    <!--Alergenos-->
                    <div class="field">
						<label for="alergenos">Alérgenos</label>
						<MultiSelect v-model="alergenosSel" :options="selector_alergenos" optionLabel="Alérgenos" placeholder="Seleccione los alérgenos" :filter="true">
							<template #value="slotProps">
								<div class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2" v-for="option of slotProps.value" :key="option.code">
									<span :class="'mr-2 flag flag-' + option.code.toLowerCase" style="width:18px; height: 12px"/>
									<div>{{option.name}}</div>
								</div>
								<template v-if="!slotProps.value || slotProps.value.length === 0">
									<div class="p-1">Seleccione los alérgenos</div>
								</template>
							</template>
							<template #option="slotProps">
								<div class="flex align-items-center">
									<span :class="'mr-2 flag flag-' + slotProps.option.code.toLowerCase()" style="width:18px; height: 12px"/>
									<div>{{slotProps.option.name}}</div>
								</div>
							</template>
						</MultiSelect>
                    </div>
                    <template #footer>
                        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideAlimentoDialog"/>
                        <Button label="Crear" icon="pi pi-check" class="p-button-text" @click="saveAlimento" v-if="this.editing==false"/>
                        <Button label="Editar" icon="pi pi-check" class="p-button-text" @click="putAlimento" v-if="this.editing==true"/>
                    </template>
                </Dialog>
                <!-- confirmacion para borrar -->
				<Dialog v-model:visible="deleteAlimentoDialog" :style="{width: '450px'}" header="Confirmación" :modal="true" :dismissableMask="true" :draggable="false">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="alimento">¿Quieres borrar el alimento <b>{{alimento.nombre}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteAlimentoDialog = false"/>
						<Button label="Sí" icon="pi pi-check" class="p-button-text" @click="deleteAlimento" />
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
import AlimentoService from "../../service/AlimentoService";
export default {
    data() {
        return {
            filters: {},
            dataviewValue: null,
            submitted: false,
            alimento: {},
            alimentoDialog: false,
            deleteAlimentoDialog: false,
            editing: false,
            alergenosSel: [],
			selector_alergenos: [
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
                'huevos': /(eggs|huevos)/,
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
            lazyParams: {},
        };
    },
    alimentoService: null,
    created() {
        this.alimentoService = new AlimentoService();
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
        fetchItems() {
            this.alimentoService.getAlimentos(this.lazyParams, document.getElementById('BuscadorComidas').value)
            .then(data => {
                this.totalRecords = data.total;
                this.dataviewValue = data.resultado; 
            });
        },
        onPage(event){
            this.lazyParams.pagina = event.page;
            this.fetchItems();	
        },
        newAlimento() {
            this.alimento = {};
            this.submitted = false;
            this.alimentoDialog = true;
        },
        hideAlimentoDialog() {
            this.submitted = false;
            this.alimentoDialog = false;
            this.editing = false;
            this.alimento = {};
            this.alergenosSel = [];
        },
        getAlergenosString() {
            let alergenos = [];
            if(this.alergenosSel.length > 0){
                for(let alergeno of this.alergenosSel){
                    alergenos.push(alergeno.code);
                }
                return alergenos.join(",");
            }
            return "";
        },
        saveAlimento() {
            this.submitted = true;
            let comprobado = this.comprobarCampos();
            console.log("Campos verificados: ", comprobado);
            
            if (comprobado) {
                let alergenosString = this.getAlergenosString();
                this.alimento["alergenos"] = alergenosString;
                this.alimento["verificado"] = true;
                this.alimento["codigo_barra"] = "";
                this.alimento["url"] = "";

                axios.post("/alimentos", this.alimento).then((res) => {
                    this.alimento = {};
                    this.dataviewValue.push(res.data);
                })
                .catch(error => {
                    console.log("Error: ", error)
                });

                this.alimentoDialog = false;
                this.alergenosSel = [];
                this.editing = false;
            }
        },
        comprobarCampos() {
            let regexLetras = /^[A-zÀ-ÿ ]+$/;
            let resultado = true;

            if(!this.alimento.nombre || !regexLetras.test(this.alimento.nombre)) {
                resultado = false;
                this.errorNombre = 'El nombre solo puede tener letras';
            } 
            
            if (!this.alimento.marca || !regexLetras.test(this.alimento.marca)) {
                resultado = false;
                this.errorMarca = 'La marca solo puede tener letras';
            }

            if (!this.alimento.kcal_100g || !this.alimento.proteinas_100g || !this.alimento.grasa_100g || !this.alimento['grasas-std_100g'] 
                || !this.alimento.carbohidratos_100g || !this.alimento.azucares_100g || !this.alimento.sal_100g){
                resultado = false;
            }

            return resultado;
        },
        editAlimento(alimento) {
            this.alimentoDialog = true;
            this.alimento = alimento;
            if(alimento.alergenos != undefined){
                for (let [alergeno, expresion] of Object.entries(this.dctAlergenos))
                {
                    if (expresion.test(alimento.alergenos.toLowerCase()))
                    {
                        let selector = this.selector_alergenos.find(a => {return a.code === alergeno})
                        if (selector){
                            console.log('selector: ', selector)
                            this.alergenosSel.push(selector);
                        }
                        
                    }
                }
            }
            this.editing = true;
        },
        putAlimento() {
            this.editing = false;
            this.alimentoDialog = false;
            let correcto = this.comprobarCampos();
            if (correcto) {
                let alergenosString = this.getAlergenosString();
                this.alimento["alergenos"]=alergenosString;
                this.alimento["verificado"]=true;
                this.alimento["codigo_barra"]="";
                this.alimento["url"]="";
                let data = {...this.alimento};
                let id = (this.alimento["_id"]).split("").join("");
                console.log(data);
                axios.put("/alimentos/"+id, data);
                this.alimento={};
                this.alergenosSel= [];
            }
        },
        confirmDeleteAlimento(alimento) {
            this.alimento = {...alimento};
            this.deleteAlimentoDialog=true;
        },
        deleteAlimento() {
            this.dataviewValue = this.dataviewValue.filter(val => val._id !== this.alimento._id);
            let id = this.alimento._id.split('').join(''); //Clone string
            axios.delete("/alimentos/"+id);
            this.deletealimentoDialog = false;
            this.alimento = {};
            this.alergenosSel= [];
            this.deleteAlimentoDialog=false;
            this.$toast.add({severity:'success', summary: 'Correcto', detail: 'Alimento eliminado', life: 3000});
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        volver(){
			this.$router.push('/administrar')
		}
    }
};
</script>