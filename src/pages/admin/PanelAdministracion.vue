<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet">
    <h3 style="color:#256029; font-size:2.5rem; font-family: 'Oswald', sans-serif;">Panel de administración</h3>
    <br>
    <div class="grid">

        <div class="col-12 lg:col-6">
            <router-link to="/administrar/usuarios">
            <div class="grid card col-12  justify-content-center">
                <div class="grid col-12 lg:col-6 align-items-center justify-content-center">
                    <Tag class="col-12 text-center" style="color:#256029; font-size:2rem; font-weight:200; font-family: 'Oswald', sans-serif; background:#FFFFFF;">Usuarios</Tag>
                </div>
            </div>
            </router-link>
        
        
            <router-link to="/administrar/ejercicios">
            <div class="grid card col-12  justify-content-center">
                <div class="grid col-12 lg:col-6 align-items-center justify-content-center">
                    <Tag class="col-12 text-center" style="color:#256029; font-size:2rem; font-weight:200; font-family: 'Oswald', sans-serif; background:#FFFFFF;">Ejercicios</Tag>
                </div>
            </div>
            </router-link>
        </div>


        <div class="col-12 lg:col-6">
<!--             <router-link to="/administrar/recetas">
            <div class="grid card col-12  justify-content-center">
                <div class="grid col-12 lg:col-6 align-items-center justify-content-center">
                    <Tag class="col-12 text-center" style="font-size:2rem; font-weight:800; background:#9c9c9c;">Recetas</Tag>
                </div>
            </div>
            </router-link> -->
        
        
            <router-link to="/administrar/alimentos">
            <div class="grid card col-12  justify-content-center">
                <div class="grid col-12 lg:col-6 align-items-center justify-content-center">
                    <Tag class="col-12 text-center" style="color:#256029; font-weight:200; font-size:2rem; font-family: 'Oswald', sans-serif; background:#FFFFFF;">Alimentos</Tag>
                </div>
            </div>
            </router-link>
        </div>

        <Button label="Cerrar sesión" class="p-button-success col-12" @click="openConfirmation" />

        <Dialog header="Confirmación" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
            <div class="flex align-items-center justify-content-center">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span>¿Seguro que quiere salir?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text p-button-info" autofocus style="background-color:#1da750; color:white;"/>
                <Button label="Si" icon="pi pi-check" @click="logout" class="p-button-text p-button-info" style="background-color:#1da750;color:white;"/>
            </template>
        </Dialog>

	</div>
</template>

<script>

export default {
    data() {
        return {
            displayConfirmation: false,
        }
    },
    methods:{
        openConfirmation() {
            this.displayConfirmation = true;
        },
        closeConfirmation() {
            this.displayConfirmation = false;
        },
        logout() {
            this.closeConfirmation()
            this.$store.dispatch("saveUsername", '');
            this.$store.dispatch("savePassword", '');
            this.$store.dispatch("saveUserId", '');
            this.$store.dispatch("logOut");
            this.axios.post('/auth/logout')
            .catch((err) => {
                console.log("Error: ", err);
            });
            this.$router.push("/login");
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'Cierre de sesión correcto', life: 3000});
        }
    }
}
</script>
