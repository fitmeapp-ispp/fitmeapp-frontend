<template>

    <Toast position="bottom-right"/>
	<div class="layout-topbar">

        <router-link to="/" class="layout-topbar-logo mr-3">
            <img alt="FitMeApp Logo" :src="FitMeAppLogo" height="100"/>
            <span class="ml-3">FitMeApp</span>
        </router-link>
        
        <ul class="layout-topbar-menu lg:flex origin-top">
            <li>
                <span v-if="!$store.state.loggedIn">You are not logged in</span>
                <span v-if="$store.state.loggedIn">Logged in as <u>{{$store.state.username}}</u></span>
                <button class="p-link layout-topbar-button user-button" @click="toggleMenu">
                    <i class="pi pi-user"></i>
                </button>
            </li>

            <Menu ref="menu" :model="overlayMenuItems" :popup="true" />

            <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
                <div class="flex align-items-center justify-content-center">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span>Are you sure you want to log out?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text p-button-info" autofocus/>
                    <Button label="Yes" icon="pi pi-check" @click="logout" class="p-button-text p-button-info" />
                </template>
            </Dialog>
        </ul>

	</div>

</template>

<script>
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
// import FitAppLogo from "@/assets/FitAppLogo.png"
import axios from 'axios'
import Toast from 'primevue/toast';

export default {
    components: {
        Menu,
        Dialog,
        Button,
        Toast,
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

            axios.post('/auth/logout').catch((err) => {
                console.log("Error: ", err)
            });

            this.$toast.add({severity:'success', summary: 'Successful', detail: 'Logged out successfully', life: 3000});

            this.overlayMenuItems = [{label: 'Log in', icon: 'pi pi-sign-in', command: () => {window.location = "/login"}}]
        }
    },
}
</script>

<style>
    #app-mode-label {
        margin-left: 0.75rem;
        line-height: 1;
    }
</style>

<style scoped>
    h1 {
        font-size: 3rem;
    }
</style>