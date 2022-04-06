<template>
    <Toast position="bottom-right"/>

    <div class="flex align-items-center justify-content-center overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <!-- <img :src="topbarImage()" alt="Logo" class="mb-5"> -->
            </div>
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" :style="'border-radius:53px; background: linear-gradient('+grados+'deg, var(--green-600), var(--surface-card) 70%); animation: rotation 2s linear infinite;'">
                    <div class="text-center mb-5">
                        <img :src="topbarImage()" alt="Logo" class="mb-3" height="50">
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenido a FitMeApp!</div>
                        <span class="text-900 font-medium">Inicia sesión para continuar</span>
                    </div>
                
                    <div class="w-full md:w-10 mx-auto">
                        <label for="usernameId" class="block text-900 text-xl font-medium mb-2">Nombre de usuario</label>
                        <InputText v-model="username" name="username" id="usernameId" @keypress.enter="signIn()"
                        :class="{'p-invalid': submitted && error.field === 'username'} + '; w-full mb-2'" placeholder="Nombre de usuario" style="padding:1rem;" />
                        <small class="p-error" v-if="submitted && error.field === 'username'" :key="error.message">{{error.message}}</small>
                
                        <label for="passwordId" class="block text-900 font-medium text-xl mt-2 mb-2">Contraseña</label>
                        <Password v-model="password" name="password" id="passwordId" :feedback="false" @keypress.enter="signIn()" 
                        :class="{'p-invalid': submitted && error.field === 'password'}" placeholder="Contraseña" :toggleMask="true"
                        class="w-full mb-2" inputClass="w-full" inputStyle="padding:1rem" />
                        <small class="p-error" v-if="submitted && error.field === 'password'">{{error.message}}</small>

                        <div class="flex align-items-center justify-content-between mb-3 mt-2">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                                <label for="rememberme1" class="text-900">Recuérdame</label>
                            </div>
                            <!-- <a class="font-medium no-underline ml-2 text-right cursor-pointer text-900">¿Has olvidado la contraseña?</a> -->
                        </div>

                        <small class="p-error" v-if="submitted && error.message === 'Missing credentials'">¡Algunos campos están en blanco!</small>

                        <div class="flex justify-content-around mt-5">
                        <Button type="button" icon="pi pi-check" label="Iniciar sesión" class="p-3 text-xl text-900 col-5" 
                        @click="signIn()" style="background-color:var(--surface-card)"/>
                        <Button type="button" icon="pi pi-user-plus" label="Registrarse" class="p-3 text-xl text-900 col-5" 
                        @click="signUp()" style="background-color:var(--surface-card)" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import axios from "axios";
import Toast from 'primevue/toast';
export default {
    name: 'Login',
    components: {
    InputText,
    Password,
    Button,
    Toast,
    },
    created() {
        if (this.loggedIn) {
            this.$router.push("/");
        }
    },
    data() {
        return {
            error: {},
            submitted: false,
            username: this.$store.state.username,
            password: this.$store.state.password,
            grados: 1,
            checked: false
        }
    },
    mounted() {
        setInterval(this.cambiaGrados, 20)
    },
    computed: {
        loggedIn() {
            return this.$store.state.loggedIn;
        }
    },
    methods: {
        topbarImage() {
            return '/images/Logo_ISPP.png';
        },
        cambiaGrados() {
            if (this.grados >= 360) {
                this.grados = 0
            } else {
                this.grados++
            }
        },
        signIn() {
            this.submitted = true
            this.$store.dispatch("saveUsername", this.username);
            this.$store.dispatch("savePassword", this.password);
            
            axios.post('/auth/login', {username: this.username, password: this.password})
            .then((response) => {
                this.$store.dispatch("saveUserId", response.data.userId);
                this.$store.dispatch("logIn");
                window.location.href = '/';
                this.$toast.add({severity:'success', summary: 'Successful', detail: 'Inicio de sesión correcto', life: 3000});
            }).catch(err => {
                this.error = err.response.data
            })    
        },
        signUp() {
            this.submitted = true
            this.$store.dispatch("saveUsername", this.username);
            this.$store.dispatch("savePassword", this.password);
            
            axios.post('/auth/register', {username: this.username, password: this.password})
            .then((response ) => {
                this.$toast.add({severity:'success', summary: 'Successful', detail: 'Registro realizado correctamente', life: 3000});
                this.$store.dispatch("saveUserId", response.data.userId);
                this.$store.dispatch("logIn");
                window.location.href = '/';
            }).catch(err => {
                console.log("Error: ", err)
                this.error = err.response.data
            })    
        }
    },
}
</script>

<style scoped>
.grid {
  justify-content: center;
}
</style>