<template>
	<div class="grid">
		<div class="col-12">

			<div class="card">
				<h4 class="m-0">ADMINISTRAR EJERCICIOS</h4>
				<br>
				<Toast/>
				
				<Toolbar class="mb-4">
					<template v-slot:start>
						<div class="my-2">
							<Button label="Añadir" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
							<Button label="Eliminar" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedExercises || !selectedExercises.length" />
						</div>
					</template>
					
				</Toolbar>

				<DataTable ref="dt" :value="exercises" v-model:selection="selectedExercises" dataKey="_id" :paginator="true" :rows="10" :filters="filters"
							paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
							currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} ejercicios" responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							
							<span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                            </span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    
					<Column field="name" header="Nombre" :sortable="true" headerStyle="width:20%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Nombre</span>
							{{slotProps.data.name}}
						</template>
					</Column>
                    
                    <!-- arreglar imagen
					<Column header="Imagen" headerStyle="width:20%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Imagen</span>
							<img :src="'images/exercise/' + slotProps.data.image" :alt="slotProps.data.image" class="shadow-2" width="100" />
						</template>
					</Column>
                    -->
				
					<Column field="muscle" header="Zona muscular" :sortable="true" headerStyle="width:20%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Zona Muscular</span>
							{{muscleList[slotProps.data.muscles[0]]}}
                            <br>{{muscleList[slotProps.data.muscles[1]]}}
                            <br>{{muscleList[slotProps.data.muscles[2]]}}
						</template>
					</Column>

                    <Column field="equipment" header="Material" :sortable="true" headerStyle="width:20%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Material</span>
							{{equipmentList[slotProps.data.equipment[0]]}}
						</template>
					</Column>
                    
					

                    <!-- acciones -->
					<Column headerStyle="min-width:10rem;">
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-warning mr-2" @click="editExercise(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-danger mt-2" @click="confirmDeleteExercise(slotProps.data)" />
						</template>
					</Column>
				</DataTable>


                <!-- crear nuevo -->
				<Dialog v-model:visible="exerciseDialog" :style="{width: '500px'}" header="Detalles de Ejercicio" :modal="true" class="p-fluid">
					<img :src="'images/exercise/' + exercise.image" :alt="exercise.image" v-if="exercise.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" />
					
                    <div class="field">
						<label for="name">Nombre</label>
						<InputText id="name" v-model.trim="exercise.name" required="true" autofocus :class="{'p-invalid': submitted && !exercise.name}" />
						<small class="p-invalid" v-if="submitted && !exercise.name">El nombre no puede estar vacío</small>
					</div>

					<div class="field">
						<label for="description">Descripción</label>
						<Textarea id="description" v-model="exercise.description" required="true" rows="5" cols="20" />
					</div>

                    <div class="field">
                        <label for="muscles" class="mb-3">Zona muscular</label>
                        <MultiSelect id="muscles" v-model="exercise.muscles" :options="muscleList" placeholder="Escoja músculos">
                            <template #value="slotProps">
                                <template v-if="!slotProps.value || slotProps.value.length === 0">
                                    <div class="p-1">Selecciona músculos</div>
                                </template>
                            </template>
                            
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <div>{{slotProps.option}}</div>
                                </div>
                            </template>
                        </MultiSelect>
                    </div>


					<div class="field" >
						<label class="mb-3">Material</label>
						<div class="formgrid grid">
							<div class="field-radiobutton col-6">
								<RadioButton id="equipment1" name="equipment" value=1 v-model="Barbell" />
                                <label for="equipment1">Barbell</label>
							</div>
							<div class="field-radiobutton col-6">
								<RadioButton id="equipment2" name="equipment" value=2 v-model="SZ_Bar" />
								<label for="equipment2">SZ-Bar</label>
							</div>
							<div class="field-radiobutton col-6">
								<RadioButton id="equipment3" name="equipment" value=3 v-model="Dumbbell" />
								<label for="equipment3">Dumbbell</label>
							</div>
							<div class="field-radiobutton col-6">
								<RadioButton id="equipment4" name="equipment" value=4 v-model="Gym_mat" />
								<label for="equipment4">Gym mat</label>
							</div>
                            <div class="field-radiobutton col-6">
								<RadioButton id="equipment5" name="equipment" value=5 v-model="Swiss_Ball" />
								<label for="equipment5">Swiss Ball</label>
							</div>
                            <div class="field-radiobutton col-6">
								<RadioButton id="equipment6" name="equipment" value=6 v-model="Pull_up_bar" />
								<label for="equipment6">Pull-up bar</label>
							</div>
                            <div class="field-radiobutton col-6">
								<RadioButton id="equipment7" name="equipment" value=7 v-model="bodyweight_exercise" />
								<label for="equipment7">none (bodyweight exercise)</label>
							</div>
                            <div class="field-radiobutton col-6">
								<RadioButton id="equipment8" name="equipment" value=8 v-model="Bench" />
								<label for="equipment8">Bench</label>
							</div>
                            <div class="field-radiobutton col-6">
								<RadioButton id="equipment9" name="equipment" value=9 v-model="Incline_bench" />
								<label for="equipment9">Incline bench</label>
							</div>
                            <div class="field-radiobutton col-6">
								<RadioButton id="equipment10" name="equipment" value=10 v-model="Kettlebell" />
								<label for="equipment10">Kettlebell</label>
							</div>
						</div>
					</div>

					
					<template #footer>
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveExercise" />
					</template>
				</Dialog>


                <!-- confirmacion para borrar -->
				<Dialog v-model:visible="deleteExerciseDialog" :style="{width: '450px'}" header="Confirmación" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="exercise">¿Quieres borrar el ejercicio <b>{{exercise.name}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteExerciseDialog = false"/>
						<Button label="Sí" icon="pi pi-check" class="p-button-text" @click="deleteExercise" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteExercisesDialog" :style="{width: '450px'}" header="Confirmación" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="exercise">¿Quieres eliminar los ejercicios seleccionados?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteExercisesDialog = false"/>
						<Button label="Sí" icon="pi pi-check" class="p-button-text" @click="deleteSelectedExercises" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
import axios from "axios"
import {FilterMatchMode} from 'primevue/api';
import ExerciseService from '../../service/ExerciseService';
export default {
	data() {
		return {
			Barbell: null,
			SZ_Bar: null,
			Dumbbell: null,
			Gym_mat: null,
			Swiss_Ball: null,
			Pull_up_bar: null,
			bodyweight_exercise: null,
			Bench: null,
			Incline_bench: null,
			Kettlebell: null,
			exercises: null,
			exerciseDialog: false,
			deleteExerciseDialog: false,
			deleteExercisesDialog: false,
			exercise: {},
			selectedExercises: null,
			filters: {},
			submitted: false,
            muscleList: [
                "",
                "Biceps brachii",
                "Anterior deltoid",
                "Serratus anterior",
                "Pectoralis major",
                "Triceps brachii",
                "Rectus abdominis",
                "Gastrocnemius",
                "Gluteus maximus",
                "Trapezius",
                "Quadriceps femoris",
                "Biceps femoris",
                "Latissimus dorsi",
                "Brachialis",
                "Obliquus externus abdominis",
                "Soleus"
            ],

            equipmentList: [
                "",
                "Barbell",
                "SZ-Bar",
                "Dumbbell",
                "Gym mat",
                "Swiss Ball",
                "Pull-up bar",
                "none (bodyweight exercise)",
                "Bench",
                "Incline bench",
                "Kettlebell"
            ],
		
		}
	},
	exerciseService: null,
	created() {
		this.exerciseService = new ExerciseService();
		this.initFilters();
	},
	mounted() {
		this.exerciseService.getExercises().then(data => this.exercise = data);
        this.fetchItems();
	},
	methods: {

        fetchItems(){
          let uri = '/exercise';
          axios.get(uri).then((response) => {
          this.exercises = response.data;
          console.log(this.exercises);
          });
        },

		openNew() {
			this.exercise = {};
			this.submitted = false;
			this.exerciseDialog = true;
		},
		hideDialog() {
			this.exerciseDialog = false;
			this.submitted = false;
		},
		saveExercise() {
			this.submitted = true;
			if (this.exercise.name) {
			
			//Establecer equipamiento
			var equipment = [];
			if(this.Barbell){
				equipment.push(this.Barbell);
			}
			if(this.SZ_Bar){
				equipment.push(this.SZ_Bar);
			}
			if(this.Dumbbell){
				equipment.push(this.Dumbbell);
			}
			if(this.Gym_mat){
				equipment.push(this.Gym_mat);
			}
			if(this.Swiss_Ball){
				equipment.push(this.Swiss_Ball);
			}
			if(this.Pull_up_bar){
				equipment.push(this.Pull_up_bar);
			}
			if(this.bodyweight_exercise){
				equipment.push(this.bodyweight_exercise);
			}
			if(this.Bench){
				equipment.push(this.Bench);
			}
			if(this.Incline_bench){
				equipment.push(this.Incline_bench);
			}
			if(this.Kettlebell){
				equipment.push(this.Kettlebell);
			}
			if(equipment.length<1){
				equipment.push('none (bodyweight exercise)');
			}
			this.exercise.equipment = equipment;

			//Actualizar
			if (this.exercise._id) {
				
				this.exercise["_id"] = (this.exercise["_id"]).split("").join("");
				this.exerciseService.actualizarEjercicio(this.exercise);
				this.$toast.add({severity:'success', summary: 'Correcto', detail: 'Ejercicio Actualizado', life: 3000});
				}

				//Crear
				else {
					this.exercise.images = [];
					this.exercise_base = 0;
					this.exercise.status = "";
					this.exercise.creation_date = "";
					this.exercise.language = 0;
					this.exercise.license = 0;
					this.exercise.license_author = "";
					this.exercise.variations = [];
					this.exercise.status = "";
					console.log(this.exercise);
					this.exerciseService.guardarEjercicio(this.exercise);
					this.$toast.add({severity:'success', summary: 'Correcto', detail: 'Ejercicio Creado', life: 3000});
				}
				this.exerciseDialog = false;
				this.exercise = {};
			}
		},

		editExercise(exercise) {
			this.exercise = {...exercise};
			this.exerciseDialog = true;
		},
		confirmDeleteExercise(exercise) {
			this.exercise = exercise;
			this.deleteExerciseDialog = true;
		},
		deleteExercise() {
			let id = this.exercise._id.split('').join(''); //Clone string
			this.exercises = this.exercises.filter(val => val._id !== this.exercise._id);
			axios.delete("/exercise/"+id);
			this.deleteExerciseDialog = false;
			this.exercise = {};
			this.$toast.add({severity:'success', summary: 'Correcto', detail: 'Ejercicio eliminado', life: 3000});
		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.exercises.length; i++) {
				if (this.exercises[i]._id === id) {
					index = i;
					break;
				}
			}
			return index;
		},
		exportCSV() {
			this.$refs.dt.exportCSV();
		},
		confirmDeleteSelected() {
			this.deleteExercisesDialog = true;
		},
		deleteSelectedExercises() {
			this.exercises = this.exercises.filter(val => !this.selectedExercises.includes(val));
			this.deleteExercisesDialog = false;
			this.selectedExercises = null;
			this.$toast.add({severity:'success', summary: 'Correcto', detail: 'Ejercicios eliminados', life: 3000});
		},
		initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        }
	}
}
</script>


