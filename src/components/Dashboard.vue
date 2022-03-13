<template>
	<div class="grid">
        <LeftCardHome/>
        <RightCardHome/>
	</div>
</template>

<script>
import LeftCardHome from './LeftCardHome.vue';
import RightCardHome from './RightCardHome.vue';

export default {
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