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
}
</script>