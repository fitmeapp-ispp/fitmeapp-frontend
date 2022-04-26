<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<div class="text-align-center" style="text-align:center">
				<h3 style="color:#256029; font-size:250%; font-family: 'Oswald', sans-serif;">Cambiar contraseña</h3>
				<br>
				</div>
				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-4">
						<label for="actual">Contraseña actual</label>
						<InputText v-model="passwordAntigua" required="true" id="password" type="password" :class="{'p-invalid': enviado && errorPasswordAntigua}"/>
						<small class="p-invalid" :key="errorPasswordAntigua" v-if="enviado && errorPasswordAntigua">{{this.errorPasswordAntigua}}</small>
					</div>
					<div class="field col-12 md:col-4">
						<label for="contrasena">Nueva contraseña</label>
						<InputText v-model="passwordNueva" required="true" id="password" type="password" :class="{'p-invalid': enviado && errorPassword}"/>
						<small class="p-invalid" :key="errorPassword" v-if="enviado && errorPassword">{{this.errorPassword}}</small>
					</div>
					<div class="field col-12 md:col-4">
						<label for="confirmar">Confirmar nueva contraseña</label>
						<InputText v-model="passwordConfirmacion" required="true"  id="password_confirm" type="password" :class="{'p-invalid': enviado && errorConfirmPassword}"/>
						<small class="p-invalid" :key="errorConfirmPassword" v-if="enviado && errorConfirmPassword">{{this.errorConfirmPassword}}</small>
					</div>
				</div>
			</div>
			<div class="p-fluid formgrid grid">
				<div class="field col-12 md:col-2 md:col-offset-5">
					<Button label="Actualizar" style="background-color:#1DA750; color:white;" @click="guardar"/>
				</div>
				<div class="field col-12 md:col-2 md:col-offset-3">
					<Button label="Volver" style="background-color:#1DA750; color:white;" @click="volver"/>
				</div>
			</div>
		</div>
    </div>


	
</template>

<script>
	import UserService from "../service/UserService";
	const bcrypt = require("bcryptjs");
	export default {
		data() {
			return {
				userExists: null,
				objetivo_peso_disabled: true,
				user: {pasos:10000, dieta_pref:{name: 'Estándar', code: 'estandar'}, tipo_alimentacion: {name: 'Clásica', code: 'clasica'}},
				enviado: false,
				prueba: null,
				condicionesAceptadas: null,
				errorSigue: false,
				passwordAntigua: "",
				passwordNueva: "",
				passwordConfirmacion: ""

			}
		},
		userService: null,
	mounted (){
		this.user;
	},
	created(){
		this.userService = new UserService;
        this.obtenerUser();
	},
	methods: {
		guardar() {
			this.enviado = true;
			//HACER COMPROBACIONES PERTINENTES DE LOS CAMPOS
			let comprobado = this.comprobarCampos();
			if(comprobado){
                console.log("Comprobado:"+this.user)
				this.user.password = bcrypt.hashSync(this.passwordNueva, 10);
				this.userService.actualizar(this.$store.state.userId,this.user)
				.then(() => {
					//REDIRIGIR A LA PAGINA DE LISTADO CON UN TOAST DE CONFIRMACIÓN
					this.$router.push({ name: 'perfil', params: {mensaje: 'registroRealizado'} });
				})
				.catch((e)=>{
					//SI OCURRE ALGÚN FALLO AL INSERTAR EN LA BD, MOSTRAR
					console.log('error' + e);
					this.$toast.add({severity:'error', summary: 'Fallo', detail: 'No se ha podido actualizar correctamente, lo sentimos.', life: 3000});
				})
			}
		},
		comprobarCampos()
		{
			/* eslint-disable */
			let resultado = true;
			console.log(this.user.password)
			console.log(bcrypt.hashSync(this.passwordAntigua, 10))
			bcrypt.compare(this.passwordAntigua, this.user.password, (err, isMatch) => {
				if (err) throw err;

				if (isMatch) {
					resultado = false;
					this.errorPasswordAntigua = null;
				} else {
					this.errorPasswordAntigua = 'La contraseña no coindice con la actual';
				}
				this.$forceUpdate();
			});
			if(!this.passwordNueva || this.passwordNueva < 8)
			{
				resultado = false;
				this.errorPassword = 'La contraseña es obligatoria y debe tener al menos 8 carácteres';

			}else{
				this.errorPassword = null;
				
			}
			if(this.passwordNueva !== this.passwordConfirmacion)
			{
				resultado = false;
				this.errorConfirmPassword = 'Las contraseñas no coinciden';

			}else{
				this.errorConfirmPassword = null;
				
			}
			this.$forceUpdate();
			return resultado;
			
		},
        obtenerUser(){

            this.userService.getUser(this.$store.state.username).then(data => {
                this.user = data;
                console.log(this.user)
            });
        },
		volver()
		{
			this.$router.push('/perfil');
		}
	}
	}
</script>