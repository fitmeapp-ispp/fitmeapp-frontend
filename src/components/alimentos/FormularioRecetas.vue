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
						<InputText id="nombre" v-model="nombre" required="true" autofocus :class="{'p-invalid': enviado && !nombre}" />
						<small class="p-invalid" v-if="enviado && !nombre">El nombre es requerido.</small>
					</div>
					<div class="field col-12 md:col-6">
						<label for="raciones">Raciones*</label>
						<InputNumber id="raciones" v-model="raciones" :min="0" required="true" autofocus :class="{'p-invalid': enviado && !raciones}" />
						<small class="p-invalid" v-if="enviado && !raciones">Debe indicar cuántas raciones son.</small>
					</div>
				</div>

				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
                        <div class="card text-center" style="background-color:#4CD07D; color:white; font-size:x-large">
                            Ingredientes
                        </div>
                        <div class="p-fluid formgrid grid" v-for="(ingrediente,indiceIngredientes) in ingredientes" :key="indiceIngredientes">
                            <div class="field col-12 md:col-9">
                                <InputText id="ingrediente" v-model="ingrediente.nombre" placeholder="Ingrediente" required="true" autofocus :class="{'p-invalid': enviado && !ingrediente.nombre}" />
                            </div>
                            <div class="field col-12 md:col-3">
                                <InputNumber id="cantidad" v-model="ingrediente.cantidad" mode="decimal" :min="0" :maxFractionDigits="2" placeholder="Cantidad" required="true" autofocus :class="{'p-invalid': enviado && !cantidad}" />
                            </div>
                            <div class="field col-12 md:col-10 md:col-offset-1">
                                <Button class="p-button-success"  @click="anyadirIngrediente(indiceIngredientes)" v-show="indiceIngredientes == ingredientes.length-1">
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
	export default {
		data() {
			return {

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
			}
		},
		methods: {
            anyadirIngrediente(){
                this.ingredientes.push({ 
                    nombre: '',
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
			},
			volver () {
				this.enviado = true;
				location.href = "/alimentos_recetas";
			}
		}
	}
</script>