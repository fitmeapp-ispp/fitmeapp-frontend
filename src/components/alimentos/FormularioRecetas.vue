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
						<InputText id="nombre" v-model.trim="receta.nombre" required="true" autofocus />
					</div>
					<div class="field col-12 md:col-6">
						<label for="raciones">Raciones*</label>
						<InputNumber id="raciones" v-model="receta.raciones" :min="0" required="true" autofocus />
					</div>
				</div>

				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
                        <div class="card text-center" style="background-color:#4CD07D; color:white; font-size:x-large">
                            Ingredientes
                        </div>
                        <div class="p-fluid formgrid grid" v-for="(ing,indiceIngredientes) in receta.ingredientes" :key="indiceIngredientes">
                            <div class="field col-12 md:col-9">
                                <InputText id="ingrediente" v-model="ing.ingrediente" required="true" autofocus/>
                            </div>
                            <div class="field col-12 md:col-3">
                                <InputNumber id="cantidad" v-model="ing.cantidad" required="true" autofocus />
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

                        <div class="formgrid grid justify-content-center" v-for="(paso,indicePasos) in pasos" :key="indicePasos">
                            <div class="field col-12">
                                <InputText id="pasos" v-model="paso.paso" placeholder="Añada un paso" required="true" autofocus :class="{'p-invalid': enviado && !paso.paso}" />
                            </div>
                            <div class="field col-12 md:col-10 md:col-offset-1">
                                <Button class="p-button-success" @click="anyadirPaso(indicePasos)" v-show="indicePasos == pasos.length-1">
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
				pasos: [{
					paso: ''
				}],},
			enviado: false,
			nombre: 'Macarrones con tomatico',
			raciones: 3,
			ingredientes: [{
				nombre: '',
				cantidad: ''
			}],
			pasos: [{
				paso: ''
			}],
			recetaService: null
		}
	},
	created(){
		this.recetaService = new RecetaService();
	},
	methods: {
		anyadirIngrediente(){
			this.receta.ingredientes.push({
				ingrediente: '',
				cantidad:''
			});
		},
		anyadirPaso(){
			this.pasos.push({ 
				paso: ''
			});
		},
		guardarReceta () {
		this.enviado = true;

		//HACER COMPROBACIONES PERTINENTES DE LOS CAMPOS
		//let comprobado = this.comprobarCampos();
		let comprobado = true;

		if (comprobado) {
			
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
		volver () {
			this.enviado = true;
			location.href = "/alimentos_recetas";
		}
	}
}
</script>