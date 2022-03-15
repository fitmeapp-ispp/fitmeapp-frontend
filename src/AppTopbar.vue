<template>
<div class="ex2">
	<div class="bg-green-600  font-bold border-round m-2 flex align-items-center justify-content-center">
		<span class="col-12 mt-2 lg:col-1 lg:mb-0"></span>
		<img alt="Logo" :src="topbarImage()" />
		<span class="col-12 mt-2 lg:col-1 lg:mb-0"></span>
		<router-link to="/" class="col-12 mt-2 lg:col-2 lg:mb-0">
			<H1 class="color">INICIO</H1>
		</router-link>
		<router-link to="/comidas" class="col-12 mt-2 lg:col-2 lg:mb-0">
			<H1 class="color">COMIDAS</H1>
		</router-link>
		<router-link to="/ejercicio" class="col-12 mt-2 lg:col-2 lg:mb-0">
			<H1 class="color">EJERCICIO</H1>
		</router-link>
		<router-link to="/perfil" class="col-12 mt-2 lg:col-2 lg:mb-0">
			<H1 class="color">PERFIL</H1>
		</router-link>
		<span class="col-12 mt-2 lg:col-2 lg:mb-0"></span>
	</div>
</div>
</template>

<script>
export default {
    methods: {
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        },
		onTopbarMenuToggle(event) {
            this.$emit('topbar-menu-toggle', event);
        },
		topbarImage() {
			return this.$appState.darkTheme ? 'images/Logo_ISPP.png' : 'images/Logo_ISPP.png';
		}
    },
	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		}
	}
}
</script>
<style>
	
	H1.color{
		text-align: center;
		color:white;
	}
	H1.color:hover {
		color: black;
	}
	.ex2 {
		margin: 0px 0px 0 0px;
	}
</style>