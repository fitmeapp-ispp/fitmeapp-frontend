<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
	<div class="grid">
		<div class="col-12">

			<div class="card">
				<h4 style="color:#256029; font-size:2.5rem; font-family: 'Oswald', sans-serif;">Administrar usuarios</h4>
				<Toast/>
				
				<Toolbar class="mb-4">
					<template v-slot:start>
						<div class="my-2">
							<Button label="Añadir" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
							<!--
							<Button label="Eliminar" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedUsers || !selectedUsers.length" />
							-->
						</div>
					</template>
					
				</Toolbar>

				<DataTable ref="dt" :value="users" v-model:selection="selectedUsers" dataKey="_id" :paginator="true" :rows="10" :filters="filters"
							paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
							currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} usuarios" responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							
							<span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                            </span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    
		<Column field="username" header="Usuario" :sortable="true" headerStyle="width:20%; min-width:10rem;">
					<template #body="slotProps">
						<span class="p-column-title">Usuario</span>
						{{slotProps.data.username}}
					</template>
				</Column>


		<Column field="email" header="Correo" :sortable="true" headerStyle="width:20%; min-width:10rem;">
					<template #body="slotProps">
						<span class="p-column-title">Correo</span>
						{{slotProps.data.email}}
					</template>
				</Column>

		<Column field="isAdmin" header="Administrador" :sortable="true" headerStyle="width:20%; min-width:10rem;">
					<template #body="slotProps">
						<span class="p-column-title">Administrador</span>
						{{slotProps.data.isAdmin}}
					</template>
				</Column>
                    

				<!-- acciones -->
				<Column headerStyle="min-width:10rem;">
					<template #body="slotProps">
						<Button icon="pi pi-pencil" class="p-button-rounded p-button-warning mr-2" @click="editUser(slotProps.data)" />
						<Button icon="pi pi-trash" class="p-button-rounded p-button-danger mt-2" @click="confirmDeleteUser(slotProps.data)" />
					</template>
				</Column>
			</DataTable>

                <!-- crear nuevo/editar -->
			<Dialog v-model:visible="userDialog" :style="{width: '500px'}" header="Detalles de Usuario" :modal="true" class="p-fluid">					
		<div class="field">
					<label for="name">Nombre</label>
					<InputText id="name" v-model.trim="user.nombre"/>
				</div>

		<div class="field">
					<label for="familyName">Apellidos</label>
					<InputText id="familyName" v-model.trim="user.apellidos"/>
				</div>

				<div class="field">
					<label for="username">Usuario</label>
					<InputText id="username" v-model="user.username" required="true" autofocus :class="{'p-invalid': submitted && !user.username}"/>
		<small class="p-invalid" v-if="submitted && !user.username">El usuario no puede estar vacío</small>
				</div>

		<div class="field">
					<label for="password">Contraseña</label>
					<Textarea id="password" v-model="user.password" required="true" autofocus :class="{'p-invalid': submitted && !user.password}"/>
		<small class="p-invalid" v-if="submitted && !user.password">La contraseña no puede estar vacía</small>
				</div>

		<div class="field">
					<label for="email">Correo</label>
					<InputText id="email" v-model="user.email"/>
				</div>

		<div class="field">
					<label for="phoneNumber">Teléfono</label>
					<InputNumber id="phoneNumber" v-model="user.telefono"/>
				</div>

		<div class="field">
					<label for="isAdmin">Administrador</label>
					<InputText id="isAdmin" v-model="user.isAdmin"/>
				</div>

		<div class="field">
					<label for="isTestUser">Usuario Piloto</label>
					<InputText id="isTestUser" v-model="user.isTestUser"/>
				</div>

		<div class="field">
					<label for="fechaNacimiento">Fecha de nacimiento</label>
					<InputText id="fecha" v-model="user.fechaNacimiento"/>
				</div>

		<div class="field">
					<label for="pasos">Pasos</label>
					<InputNumber id="pasos" v-model="user.pasos"/>
				</div>

		<div class="field">
					<label for="sexo">Sexo</label>
					<InputText id="sexo" v-model="user.sexo"/>
				</div>

		<div class="field">
					<label for="height">Altura</label>
					<InputNumber id="height" v-model="user.altura"/>
				</div>

		<div class="field">
					<label for="currentWeight">Peso Inicial</label>
					<InputNumber id="currentWeight" v-model="user.peso_actual"/>
				</div>

		<div class="field">
					<label for="objetivo">Objetivo</label>
					<InputText id="objetivo" v-model="user.objetivo"/>
				</div>

		<div class="field">
					<label for="goalWeight">Peso Objetivo</label>
					<InputNumber id="goalWeight" v-model="user.objetivo_peso"/>
				</div>

		<div class="field">
					<label for="objetivo_semanal">Objetivo Semanal</label>
					<InputNumber id="objetivo_semanal" v-model="user.objetivo_semanal"/>
				</div>

		<div class="field">
					<label for="dieta_pref">Dieta Preferida</label>
					<InputText id="dieta_pref" v-model="user.dieta_pref"/>
				</div>

		<div class="field">
					<label for="nivel_actividad">Nivel de Actividad</label>
					<InputText id="nivel_actividad" v-model="user.nivel_actividad"/>
				</div>

		<div class="field">
					<label for="tipo_alimentacion">Tipo de Alimentación</label>
					<InputText id="tipo_alimentacion" v-model="user.tipo_alimentacion"/>
				</div>

		<div class="field">
					<label for="carbohidratos_recomendados">Carbohidratos Recomendados</label>
					<InputNumber id="carbohidratos_recomendados" v-model="user.carbohidratos_recomendados"/>
				</div>

		<div class="field">
					<label for="grasas_recomendadas">Grasas Recomendadas</label>
					<InputNumber id="grasas_recomendadas" v-model="user.grasas_recomendadas"/>
				</div>

		<div class="field">
					<label for="proteinas_recomendadas">Proteínas Recomendadas</label>
					<InputNumber id="proteinas_recomendadas" v-model="user.proteinas_recomendadas"/>
				</div>

		<div class="field">
					<label for="kcal_recomendadas">Kcal Recomendadas</label>
					<InputNumber id="kcal_recomendadas" v-model="user.kcal_recomendadas"/>
				</div>


				<!-- aceptar/cancelar cambios -->
				<template #footer>
					<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
					<Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveUser" />
				</template>
			</Dialog>


        <!-- confirmacion para borrar -->
				<Dialog v-model:visible="deleteUserDialog" :style="{width: '450px'}" header="Confirmación" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="user">¿Quieres borrar el usuario <b>{{user.username}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteUserDialog = false"/>
						<Button label="Sí" icon="pi pi-check" class="p-button-text" @click="deleteUser" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteUsersDialog" :style="{width: '450px'}" header="Confirmación" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="user">¿Quieres eliminar los usuarios seleccionados?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteUsersDialog = false"/>
						<Button label="Sí" icon="pi pi-check" class="p-button-text" @click="deleteSelectedUsers" />
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
import UserService from '../../service/UserService';
export default {
	data() {
		return {
			users: null,
			userDialog: false,
			deleteUserDialog: false,
			deleteUsersDialog: false,
			user: {},
			selectedUsers: null,
			filters: {},
			submitted: false,
		
		}
	},
	userService: null,
	created() {
		this.userService = new UserService();
		this.initFilters();
	},
	mounted() {
		this.userService.getUsers().then(data => this.user = data);
        this.fetchItems();
	},
	methods: {
        fetchItems(){
			axios.get("/users", {
				params: {
					userId: this.$store.state.userId
				}
			})
			.then((response) => {
				this.users = response.data;
			});
        },
		openNew() {
			this.user = {};
			this.submitted = false;
			this.userDialog = true;
		},
		hideDialog() {
			this.userDialog = false;
			this.submitted = false;
		},
		saveUser() {
			this.submitted = true;
			if (this.user.username) {
			//Put
			if (this.user._id) {
				this.deleteUserDialog = false;
				let data = {...this.user}
				let id = this.user._id.split("").join("");
				axios.put("/users/" + id, data);
				this.$toast.add({severity:'success', summary: 'Correcto', detail: 'Usuario Actualizado', life: 3000});
			}
			//Create
			else {
				axios.post('/users', this.user);
				this.users.push(this.user)
				this.$toast.add({severity:'success', summary: 'Correcto', detail: 'Usuario Creado', life: 3000});
			}
			this.userDialog = false;
			this.user = {};
			}
		},
		editUser(user) {
			this.user = user;
			this.userDialog = true;
		},
		confirmDeleteUser(user) {
			this.user = user;
			this.deleteUserDialog = true;
		},
		deleteUser() {
			//HAY QUE DARLE A ELIMINAR DOS VECES
			this.deleteUserDialog = false;
			let id = this.user._id.split("").join("");
			axios.delete('/users/' + id);
			this.users = this.users.filter(val => val._id !== this.user._id);
			this.$toast.add({severity:'success', summary: 'Correcto', detail: 'Usuario eliminado', life: 3000});
		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.users.length; i++) {
				if (this.users[i]._id === id) {
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
			this.deleteUsersDialog = true;
		},
		/*
		deleteSelectedUsers() {
			this.users = this.users.filter(val => !this.selectedUsers.includes(val));
			this.deleteUsersDialog = false;
			this.selectedUsers = null;
			this.$toast.add({severity:'success', summary: 'Correcto', detail: 'Usuarios Eliminados', life: 3000});
		},
		*/
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