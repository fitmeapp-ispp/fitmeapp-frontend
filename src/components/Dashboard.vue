<template>
	<Topbar />

	<div class="grid">
        <LeftCardHome/>
        <RightCardHome/>
	</div>
</template>

<script>
import LeftCardHome from './LeftCardHome.vue';
import RightCardHome from './RightCardHome';

export default {
	components: {
		Topbar
	},
	data() {
		return {
        }
    },    
	methods: {

    },
    components: {
        'LeftCardHome': LeftCardHome,
        'RightCardHome': RightCardHome,
    }
}
</script>