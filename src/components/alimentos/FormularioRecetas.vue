<template>
	<div class="grid">
		<div class="col-12 md:col-12">
			
			<div class="grid justify-content-center" >	
				<div class="card p-fluid text-center" style="background-color:#4CD07D; color:white; font-size:x-large;">
					Nueva receta
				</div>
			</div>
			<div class="card p-fluid">
				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
						<label for="nombre">Nombre*</label>
						<InputText id="nombre" v-model.trim="receta.nombre" required="true" autofocus :class="{'p-invalid': enviado && errorNombre}" />
						<small class="p-invalid" v-if="enviado && errorNombre">{{this.errorNombre}}</small>
					</div>
					<div class="field col-12 md:col-6">
						<label for="raciones">Raciones*</label>
						<InputNumber id="raciones" v-model="receta.raciones" :min="0" required="true" autofocus :class="{'p-invalid': enviado && errorRaciones}" />
						<small class="p-invalid" v-if="enviado && errorRaciones">{{this.errorRaciones}}</small>
					</div>
				</div>

				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
                        <div class="card text-center" style="background-color:#4CD07D; color:white; font-size:x-large">
                            Ingredientes
                        </div>
                        <div class="p-fluid formgrid grid" v-for="(ing,indiceIngredientes) in receta.ingredientes" :key="indiceIngredientes">
                            <div class="field col-12 md:col-9">
                                <Dropdown id="ingrediente" v-model="ing.ingrediente" :options="alimentos" optionLabel="nombre" required="true" autofocus :class="{'p-invalid': enviado && errorIngrediente}" />
								<small class="p-invalid" v-if="enviado && errorIngrediente">{{this.errorIngrediente}}</small>
                            </div>
                            <div class="field col-12 md:col-3">
                                <InputText id="cantidad" v-model="ing.cantidad" required="true" autofocus :class="{'p-invalid': enviado && errorCantidad}" />
								<small class="p-invalid" v-if="enviado && errorCantidad">{{this.errorCantidad}}</small>
                            </div>
                            <div class="field col-12 md:col-10 md:col-offset-1">
                                <Button class="p-button-success"  @click="anyadirIngrediente(indiceIngredientes)"  v-show="indiceIngredientes == receta.ingredientes.length-1">
                                    <span class="p-button-label">Añadir</span>
                                </Button>
                            </div>
                        </div>
                        
					</div>
					<div class="field col-12 md:col-6">
                        <div class="card text-center" style="background-color:#4CD07D; color:white; font-size:x-large">
                            Pasos
                        </div>

                        <div class="formgrid grid justify-content-center" v-for="(paso,indicePasos) in receta.pasos" :key="indicePasos">
                            <div class="field col-12">
                                <InputText id="pasos" v-model="receta.pasos[indicePasos]" required="true" autofocus :class="{'p-invalid': enviado && errorPaso}" />
								<small class="p-invalid" v-if="enviado && errorPaso">{{this.errorPaso}}</small>
                            </div>
                            <div class="field col-12 md:col-10 md:col-offset-1">
                                <Button class="p-button-success" @click="anyadirPaso(indicePasos)" v-show="indicePasos == receta.pasos.length-1">
                                    <span class="p-button-label">Añadir</span>
                                </Button>
                            </div>
                        </div>
					</div>
				</div>
			</div>
			<div class="p-fluid formgrid grid">
				<div class="field col-12 md:col-2 md:col-offset-5">
					<Button label="Guardar Receta" style="background-color:#1DA750; color:white;" @click="guardarReceta"/>
				</div>
				<div class="field col-12 md:col-2 md:col-offset-3">
					<Button label="Volver" style="background-color:#1DA750; color:white;" @click="volver"/>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import RecetaService from '../../service/RecetaService';
import AlimentoService from '../../service/AlimentoService';
export default {
	data() {
		return {
			receta: {
				nombre: null,
				raciones: null,
				ingredientes: [{
					ingrediente: '',
					cantidad: ''
				}],
				pasos: ['']
			},
			enviado: false,
			nombre: 'Macarrones con tomatico',
			raciones: 3,
			ingredientes: [{
				nombre: '',
				cantidad: ''
			}],
			pasos: [''],
			recetaService: null,
			alimentoService: null,
			alimentos: {}
		}
	},
	created(){
		this.recetaService = new RecetaService();
		this.alimentoService = new AlimentoService();
		this.obtenerAlimentos();
	},
	methods: {
		obtenerAlimentos(){
                    this.alimentoService.getAlimentos().then(data => {this.alimentos = data
					console.log(this.alimentos[0]);
					});
                },
		anyadirIngrediente(){
			this.receta.ingredientes.push({
				ingrediente: '',
				cantidad:''
			});
		},
		anyadirPaso(){
			this.receta.pasos.push('');
		},
		guardarReceta () {
			this.enviado = true;

			//HACER COMPROBACIONES PERTINENTES DE LOS CAMPOS
			let comprobado = this.comprobarCampos();

			if (comprobado) {
				console.log(this.receta);
				for (var ingrediente of this.receta.ingredientes) {  
				ingrediente = ingrediente.id;
				}
				if (this.receta._id) {
					this.recetaService.actualizarReceta(this.receta)
					.then(() => {
						//REDIRIGIR A LA PAGINA DE LISTADO CON UN TOAST DE CONFIRMACIÓN
						this.$router.push({ name: 'comidas', params: {mensaje: 'alimentoModificado'} });
					})
					.catch((e)=>{
						//SI OCURRE ALGÚN FALLO AL INSERTAR EN LA BD, MOSTRAR
						console.log('error' + e);
						this.$toast.add({severity:'error', summary: 'Fallo', detail: 'No se ha podido actualizar la receta, lo sentimos.', life: 3000});
					})
				}else{
					this.recetaService.guardarReceta(this.receta)
					.then(() => {
						//REDIRIGIR A LA PAGINA DE LISTADO CON UN TOAST DE CONFIRMACIÓN
						this.$router.push({ name: 'comidas', params: {mensaje: 'alimentoInsertado'} });
					})
					.catch((e)=>{
						//SI OCURRE ALGÚN FALLO AL INSERTAR EN LA BD, MOSTRAR
						console.log('error' + e);
						this.$toast.add({severity:'error', summary: 'Fallo', detail: 'No se ha podido guardar la receta, lo sentimos.', life: 3000});
					})
				}
			}
		},
		comprobarCampos() {
			let regexLetrasNumeros = /^[A-zÀ-ÿ0-9 _]+$/;
			//let regexLetras = /^[A-zÀ-ÿ]+$/;
			let resultado = true;
			if(!this.receta.nombre || !regexLetrasNumeros.test(this.receta.nombre))
			{
				resultado = false;
				this.errorNombre = 'Debe introducir un nombre y solo puede usar letras y números';
			} 
			if (!this.receta.raciones || this.receta.raciones<=0)
			{
				resultado = false;
				this.errorRaciones = 'Debe especificar el número de raciones';
			}
			if(this.receta.ingredientes.lenght == 0){
				resultado = false;
				this.errorIngrediente = 'Debe introducir al menos un ingrediente';
			}
			else{
				for (var ing of this.receta.ingredientes) {  
					if (!ing.ingrediente || !regexLetrasNumeros.test(ing.ingrediente)) {
							resultado = false;
							this.errorIngrediente = 'Debe introducir ingredientes válidos';
					}
					if (!ing.cantidad || !regexLetrasNumeros.test(ing.cantidad)) {
							resultado = false;
							this.errorCantidad = 'Debe especificar una cantidad con letras y números';
					}
				}
			}
			if(this.pasos.lenght == 0){
				resultado = false;
				this.errorPaso = 'Debe indicar al menos un paso y los pasos solo pueden contener letras y números';
			}else{
				for (var paso of this.receta.pasos) {
					if (!paso || !regexLetrasNumeros.test(paso)) {
						resultado = false;
						this.errorPaso = 'Debe indicar al menos un paso y los pasos solo pueden contener letras y números';
					}
				}
			}
			return resultado;
		},
		volver () {
			this.enviado = true;
			location.href = "/alimentos_recetas";
		}
	}
}
</script>