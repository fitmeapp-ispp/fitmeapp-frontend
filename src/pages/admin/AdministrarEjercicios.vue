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
                    
					<Column field="name" header="Nombre" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Nombre</span>
							{{slotProps.data.name}}
						</template>
					</Column>
                    
					<Column header="Imagen" headerStyle="width:20%; min-width:10rem;">
						<template #body="slotProps">
							<!-- <img :src="'images/exercise/' + slotProps.data.image" :alt="slotProps.data.image" class="shadow-2" width="100" /> -->
						
						<Galleria :value="slotProps.data.images" :numVisible="1" :circular="true" :autoPlay="true" :transitionInterval="750" containerStyle="max-width: 400px; margin: auto">
							<template #item="slotProps2">
								<img :src="slotProps2.item" style="display: block;" class="imagenEjercicio"/>
							</template>
						</Galleria>

						<img :src="sinImagen" v-if="slotProps.data.images.length === 0" style="display:block;background-color:#E0E0E0;border-radius:20px;border-style:solid;" 
							class="imagenEjercicio" containerStyle="max-width: 800px; margin: auto"/>
						
						</template>
					</Column>
				
					<Column field="category" header="Zona muscular" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span>{{gruposMusculares[slotProps.data.category - 8]}}</span>
						</template>
					</Column>

					<Column field="muscle" header="Músculos principales" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span v-for="muscleId, index of slotProps.data.muscles" :key="muscleId">
								{{muscleList[muscleId - 1].name}}
								<span v-if="index < slotProps.data.muscles.length - 1">; </span>
							</span>
						</template>
					</Column>

					<Column field="muscle" header="Músculos secundarios" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span v-for="muscleId, index of slotProps.data.muscles_secondary" :key="muscleId">
								{{muscleList[muscleId - 1].name}}
								<span v-if="index < slotProps.data.muscles_secondary.length - 1">; </span>
							</span>
						</template>
					</Column>

                    <Column field="equipment" header="Material" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span v-for="equipmentId, index of slotProps.data.equipment" :key="equipmentId">
								{{equipmentList[equipmentId - 1].name}}
								<span v-if="index < slotProps.data.equipment.length - 1">; </span>
							</span>
						</template>
					</Column>

					<Column header="Acciones" headerStyle="width:14%; min-width:10rem;">
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
                        <label for="muscles" class="mb-3">Músculo principal</label>
                        <MultiSelect id="muscles" v-model="exercise.muscles" :options="muscleList" optionLabel="name" optionValue="id" placeholder="Escoja músculos">
                            <template #value="slotProps">
								<span v-for="muscleId, index of slotProps.value" :key="muscleId">
									{{muscleList[muscleId - 1].name}}
									<span v-if="index < slotProps.value.length - 1">; </span>
								</span>

                                <template v-if="!slotProps.value || slotProps.value.length === 0">
                                    <div class="p-1">Selecciona músculos</div>
                                </template>
                            </template>
                            
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <div>{{slotProps.option.name}}</div>
                                </div>
                            </template>
                        </MultiSelect>
                    </div>

					<div class="field">
                        <label for="muscles_secondary" class="mb-3">Músculo secundario</label>
                        <MultiSelect id="muscles_secondary" v-model="exercise.muscles_secondary" :options="muscleList" optionLabel="name" optionValue="id" placeholder="Escoja músculos">
                            <template #value="slotProps">

								<span v-for="muscleId, index of slotProps.value" :key="muscleId">
									{{muscleList[muscleId - 1].name}}
									<span v-if="index < slotProps.value.length - 1">; </span>
								</span>

                                <template v-if="!slotProps.value || slotProps.value.length === 0">
                                    <div class="p-1">Selecciona músculos</div>
                                </template>
                            </template>
                            
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <div>{{slotProps.option.name}}</div>
                                </div>
                            </template>
                        </MultiSelect>
                    </div>

					<div class="field">

                        <label for="equipment" class="mb-3">Materiales</label>
                        <MultiSelect id="equipment" v-model="exercise.equipment" :options="equipmentList" optionLabel="name" optionValue="id" placeholder="Escoja materiales">
                            <template #value="slotProps">
								<span v-for="equipmentId, index of slotProps.value" :key="equipmentId">
									<span>{{equipmentList[equipmentId - 1].name}}</span>
									<span v-if="index < slotProps.value.length - 1">; </span>
								</span>

                                <template v-if="!slotProps.value || slotProps.value.length === 0">
                                    <div class="p-1">Selecciona materiales</div>
                                </template>
                            </template>
                            
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <div>{{slotProps.option.name}}</div>
                                </div>
                            </template>
                        </MultiSelect>
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
		<div class="col-12">
            <Button label="Volver" class="p-button-success col-12" @click="volver" />
        </div>  
	</div>

</template>

<script>
import axios from "axios"
import {FilterMatchMode} from 'primevue/api';
import ExerciseService from '../../service/ExerciseService';
import sinImagen from '../../../public/images/sin_imagen_ejercicio.png';

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
			sinImagen: sinImagen,
            muscleList: [
                {name: "Biceps brachii", id: 1},
                {name: "Anterior deltoid", id: 2},
                {name: "Serratus anterior", id: 3},
                {name: "Pectoralis major", id: 4},
                {name: "Triceps brachii", id: 5},
                {name: "Rectus abdominis", id: 6},
                {name: "Gastrocnemius", id: 7},
                {name: "Gluteus maximus", id: 8},
                {name: "Trapezius", id: 9},
                {name: "Quadriceps femoris", id: 10},
                {name: "Biceps femoris", id: 11},
                {name: "Latissimus dorsi", id: 12},
                {name: "Brachialis", id: 13},
                {name: "Obliquus externus abdominis", id: 14},
                {name: "Soleus", id: 15},
            ],
			gruposMusculares: [
				"Arms",
				"Legs",
				"Abs",
				"Chest",
				"Back",
				"Shoulders",
				"Calves",
				"All"
			],
            equipmentList: [
                {name: "Barbell", id: 1},
                {name: "SZ-Bar", id: 2},
                {name: "Dumbbell", id: 3},
                {name: "Gym mat", id: 4},
                {name: "Swiss Ball", id: 5},
                {name: "Pull-up bar", id: 6},
                {name: "none (bodyweight exercise)", id: 7},
                {name: "Bench", id: 8},
                {name: "Incline bench", id: 9},
                {name: "Kettlebell",  id: 10}
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
			axios.get("/ejercicios").then((response) => {
				this.exercises = response.data;
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

				// Para el sprint 3
				// this.exercise.category = gruposMusculares.indexOf(this.exercise.category) + 8

				if (this.exercise._id) {
					//Actualizar
					this.exerciseService.actualizarEjercicio(this.exercise)
					.then((res) => {
						this.exercises[this.exercise._id] = res.data
						this.$toast.add({severity:'success', summary: 'Correcto', detail: 'Ejercicio Actualizado', life: 3000});
						this.exercise = {};
					})
					.catch(error => {
						console.log("Error: ", error)
					});
				} else {
					//Crear
					this.exercise.images = [];
					this.exercise_base = 0;
					this.exercise.status = "";
					this.exercise.creation_date = "";
					this.exercise.language = 0;
					this.exercise.license = 0;
					this.exercise.license_author = "";
					this.exercise.variations = [];
					this.exercise.status = "";

					this.exerciseService.guardarEjercicio(this.exercise).then((res) => {
						this.exercises.push(res.data)
						this.$toast.add({severity:'success', summary: 'Correcto', detail: 'Ejercicio Creado', life: 3000});
						this.exercise = {};
					});
				}

				this.exerciseDialog = false;
			}
		},

		editExercise(exercise) {
			this.exercise = exercise;
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
        },
		volver(){
			this.$router.push('/administrar')
		}
	}
}
</script>


