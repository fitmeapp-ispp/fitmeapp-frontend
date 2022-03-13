<template>
<div>
<Toast position="bottom-right"/>
    <!-- EL USUARIO ES JOSE Y LA CONTRASEÑA ES JOSE -->

  <div class="grid" style="justify-content: center;">
    <div class="col-4">
			<div class="card">
				<h2>Login/Register</h2>

				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-10">
						<label for="usernameId">Username</label>
            <InputText v-model="username" name="username" id="usernameId" @keypress.enter="signIn()"
            :class="{'p-invalid': submitted && error.field === 'username'}" />
            <small class="p-error" v-if="submitted && error.field === 'username'" :key="error.message">{{error.message}}</small>
					</div>
        </div>
        <div class="p-fluid formgrid grid">
          <div class="field col-12 md:col-10">
						<label for="usernameId">Password</label>
            <Password v-model="password" name="password" id="passwordId" :feedback="false" @keypress.enter="signIn()" 
            :class="{'p-invalid': submitted && error.field === 'password'}" />
            <small class="p-error" v-if="submitted && error.field === 'password'">{{error.message}}</small>
					</div>
        </div>

        <small class="p-error" v-if="submitted && error.message === 'Missing credentials'">{{error.message}}</small>

        <div class="grid">
          <Button type="button" icon="pi pi-check" label="Log in" class="p-button-info mt-4 mr-2" @click="signIn()" />
          <Button type="button" icon="pi pi-check" label="Register" class="p-button-info mt-4 ml-2" @click="signUp()" />
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
            password: this.$store.state.password
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.loggedIn;
        },
    },
    methods: {
        signIn() {
            this.submitted = true
            this.$store.dispatch("saveUsername", this.username);
            this.$store.dispatch("savePassword", this.password);
            
            axios.post('/auth/login', {username: this.username, password: this.password})
            .then((response) => {
                this.$store.dispatch("saveUserId", response.data.userId);
                this.$store.dispatch("logIn");
                window.location.href = '/';
                this.$toast.add({severity:'success', summary: 'Successful', detail: 'Logged in successfully', life: 3000});
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
                this.$store.dispatch("saveUserId", response.data.userId);
                this.$store.dispatch("logIn");
                console.log(response.data);
                window.location.href = '/';
                this.$toast.add({severity:'success', summary: 'Successful', detail: 'Registered successfully', life: 3000});
            }).catch(err => {
                console.log("Error: ", err)
                this.error = err.response.data
            })    
        }
    }
}
</script>

<style scoped>
.grid {
  justify-content: center;
}
</style>