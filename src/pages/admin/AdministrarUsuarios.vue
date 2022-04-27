<template>
	<div class="grid">
		<div class="col-12">

			<div class="card">
				<h4 style="color:#256029; font-size:2.5rem; font-family: 'Oswald', sans-serif;">Administrar usuarios</h4>
				<Toast/>

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

		<Column field="nombre" header="Nombre" :sortable="true" headerStyle="width:20%; min-width:10rem;">
					<template #body="slotProps">
						<span class="p-column-title">Nombre</span>
						{{slotProps.data.nombre}}
					</template>
				</Column>

		<Column field="apellidos" header="Apellidos" :sortable="true" headerStyle="width:20%; min-width:10rem;">
					<template #body="slotProps">
						<span class="p-column-title">Apellidos</span>
						{{slotProps.data.apellidos}}
					</template>
				</Column>

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
						<i class="pi pi-check ml-5" v-if="slotProps.data.isAdmin"></i>
						<i class="pi pi-times ml-5" v-if="!slotProps.data.isAdmin"></i>
					</template>
				</Column>
                    

				<!-- acciones -->
				<Column headerStyle="min-width:10rem;">
					<template #body="slotProps">
						<Button icon="pi pi-trash" class="p-button-rounded p-button-danger mt-2" @click="confirmDeleteUser(slotProps.data)" />
					</template>
				</Column>
			</DataTable>


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
			isEdit: false
		
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
		hideDialog() {
			this.userDialog = false;
			this.submitted = false;
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