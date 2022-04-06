<template>
	<div class="grid">
		<div class="col-12">

			<div class="card">
				<h4 class="m-0">ADMINISTRAR USUARIOS</h4>
				<br>
				<Toast/>
				
				<Toolbar class="mb-4">
					<template v-slot:start>
						<div class="my-2">
							<Button label="Añadir" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
							<Button label="Eliminar" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedUsers || !selectedUsers.length" />
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
                    
          <Column field="username" header="Usuario" :sortable="true" headerStyle="width:10%; min-width:10rem;">
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

          <Column field="isAdmin" header="Administrador" :sortable="true" headerStyle="width:15%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Administrador</span>
							{{slotProps.data.isAdmin}}
						</template>
					</Column>
                    

          <Column field="isTestUser" header="Usuario Piloto" :sortable="true" headerStyle="width:15%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Usuario Piloto</span>
							{{slotProps.data.isTestUser}}
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
						<label for="nombre">Nombre</label>
						<InputText id="nombre" v-model.trim="user.nombre" required="true" autofocus :class="{'p-invalid': submitted && !user.nombre}"/>
					</div>

          <div class="field">
						<label for="apellidos">Apellidos</label>
						<InputText id="apellidos" v-model.trim="user.apellidos" required="true" autofocus :class="{'p-invalid': submitted && !user.apellidos}"/>
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
						<InputText id="email" v-model="user.email" required="true" autofocus :class="{'p-invalid': submitted && !user.email}"/>
            <small class="p-invalid" v-if="submitted && !user.email">El correo no puede estar vacío</small>
					</div>

          <div class="field">
						<label class="mb-3">Administrador</label>
						<div class="formgrid grid">
							<div class="field-radiobutton col-3">
								<RadioButton id="isAdmin1" name="isAdmin" value="Administrador" v-model="user.isAdmin" />
								<label for="isAdmin1">Sí</label>
							</div>
              <div class="field-radiobutton col-3">
								<RadioButton id="isAdmin2" name="isAdmin" value="Administrador" v-model="user.isAdmin" />
								<label for="isAdmin2">No</label>
							</div>
            </div>
					</div>


					
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
          let uri = '/users';
          axios.get(uri).then((response) => {
          this.users = response.data;
          console.log(this.users);
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
			if (this.user.nombre) {
			if (this.user._id) {
				this.user[this.findIndexById(this.user._id)] = this.user;
				
				this.$toast.add({severity:'success', summary: 'Correcto', detail: 'Usuario Actualizado', life: 3000});
				}
				else {

					axios.post('/users', this.user).then(
            ()=>{this.users.push(this.user)}
          )
					this.$toast.add({severity:'success', summary: 'Correcto', detail: 'Usuario Creado', life: 3000});
				}
				this.userDialog = false;
				this.user = {};
			}
		},
		editUser(user) {
			this.user = {...user};
			this.userDialog = true;
		},
		confirmDeleteUser(user) {
			this.user = user;
			this.deleteUserDialog = true;
		},
		deleteUser() {
			this.users = this.users.filter(val => val._id !== this.user._id);
			this.deleteUserDialog = false;
			this.user = {};
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
		deleteSelectedUsers() {
			this.users = this.users.filter(val => !this.selectedUsers.includes(val));
			this.deleteUsersDialog = false;
			this.selectedUsers = null;
			this.$toast.add({severity:'success', summary: 'Correcto', detail: 'Usuarios eliminados', life: 3000});
		},
		initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        }
	}
}
</script>