<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<div class="text-align-center" style="text-align:center">
				<h3>Registro</h3>
				<br>
				</div>
				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-4">
						<label for="nombre">Nombre*</label>
						<InputText v-model="user.nombre" required="true" id="nombre" type="text" autofocus :class="{'p-invalid': enviado && errorNombre}"/>
						<small class="p-invalid" :key="errorNombre" v-show="enviado && errorNombre">{{this.errorNombre}}</small>
					</div>
					<div class="field col-12 md:col-4">
						<label for="apellidos">Apellido/s*</label>
						<InputText v-model="user.apellidos" required="true" id="apellidos" type="text" :class="{'p-invalid': enviado && errorApellido}"/>
						<small class="p-invalid" :key="errorApellido" v-if="enviado && errorApellido">{{this.errorApellido}}</small>
					</div>
					<div class="field col-12 md:col-4">
						<label for="fecha">Fecha de Nacimiento*</label>
						<InputText v-model="user.fecha" required="true" id="fecha" type="date" :class="{'p-invalid': enviado && errorFecha}"/>
						<small class="p-invalid" :key="errorFecha" v-if="enviado && errorFecha">{{this.errorFecha}}</small>
					</div>
					<div class="field col-12 md:col-4">
						<label for="username">Nombre de usuario*</label>
						<InputText v-model="user.username" required="true" id="username" type="text" :class="{'p-invalid': enviado && errorUser}"/>
						<small class="p-invalid" :key="errorUser" v-if="enviado && errorUser">{{this.errorUser}}</small>
					</div>
					<div class="field col-12 md:col-4">
						<label for="password">Contraseña*</label>
						<InputText v-model="user.password" required="true" id="password" type="password" :class="{'p-invalid': enviado && errorPassword}"/>
						<small class="p-invalid" :key="errorPassword" v-if="enviado && errorPassword">{{this.errorPassword}}</small>
					</div>
					<div class="field col-12 md:col-4">
						<label for="password_confirm">Confirmación de la Contraseña*</label>
						<InputText v-model="user.password_confirm" required="true"  id="password_confirm" type="password" :class="{'p-invalid': enviado && errorConfirmPassword}"/>
						<small class="p-invalid" :key="errorConfirmPassword" v-if="enviado && errorConfirmPassword">{{this.errorConfirmPassword}}</small>
					</div>
					<div class="field col-12 md:col-4">
						<label for="email">Email</label>
						<InputText v-model="user.email" id="email" :class="{'p-invalid': enviado && errorEmail}"/>
						<small class="p-invalid" :key="errorEmail" v-if="enviado && errorEmail">{{this.errorEmail}}</small>
					</div>
					<div class="field col-12 md:col-4">
						<label for="telefono">Teléfono*</label>
						<InputText v-model="user.telefono" aria-valuenow="" required="true" id="telefono" :class="{'p-invalid': enviado && errorTelefono}"/>
						<small class="p-invalid" :key="errorTelefono" v-if="enviado && errorTelefono">{{this.errorTelefono}}</small>
					</div>
					<div class="field col-12 md:col-4">
						<label for="sexo">Sexo*</label>
						<Dropdown id="sexo" v-model="user.sexo" :options="sexos" optionLabel="name" placeholder="Elige uno" :class="{'p-invalid': enviado && errorSexo}"></Dropdown>
						<small class="p-invalid" :key="errorSexo" v-if="enviado && errorSexo">{{this.errorSexo}}</small>
					</div>
					<div class="field col-12 md:col-4">
						<label for="tipo_alimentacion">Tipo de Alimentación</label>
						<Dropdown id="tipo_alimentacion" v-model="user.tipo_alimentacion" :options="tipos_alimentacion" optionLabel="name" placeholder="Elige uno" :class="{'p-invalid': enviado && errorTipo}"></Dropdown>
						<small class="p-invalid" :key="errorTipo" v-if="enviado && errorTipo">{{this.errorTipo}}</small>
					</div>
					<div class="field col-12 md:col-4">
						<label for="objetivo">Objetivo*</label>
						<Dropdown id="objetivo" v-model="user.objetivo" :options="objetivos" optionLabel="name" placeholder="Elige uno" :class="{'p-invalid': enviado && errorObjetivo}" @change="cambioObjetivo()"></Dropdown>
						<small class="p-invalid" :key="errorObjetivo" v-if="enviado && errorObjetivo">{{this.errorObjetivo}}</small>
					</div>
					<div class="field col-12 md:col-4">
						<label for="altura">Altura*</label>
						<InputNumber id="altura" v-model="user.altura"  mode="decimal"  :minFractionDigits="0" :maxFractionDigits="2" type="text" placeholder="cm"  :class="{'p-invalid': enviado && errorAltura}"/>
						<small class="p-invalid" :key="errorAltura" v-if="enviado && errorAltura">{{this.errorAltura}}</small>
					</div>
					<div class="field col-12 md:col-4">
						<label for="peso_inicial">Peso inicial*</label>
						<InputNumber id="peso_inicial" v-model="user.peso_inicial" mode="decimal"  :minFractionDigits="0" :maxFractionDigits="2" type="text" placeholder="kg" :class="{'p-invalid': enviado && errorPesoInicial}" @change="cambioObjetivo()"/>
						<small class="p-invalid" :key="errorPesoInicial" v-if="enviado && errorAltura">{{this.errorPesoInicial}}</small>
					</div>
					<div class="field col-12 md:col-4">
						<label for="objetivo_peso">Objetivo de peso</label>
						<InputNumber id="objetivo_peso" v-model="user.objetivo_peso" mode="decimal"  :minFractionDigits="0" :maxFractionDigits="2" type="text" placeholder="kg" :class="{'p-invalid': enviado && errorObjetivoPeso}" :disabled="this.objetivo_peso_disabled" @change="cambioObjetivo()"/>
						<small class="p-invalid" :key="errorObjetivoPeso" v-if="enviado && errorObjetivoPeso">{{this.errorObjetivoPeso}}</small>
					</div>
					<div class="field col-12 md:col-4">
						<label for="objetivo_semanal">Objetivo semanal</label>
						<InputNumber id="objetivo_semanal" v-model="user.objetivo_semanal" mode="decimal"  :minFractionDigits="0" :maxFractionDigits="2" required="true" type="text" :class="{'p-invalid': enviado && errorObjetivoSemanal}" :disabled="this.objetivo_peso_disabled"/>
						<small class="p-invalid" :key="errorObjetivoSemanal" v-if="enviado && errorObjetivoSemanal">{{this.errorObjetivoSemanal}}</small>
					</div>
					<div class="field col-12 md:col-4">
						<label for="nivel_actividad">Nivel de actividad*</label>
						<Dropdown id="nivel_actividad" v-model="user.nivel_actividad" :options="niveles_actividad" optionLabel="name" placeholder="Elige uno" :class="{'p-invalid': enviado && errorActividad}"></Dropdown>
						<small class="p-invalid" :key="errorActividad" v-if="enviado && errorActividad">{{this.errorActividad}}</small>
					</div>
					<div class="field col-12 md:col-4">
						<label for="dieta">Dieta preferida</label>
						<Dropdown id="dieta" v-model="user.dieta_pref" :options="dieta_prefs" optionLabel="name" placeholder="Elige uno" :class="{'p-invalid': enviado && errorDieta}"></Dropdown>
						<small class="p-invalid" :key="errorDieta" v-if="enviado && errorDieta">{{this.errorDieta}}</small>
					</div>
					<div class="field col-12 md:col-4">
						<label for="pasos">Objetivo de pasos diarios</label>
						<InputNumber id="pasos" v-model="user.pasos" required="true" :class="{'p-invalid': enviado && errorPasos}"/>
						<small class="p-invalid" :key="errorPasos" v-if="enviado && errorPasos">{{this.errorPasos}}</small>
					</div>
				</div>
			</div>
			<div class="p-fluid formgrid grid">
				<div class="field col-12 md:col-2 md:col-offset-5">
					<Button label="Guardar" style="background-color:#1DA750; color:white;" @click="guardar"/>
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
	export default {
		data() {
			return {
				userExists: null,
				objetivo_peso_disabled: true,
				user: {pasos:10000, dieta_pref:{name: 'Estándar', code: 'estandar'}, tipo_alimentacion: {name: 'Clásica', code: 'clasica'}},
				enviado: false,
				prueba: null,
				sexos: [
					{name: 'Masculino', code: 'masculino'},
					{name: 'Femenino', code: 'femenino'}
				],
				sexo: null,
				tipos_alimentacion: [
					{name: 'Clásica', code: 'clasica'},
					{name: 'Pescatariana', code: 'pescatariana'},
					{name: 'Vegetariana', code: 'vegetariana'},
					{name: 'Vegana', code: 'vegana'}
				],
				tipo_alimentacion: null,
				objetivos: [
					{name: 'Perder peso', code: 'perder_peso'},
					{name: 'Aumentar masa muscular', code: 'aumentar_masa'},
					{name: 'Mantener peso', code: 'mantener_peso'}
				],
				objetivo: null,
				niveles_actividad: [
					{name: 'Poca o ninguna', code: 'ninguna'},
					{name: 'Ejercicio Ligero', code: 'ejercicio_ligero'},
					{name: 'Ejercicio moderado', code: 'ejercicio_moderado'},
					{name: 'Ejercicio fuerte', code: 'ejercicio_fuerte'},
					{name: 'Ejercicio muy fuerte', code: 'ejercicio_muy_fuerte'}
				],
				nivel_actividad: null,
				dieta_prefs: [
					{name: 'Estándar', code: 'estandar'},
					{name: 'Baja en carbohidratos', code: 'baja_carbohidratos'},
					{name: 'Alta en proteínas', code: 'alta_proteinas'},
					{name: 'Baja en grasas', code: 'baja_grasas'}
				],
				dieta_pref: null,
				errorNombre: null,
				errorApellido: null,
				errorFecha: null,
				errorUser: null,
				errorEmail: null,
				errorPassword: null,
				errorTelefono: null,
				errorTipo: null,
				errorSexo: null,
				errorObjetivoPeso: null,
				errorObjetivo: null,
				errorPesoInicial: null,
				errorAltura: null,
				errorDieta: null,
				errorActividad: null,
				errorSigue: false
			}
		},
		userService: null,
	mounted (){
		this.user;
		this.errorNombre;
	},
	created(){
		this.userService = new UserService;
	},
	methods: {
		cambioObjetivo(){
			this.objetivo_peso_disabled = false;
			if (!this.user.objetivo){
				this.objetivo_peso_disabled = true;
			}else if( this.user.objetivo.code === "mantener_peso"){
				this.objetivo_peso_disabled = true;
				this.user.objetivo_peso = this.user.peso_inicial;
				this.user.objetivo_semanal = 0;
			}else if( this.user.objetivo.code === "perder_peso"){
				this.user.objetivo_semanal = -0.5;
			}else if( this.user.objetivo.code === "aumentar_masa"){
					this.user.objetivo_semanal = 0.5;
			}
			this.comprobarCampos();
			this.$forceUpdate();
		},
		guardar() {
			this.enviado = true;
			//HACER COMPROBACIONES PERTINENTES DE LOS CAMPOS
			let comprobado = this.comprobarCampos();
			if(comprobado){
				this.user.sexo = this.user.sexo.name
				this.user.nivel_actividad = this.user.nivel_actividad.name
				this.user.dieta_pref = this.user.dieta_pref.name
				this.user.objetivo = this.user.objetivo.name
				this.user.tipo_alimentacion = this.user.tipo_alimentacion.name
				this.user.kcal_recomendadas = 1000;
				this.user.carbohidratos_recomendados = 125;
				this.user.grasas_recomendadas = 70;
				this.user.proteinas_recomendadas = 50;
				delete this.user.password_confirm
				this.userService.guardar(this.user)
				.then(() => {
					//REDIRIGIR A LA PAGINA DE LISTADO CON UN TOAST DE CONFIRMACIÓN
					this.$router.push({ name: 'login', params: {mensaje: 'registroRealizado'} });
				})
				.catch((e)=>{
					//SI OCURRE ALGÚN FALLO AL INSERTAR EN LA BD, MOSTRAR
					console.log('error' + e);
					this.$toast.add({severity:'error', summary: 'Fallo', detail: 'No se ha podido registrar correctamente, lo sentimos.', life: 3000});
				})
			}
		},
		comprobarCampos()
		{
			let regexLetras = /^[A-zÀ-ÿ ]+$/;
			/* eslint-disable */
			let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			let resultado = true;
			if(!this.user.nombre || !regexLetras.test(this.user.nombre))
			{
				resultado = false;
				this.errorNombre = 'El nombre es obligatorio y solo puede tener letras';
			}else{
				this.errorNombre = null;

			}
			if(!this.user.apellidos || !regexLetras.test(this.user.apellidos))
			{
				resultado = false;
				this.errorApellido = 'El campo apellidos es obligatorio y solo puede tener letras';
			}else{
				this.errorApellido = null;

			}
			var fecha = new Date();
			if(!this.user.fecha || Date.parse(this.user.fecha)>=fecha)
			{
				resultado = false;
				this.errorFecha = 'La fecha es obligatoria y debe ser anterior al día de hoy';

			}else{
				this.errorFecha = null;
				
			}
			this.userService.getUser(this.user.username).then(data => {this.userExists = data
			
			if(!this.user.username)
			{
				
				resultado = false;
				this.errorUser = 'El nombre de usuario es obligatorio';

			}else{
				if(this.userExists)
				{
					resultado = false;
					this.errorUser = 'El nombre de usuario ya está en uso';

				}else{
					this.errorUser = null;
					
				}
				
			}
				  
			this.$forceUpdate();
			})
			if(!this.user.password || this.user.password.length < 8)
			{
				resultado = false;
				this.errorPassword = 'La contraseña es obligatoria y debe tener al menos 8 carácteres';

			}else{
				this.errorPassword = null;
				
			}
			if(this.user.password !== this.user.password_confirm)
			{
				resultado = false;
				this.errorConfirmPassword = 'Las contraseñas no coinciden';

			}else{
				this.errorConfirmPassword = null;
				
			}
			if(!regexEmail.test(this.user.email))
			{
				resultado = false;
				this.errorEmail = 'El email no es válido';

			}else{
				this.errorEmail = null;
				
			}
			if(!this.user.telefono || this.user.telefono.toString().length !== 9)
			{
				resultado = false;
				this.errorTelefono = 'El telefono es obligatorio y debe contener 9 dígitos';

			}else{
				this.errorTelefono = null;
				
			}
			if(!this.user.sexo)
			{
				resultado = false;
				this.errorSexo = 'Debe elegir una opción';

			}else{
				this.errorSexo = null;
				
			}
			if(!this.user.tipo_alimentacion)
			{
				resultado = false;
				this.errorTipo = 'Debe elegir una opción';

			}else{
				this.errorTipo = null;
				
			}
			if(!this.user.objetivo)
			{
				resultado = false;
				this.errorObjetivo = 'Debe elegir una opción';

			}else{
				this.errorObjetivo = null;
				
			}
			if(!this.user.altura || this.user.altura >300 || this.user.altura < 0)
			{
				resultado = false;
				this.errorAltura = 'Altura inválida';

			}else{
				this.errorAltura = null;
				
			}
			if(!this.user.peso_inicial || this.user.peso_inicial >1000 || this.user.peso_inicial < 0)
			{
				resultado = false;
				this.errorPesoInicial = 'Peso inválido';

			}else{
				this.errorPesoInicial = null;
				
			}
			this.objetivo_peso_disabled = false;
			if (!this.user.objetivo){
				this.objetivo_peso_disabled = true;
			}else if( this.user.objetivo.code === "mantener_peso"){
				this.objetivo_peso_disabled = true;
				this.user.objetivo_peso = this.user.peso_inicial;
				this.user.objetivo_semanal = 0;
			}
			if((!this.user.objetivo_peso || this.user.objetivo_peso >1000 || this.user.objetivo_peso < 0) && !this.objetivo_peso_disabled)
			{
				resultado = false;
				this.errorObjetivoPeso = 'Peso inválido';

			}else{
				if (this.user.objetivo.code === "perder_peso" && this.user.objetivo_peso >= this.user.peso_inicial){
					this.errorSigue = false;
					resultado = false;
					this.errorObjetivoPeso = 'El peso es mayor al inicial (Objetivo: Perder peso)';
				}else{
					this.errorObjetivoPeso = null;
					this.errorSigue = true;
				}

				if (this.user.objetivo.code === "aumentar_masa" && this.user.objetivo_peso <= this.user.peso_inicial){
					resultado = false;
					this.errorObjetivoPeso = 'El peso es menor al inicial (Objetivo: Aumentar masa muscular)';
				}else if(this.errorSigue){
					this.errorObjetivoPeso = null;
				}

				
				
			}
			if(!this.user.objetivo_semanal  && !this.objetivo_peso_disabled)
			{
				this.errorSigue = false;
				resultado = false;
				this.errorObjetivoSemanal = 'El campo Objetivo semanal es obligatorio';

			}else{
				this.errorObjetivoSemanal = null;
				this.errorSigue = true;
			}
			if(((this.user.objetivo_semanal > 0 && this.user.objetivo.code === "perder_peso")
								|| (this.user.objetivo_semanal < 0 && this.user.objetivo.code === "aumentar_masa")) && !this.objetivo_peso_disabled)
			{
				resultado = false;
				this.errorObjetivoSemanal = 'Peso inválido';

			}else if(this.errorSigue){
				this.errorObjetivoSemanal = null;
				
			}

			if(!this.user.nivel_actividad)
			{
				resultado = false;
				this.errorActividad = 'Debe elegir una opción';

			}else{
				this.errorActividad = null;
				
			}
			if(!this.user.dieta_pref)
			{
				resultado = false;
				this.errorDieta = 'Debe elegir una opción';

			}else{
				this.errorDieta = null;
				
			}
			if(!this.user.pasos || this.user.pasos < 0)
			{
				resultado = false;
				this.errorPasos = 'El número de pasos debe ser posivito';

			}else{
				this.errorPasos = null;
				
			}
			this.$forceUpdate();
			return resultado;
			
		},
		volver()
		{
			this.$router.push('/login');
		}
	}
	}
</script>