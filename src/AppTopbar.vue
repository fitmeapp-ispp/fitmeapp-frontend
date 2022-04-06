<template>
    <div class="layout-topbar bg-green-600">
        <div>
            <router-link to="/" class="layout-topbar-logo mr-0">
                <img alt="Logo" :src="topbarImage()" />
                <span>FitMeApp</span>
            </router-link>
        </div>

        <ul class="layout-topbar-menu hidden lg:flex origin-top align-items-center justify-content-left">
            <li class="mt-3 ml-8">
                <router-link to="/">
                    <h1 class="color">INICIO</h1>
                </router-link>
            </li>
            <li class="mt-3 ml-8">
            <router-link to="/ejercicios">
                <h1 class="color">EJERCICIOS </h1>
            </router-link>
            </li>
            <li class="mt-3 ml-8">
            <router-link to="/perfil">
                <h1 class="color">PERFIL </h1>
            </router-link>
            </li>
            <button class="p-link layout-topbar-button ml-8" v-if="$store.state.username" @click="toggleMenu">
            <i class="pi pi-user"></i>
            </button>
            
            <Menu ref="menu" :model="overlayMenuItems" :popup="true"/>
            

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
        </ul>
        <div>
            <button class="p-link layout-topbar-menu-button layout-topbar-button mr-3" v-if="$store.state.username" @click="toggleMenu">
                <i class="pi pi-user"></i>
            </button>
            <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="visibleLeft=true">
                <i class="pi pi-ellipsis-v"></i>
            </button>
        </div>
    
        <Sidebar v-model:visible="visibleLeft" :baseZIndex="1000">
            <div>
                <router-link to="/" @click="visibleLeft=false">
                    <h1 class="color">INICIO</h1>
                </router-link>
                <router-link to="/ejercicios" @click="visibleLeft=false">
                    <h1 class="color">EJERCICIOS </h1>
                </router-link>
                <router-link to="/perfil" @click="visibleLeft=false">
                    <h1 class="color">PERFIL </h1>
                </router-link>
            </div>
            <div align="center">
                <img alt="Logo" :src="topbarImage()"/>
            </div>
        </Sidebar>
    </div>  
</template>


<script>
export default {
    data() {
        return {
            visibleLeft:false,
            displayConfirmation: false,
            overlayMenuItems: [],
        }
    },
    mounted(){
        if (this.$store.state.loggedIn) {
            this.overlayMenuItems.push({
                label: 'Log out',
                icon: 'pi pi-sign-out',
                command: () => {this.openConfirmation()}
            })
        }
    },
    methods: {
        topbarImage() {
            return '/images/Logo_ISPP.png';
        },   
        toggleMenu(event) {
            this.$refs.menu.toggle(event);
        },
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
    },
    computed: {
        darkTheme() {
            return this.$appState.darkTheme;
        }
    },

}
</script>
<style>

    /* font-size: 2em; margin:15px; */
    .color{
        padding: 2%;
        margin-top: 0.5em;
        color:white;
        line-height: 2;
    }
    .color:hover {
        color: black;
    }
    span.color{
        transition: 0.5s;
        color:white;
    }
    span.color:hover{
        color:black;
    }
    .p-sidebar-left {
        background-color:rgb(22 163 74) ;
    }
</style>