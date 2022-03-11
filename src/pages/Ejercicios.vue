<template>
	<div class="grid">			

	<div class="col-12 xl:col-6">
		<h3>EJERCICIOS RECOMENDADOS DEL DÍA </h3>
		<div class="col-12">
			<div class="tabla">
                <DataTable>
                    <Column field="name" header="Nombre" :style="{width:'100px'}">
						<template #body="{data}">
                            <span class="text-bold">{{data.name}}</span>
                        </template>
					</Column>

                    <Column field="zona" header="Zona muscular" :style="{width:'150px'}">
						<template #body="{data}">
                            <span class="text-bold">{{data.muscles}}</span>
                        </template>
					</Column>

                    <Column field="kcal" header="KCal quemadas" :style="{width:'100px'}">
						<template #body="{data}">
                            <span class="text-bold">{{data.calorias}}</span>
                        </template>
					</Column>

                    <Column field="tiempo" header="Tiempo/Repeticiones" :style="{width:'100px'}">
						<template #body="{data}">
                            <span class="text-bold">{{data.tiempo}}</span>
                        </template>
					</Column>
                </DataTable>
			</div>
		</div>
	</div>
	
	
	<div class="col-12 xl:col-6">
		<h3>BUSCADOR DE EJERCICIOS</h3>
		<div class="col-12">
            <div class="contenedor">
				<router-link to= "/buscarEjercicio">
                    <img src="../assets/styles/foto.png"/>
					<div class="texto-centrado"> En esta sección podrás buscar a partir de unos filtros establecidos.</div>
				</router-link>
            </div>
            
        </div>
		
	</div>
	
	</div>
</template>



<style>

.contenedor{
    position: relative;
    display: inline-block;
    text-align: center;
}

.texto-centrado{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
	color:rgb(0, 0, 0);
	background-color: rgb(202, 211, 203);
	opacity: .75;
	font-weight: bold;
	font-size: large;
}
</style>


