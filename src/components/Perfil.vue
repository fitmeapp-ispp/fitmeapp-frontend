<template>
<div>


<span v-if="$store.state.loggedIn"><h1>Logged in as {{$store.state.username}}</h1></span>
<br>
<button class="p-button p-component mr-2 mb-2" @click="toggleMenu">
                    <h1> DESLOGUEATE</h1>
</button>
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
            axios.post('/auth/logout').catch((err) => {
                console.log("Error: ", err)
            });
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'Logged out successfully', life: 3000});
            this.overlayMenuItems = [{label: 'Log in', icon: 'pi pi-sign-in', command: () => {window.location = "/login"}}]
        }
    },
}
</script>