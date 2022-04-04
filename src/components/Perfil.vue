<template>
    <div class="">
        <div class="grid col-12 align-items-center justify-content-center">
            <span v-if="$store.state.loggedIn"><h1>Conectado como {{$store.state.username}}</h1></span>
        </div>
        <div class="grid col-12 align-items-center justify-content-center">
            <button class="p-button p-component mr-2 mb-2" v-if="$store.state.username" @click="toggleMenu" style="background-color: #4CD07D;">
                <h1> DESLOGUEATE</h1>
            </button>
        </div>
        <Menu ref="menu" :model="overlayMenuItems" :popup="true" />

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
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
// import FitAppLogo from "@/assets/FitAppLogo.png"
import axios from 'axios'

export default {
	components: {
        Menu,
        Dialog,
        Button,
    },
    props: ['projectInfo'],
	data() {
        return {
            // FitAppLogo: FitAppLogo,
            displayConfirmation: false,
            overlayMenuItems: [],
        }
    },
    mounted: function() {
        if (!this.$store.state.loggedIn) {this.overlayMenuItems.push({
                    label: 'Log in',
                    icon: 'pi pi-sign-in',
                    command: () => {window.location = "/login"}
                })
        }
        if (this.$store.state.loggedIn) {
            this.overlayMenuItems.push({
                    label: 'Log out',
                    icon: 'pi pi-sign-out',
                    command: () => {this.openConfirmation()}
                })
        }
    },
    methods: {
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
            axios.post('/auth/logout')
            .catch((err) => {
                console.log("Error: ", err);
            });
            this.$router.push("/");
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'Cierre de sesión correcto', life: 3000});
        }
    },
}
</script>