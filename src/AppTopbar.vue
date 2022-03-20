<template>
<div>
    <div class="layout-topbar bg-green-600">
            <router-link to="/" class="layout-topbar-logo">
            <img alt="Logo" :src="topbarImage()" />
            <span>FitMeApp</span>
            </router-link>
        <div class="hidden lg:flex ">
            <span style="font-size: 2em; padding-left: 5%"></span>
            <router-link to="/">
                <H1 class="color">INICIO</H1>
            </router-link>
            <router-link to="/comidas">
                <H1 class="color">COMIDAS</H1>
            </router-link>
            <router-link to="/ejercicio">
                <H1 class="color">EJERCICIOS </H1>
            </router-link>
            <router-link to="/perfil">
                <H1 class="color">PERFIL </H1>
            </router-link>
        </div>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="visibleLeft=true">
            <i class="pi pi-ellipsis-v"></i>
        </button>

 
    
        <Sidebar v-model:visible="visibleLeft" :baseZIndex="1000">
            <br>
            <br>
            <br>
            <router-link to="/" @click="visibleLeft=false">
                <H1 class="color">INICIO</H1>
            </router-link>
            <router-link to="/comidas" @click="visibleLeft=false">
                <H1 class="color">COMIDAS</H1>
            </router-link>
            <router-link to="/ejercicio" @click="visibleLeft=false">
                <H1 class="color">EJERCICIOS </H1>
            </router-link>
            <router-link to="/perfil" @click="visibleLeft=false">
                <H1 class="color">PERFIL </H1>
            </router-link>
            <br>
            <br>
            <div align="center">
                <img alt="Logo" :src="topbarImage()"/>
            </div>
        </Sidebar>
    </div>  
 </div> 
</template>


<script>
export default {
    data() {
        return {
            visibleLeft:false
        }
    },
    mounted(){
    },
    methods: {
        topbarImage() {
            return 'images/Logo_ISPP.png';
        },
    },
    computed: {
        darkTheme() {
            return this.$appState.darkTheme;
        }
    },

}
</script>
<style>
    /* font-size: 2em; margin:15px; */
    H1.color{
        padding: 2%;
        margin:15px;
        color:white;
    }
    H1.color:hover {
        color: black;
    }
    .p-sidebar-left {
        
        background-color:rgb(22 163 74) ;
    }
</style>