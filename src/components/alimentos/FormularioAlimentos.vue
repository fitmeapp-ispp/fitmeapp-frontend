<template>
	<div class="grid">
		<div class="col-12 md:col-12">
			<Toast/>
			<div class="grid justify-content-center" >	
				<div class=" text-center titulo" style="color:#256029;">
					{{this.titulo}}
				</div>
			</div>
			<div class="card p-fluid">
				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
						<label for="nombre">Nombre*</label>
						<InputText id="nombre" v-model.trim="alimento.nombre" required="true" autofocus :class="{'p-invalid': enviado && errorNombre}" />
						<small class="p-invalid" :key="errorNombre" v-if="enviado && errorNombre">{{this.errorNombre}}</small>
					</div>
					<div class="field col-12 md:col-6">
						<label for="marca">Marca*</label>
						<InputText id="marca" v-model="alimento.marca" required="true" autofocus :class="{'p-invalid': enviado && errorMarca}" />
						<small class="p-invalid" :key="errorMarca" v-if="enviado && errorMarca">{{this.errorMarca}}</small>
					</div>
				</div>
				<br>
				<div class="text-center titulo" style="font-size:x-large; color:#256029;">
						Información Nutricional
				</div>
				<br>
				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
						<label for="kcal">Energía* (Kcal)</label>
						<InputNumber id="kcal" mode="decimal" :min="0" v-model="alimento.kcal_100g" :maxFractionDigits="2" required="true" autofocus :class="{'p-invalid': enviado && !alimento.kcal_100g}"/>
						<small class="p-invalid" v-if="enviado && !alimento.kcal_100g">Debe indicar cuántas kcal tiene.</small>
					</div>
					<div class="field col-12 md:col-6">
						<label for="kcal">Proteinas* (g)</label>
						<InputNumber id="kcal" mode="decimal" :min="0" v-model="alimento.proteinas_100g" :maxFractionDigits="2" required="true" autofocus :class="{'p-invalid': enviado && !alimento.proteinas_100g}"/>
						<small class="p-invalid" v-if="enviado && !alimento.proteinas_100g">Debe indicar si lleva proteinas.</small>
					</div>
				</div>
				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
						<label for="grasas">Grasas* (g)</label>
						<InputNumber id="grasas" mode="decimal" :min="0" v-model="alimento.grasa_100g" :maxFractionDigits="2" required="true" autofocus :class="{'p-invalid': enviado && !alimento.grasa_100g}"/>
						<small class="p-invalid" v-if="enviado && !alimento.grasa_100g">Debe indicar si lleva grasas.</small>
					</div>
					<div class="field col-12 md:col-6">
						<label for="grasasStd">Grasas saturadas* (g)</label>
						<InputNumber id="grasasStd" mode="decimal" :min="0" v-model="alimento.grasas_std_100g" :maxFractionDigits="2" required="true" autofocus :class="{'p-invalid': enviado && !alimento.grasas_std_100g}"/>
						<small class="p-invalid" v-if="enviado && !alimento.grasas_std_100g">Debe indicar si lleva grasas saturadas.</small>
					</div>
				</div>
				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
						<label for="kcal">Carbohidratos* (g)</label>
						<InputNumber id="kcal" mode="decimal" :min="0" v-model="alimento.carbohidratos_100g" :maxFractionDigits="2" required="true" autofocus :class="{'p-invalid': enviado && !alimento.carbohidratos_100g}"/>
						<small class="p-invalid" v-if="enviado && !alimento.carbohidratos_100g">Debe indicar si lleva carbohidratos.</small>
					</div>
					<div class="field col-12 md:col-6">
						<label for="kcal">Azúcares* (g)</label>
						<InputNumber id="kcal" mode="decimal" :min="0" v-model="alimento.azucares_100g" :maxFractionDigits="2" required="true" autofocus :class="{'p-invalid': enviado && !alimento.azucares_100g}"/>
						<small class="p-invalid" v-if="enviado && !alimento.azucares_100g">Debe indicar si lleva azúcares.</small>
					</div>
				</div>
				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
						<label for="name2">Sal* (g)</label>
						<InputNumber id="inputtext" mode="decimal" :min="0" v-model="alimento.sal_100g" :maxFractionDigits="2" required="true" autofocus :class="{'p-invalid': enviado && !alimento.sal_100g}"/>
						<small class="p-invalid" v-if="enviado && !alimento.sal_100g">Debe indicar si lleva sal.</small>
					</div>
					<div class="field col-12 md:col-6">
						<label for="kcal">Sodio (g)</label>
						<InputNumber id="kcal" mode="decimal" :min="0" v-model="alimento.sodio_100g" :maxFractionDigits="2"/>
					</div>
				</div>
				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
						<label for="name2">Fibra (g)</label>
						<InputNumber id="inputtext" mode="decimal" :min="0" v-model="alimento.fibra_100g" :maxFractionDigits="2"/>
					</div>
					<div class="field col-12 md:col-6">
						<label for="kcal">Colesterol (g)</label>
						<InputNumber id="kcal" mode="decimal" :min="0" v-model="alimento.colesterol_100g" :maxFractionDigits="2"/>
					</div>
				</div>
				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
						<label for="kcal">Potasio (g)</label>
						<InputNumber id="kcal" mode="decimal" :min="0" v-model="alimento.potasio_100g" :maxFractionDigits="2"/>
					</div>
					<div class="field col-12 md:col-6">
						<label for="alergenos">Alérgenos</label>
						<MultiSelect v-model="alergenosSel" :options="selector_alergenos" optionLabel="Alérgenos" placeholder="Seleccione los alérgenos" :filter="true">
							<template #value="slotProps">
								<div class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2" v-for="option of slotProps.value" :key="option.code">
									<span :class="'mr-2 flag flag-' + option.code.toLowerCase()" style="width:18px; height: 12px"/>
									<div>{{option.name}}</div>
								</div>
								<template v-if="!slotProps.value || slotProps.value.length === 0">
									<div class="p-1">Seleccione los alérgenos</div>
								</template>
							</template>
							<template #option="slotProps">
								<div class="flex align-items-center">
									<span :class="'mr-2 flag flag-' + slotProps.option.code.toLowerCase()" style="width:18px; height: 12px"/>
									<div>{{slotProps.option.name}}</div>
								</div>
							</template>
						</MultiSelect>
					</div>
				</div>
			</div>
			<div class="p-fluid formgrid grid">
				<div class="field col-12 md:col-2 md:col-offset-5">
					<Button label="Guardar Alimento" style="background-color:#1DA750; color:white;" @click="guardarAlimento"/>
				</div>
				<div class="field col-12 md:col-2 md:col-offset-3">
					<Button label="Volver" style="background-color:#1DA750; color:white;" @click="volver"/>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import AlimentoService from '../../service/AlimentoService';

export default {
	data() {
		return {
			titulo: 'Nuevo alimento',
			alimento: {},
			enviado: false,
			errorNombre: null,
			errorMarca: null,
			alergenosSel: [],
			selector_alergenos: [
				{name: 'Gluten', code: 'gluten'},
				{name: 'Crustáceos', code: 'crustaceos'},
				{name: 'Huevos', code: 'huevos'},
				{name: 'Pescado', code: 'pescado'},
				{name: 'Cacahuetes', code: 'cacahuetes'},
				{name: 'Soja', code: 'soja'},
				{name: 'Leche', code: 'leche'},
				{name: 'Frutos de cáscara', code: 'frutos_de_cascara'},
				{name: 'Apio', code: 'apio'},
				{name: 'Mostaza', code: 'mostaza'},
				{name: 'Granos de Sésamo', code: 'Sesamo'},
				{name: 'Dióxido de azufre y sulfitos', code: 'azufre_sulfitos'},
				{name: 'Altramuces', code: 'altramuces'},
				{name: 'Moluscos', code: 'moluscos'}
			],
			multiselectValue: null
		}
	},
	alimentoService: null,
	created(){
		this.alimentoService = new AlimentoService();	
	},
	mounted(){
		if (useRoute().query.id){
			//COMPROBAR SI DICHO ALIMENTO PERTENECE AL USUARIO
			this.alimentoService.getAlimento(useRoute().query.id).then(data => this.alimento = data);
			this.titulo = 'Editar alimento';
		}
	},
	methods: {
		guardarAlimento () {
			this.enviado = true;
			//HACER COMPROBACIONES PERTINENTES DE LOS CAMPOS
			let comprobado = this.comprobarCampos();

			if (comprobado) {

				//TRANSFORMAMOS LOS ALERGENOS EN UN STRING
				let alergenos = [];
			
				if(this.alergenosSel.length > 0){
					for(let alergeno of this.alergenosSel){
						alergenos.push(alergeno.code);
					}
					this.alimento.alergenos = alergenos.join(",");
				}
				
				if (this.alimento._id) {
					this.alimentoService.actualizarAlimento(this.alimento)
					.then(() => {
						//REDIRIGIR A LA PAGINA DE LISTADO CON UN TOAST DE CONFIRMACIÓN
						this.$router.push({ name: 'comidas', params: {mensaje: 'alimentoModificado'} });
					})
					.catch((e)=>{
						//SI OCURRE ALGÚN FALLO AL INSERTAR EN LA BD, MOSTRAR
						console.log('error' + e);
						this.$toast.add({severity:'error', summary: 'Fallo', detail: 'No se ha podido actualizar el alimento, lo sentimos.', life: 3000});
					})
				}else{
					this.alimento.creado_por = this.$store.state.username;
					this.alimentoService.guardarAlimento(this.alimento)
					.then(() => {
						//REDIRIGIR A LA PAGINA DE LISTADO CON UN TOAST DE CONFIRMACIÓN
						this.$router.push({ path: '/comidas/Almuerzo', params: {mensaje: 'alimentoInsertado'} });
					})
					.catch((e)=>{
						//SI OCURRE ALGÚN FALLO AL INSERTAR EN LA BD, MOSTRAR
						console.log('error' + e);
						this.$toast.add({severity:'error', summary: 'Fallo', detail: 'No se ha podido guardar el alimento, lo sentimos.', life: 3000});
					})
				}
			}
		},
		comprobarCampos()
		{
			let regexLetras = /^[A-zÀ-ÿ ]+$/;
			let resultado = true;
			if(!this.alimento.nombre || !regexLetras.test(this.alimento.nombre))
			{
				resultado = false;
				this.errorNombre = 'El nombre solo puede tener letras';
			}else{
				this.errorNombre = "";
			}
			if (!this.alimento.marca || !regexLetras.test(this.alimento.marca))
			{
				resultado = false;
				this.errorMarca = 'La marca solo puede tener letras';
			}else{
				this.errorMarca = "";
			}
			if (!this.alimento.kcal_100g || !this.alimento.proteinas_100g || !this.alimento.grasa_100g || !this.alimento.grasas_std_100g 
				|| !this.alimento.carbohidratos_100g || !this.alimento.azucares_100g || !this.alimento.sal_100g){
				resultado = false;
			}
			this.$forceUpdate();
			return resultado;
		},
		volver()
		{
			this.$router.push('/comidas/Almuerzo');
		}
	}
}
</script>