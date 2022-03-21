<template>
    <div class="flex align-items-center justify-content-center overflow-hidden">
        <div class="grid justify-content-center" style="min-width:80%">
			<Toast/>
			<div class="col-12 xl:col-6 h-full w-full m-0 py-7 px-4 ">
				<div class="text-center mb-6">
					<h1>¿Qué desea añadir?</h1>
				</div>

				<div class="flex align-items-center justify-content-around mb-5">
					<Button class="p-button-success" style="background-color: #4CD07D;" @click="nuevaReceta">
						<span class="p-button-label">Nueva receta</span>
					</Button>
					<Button class="p-button-success" style="background-color: #4CD07D;" @click="nuevoAlimento">
						<span class="p-button-label">Nuevo alimento</span>
					</Button>
				</div>

				<div class="grid justify-content-center">
					<div class="col-12 text-center">
						<Button class="p-button-success" style="background-color: #1DA750;" @click="volver">
							<span class="p-button-label">Volver</span>
						</Button>
					</div>
				</div>
			</div>


		</div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';

	export default {
		data() {
			return {

			}
		},
		mounted(){ 
			let mensaje = useRoute().params.mensaje;
			if (mensaje == 'alimentoModificado'){
				this.$toast.add({severity:'success', summary: 'Éxito', detail: 'Se ha modificado el alimento correctamente.', life: 3000});
			} else if (mensaje == 'alimentoInsertado'){
				this.$toast.add({severity:'success', summary: 'Éxito', detail: 'Se ha insertado el alimento correctamente.', life: 3000});
			}
		},
		methods: {
			nuevaReceta () {
				location.href = "/recetas/form";
			},
			nuevoAlimento () {
				location.href = "/alimentos/form";
			},
			volver () {
				this.enviado = true;
				location.href = "/comidas";
			}
		}
	}
</script>