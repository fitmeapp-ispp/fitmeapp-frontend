<template>
	<div class="layout-footer" v-if="$route.fullPath !== '/login' && $route.fullPath !== '/register' && $route.fullPath !== '/condiciones'">
		<router-link to="/GDPR">
			<p style="color:gray; font-size: 1.5em;">Aviso legal</p>
        </router-link>
	</div>
</template>

<script>
	export default {
		name: "AppFooter",
		methods: {
			footerImage() {
				return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
			}
		},
		computed: {
			darkTheme() {
				return this.$appState.darkTheme;
			}
		}
	}
</script>