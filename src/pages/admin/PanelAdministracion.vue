<template>
    <h3>PANEL DE ADMINISTRACIÓN</h3>
    <br>
    <div class="grid">

        <div class="col-12 lg:col-6">
            <router-link to="/administrar_usuarios">
            <div class="grid card col-12  justify-content-center">
                <div class="grid col-12 lg:col-6 align-items-center justify-content-center">
                    <Tag class="col-12 text-center" style="font-size:2rem; font-weight:800; background:#9c9c9c;">Usuarios</Tag>
                </div>
            </div>
            </router-link>
        
        
            <router-link to="/administrar_ejercicios">
            <div class="grid card col-12  justify-content-center">
                <div class="grid col-12 lg:col-6 align-items-center justify-content-center">
                    <Tag class="col-12 text-center" style="font-size:2rem; font-weight:800; background:#9c9c9c;">Ejercicios</Tag>
                </div>
            </div>
            </router-link>
        </div>


        <div class="col-12 lg:col-6">
            <router-link to="/administrar_recetas">
            <div class="grid card col-12  justify-content-center">
                <div class="grid col-12 lg:col-6 align-items-center justify-content-center">
                    <Tag class="col-12 text-center" style="font-size:2rem; font-weight:800; background:#9c9c9c;">Recetas</Tag>
                </div>
            </div>
            </router-link>
        
        
            <router-link to="/administrar_alimentos">
            <div class="grid card col-12  justify-content-center">
                <div class="grid col-12 lg:col-6 align-items-center justify-content-center">
                    <Tag class="col-12 text-center" style="font-size:2rem; font-weight:800; background:#9c9c9c;">Alimentos</Tag>
                </div>
            </div>
            </router-link>
        </div>


	</div>
		


</template>