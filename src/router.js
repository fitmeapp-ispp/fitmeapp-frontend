import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import Ejercicio from './components/Ejercicio.vue';

import FormularioAlimentos from './components/alimentos/FormularioAlimentos.vue';
//import FormularioRecetas from './components/alimentos/FormularioRecetas.vue';
//import SelectorFormularios from './components/alimentos/SelectorFormularios.vue';
import Comidas from './components/Comidas.vue';
import Perfil from './components/Perfil.vue';
const Login = () => import("./pages/Login.vue");
import store from './store'

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/comidas',
        name: 'comidas',
        component: Comidas,
    },
    {
        path: '/ejercicio',
        name: 'ejercicio',
        component: Ejercicio,
    },
    {
        path: '/perfil',
        name: 'perfil',
        component: Perfil,
    },
    {
        path: '/crud',
        name: 'crud',
        component: () => import('./pages/CrudDemo.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/ejercicio/detalles/:ejercicioId',
        name: 'Detalles_Ejercicio',
        component: () => import('./pages/Detalles_ejercicio.vue')
    },
    {
        path: '/ejercicios',
        name: 'ejercicios',
        component: () => import('./pages/Ejercicios.vue')
    },
    {
        path: '/peso',
        name: 'peso',
        component: () => import('./pages/PesoObjetivo.vue')
    },
    {
        path: '/alimentos/form',
        name: 'alimentos_form',
        component: FormularioAlimentos
    },
/*     {
        path: '/recetas/form',
        name: 'recetas_form',
        component: FormularioRecetas
    }, 
    {
        path: '/alimentos_recetas',
        name: 'selector_alimentos_recetas',
        component: SelectorFormularios
    },*/
    {
        path: '/ejercicios',
        name: 'ejercicios',
        component: () => import('./pages/Ejercicios.vue')
    },
    {
        path: '/administrar',
        name: 'administrar',
        component: () => import('./pages/PanelAdministracion.vue'),
    },
    {
        path: '/administrar_usuarios',
        name: 'administrar_usuarios',
        component: () => import('./pages/AdministrarUsuarios.vue')
    },
    {
        path: '/administrar_ejercicios',
        name: 'administrar_ejercicios',
        component: () => import('./pages/AdministrarEjercicios.vue')
    },
    {
        path: '/administrar_recetas',
        name: 'administrar_recetas',
        component: () => import('./pages/AdministrarRecetas.vue')
    },
    {
        path: '/administrar_alimentos',
        name: 'administrar_alimentos',
        component: () => import('./pages/AdministrarAlimentos.vue')
    },
    {
        path: '/add_usuario',
        name: 'add_usuario',
        component: () => import('./pages/AddUsuario.vue')
    },
    {
        path: '/add_ejercicio',
        name: 'add_ejercicio',
        component: () => import('./pages/AddEjercicio.vue')
    },
    {
        path: '/add_receta',
        name: 'add_receta',
        component: () => import('./pages/AddReceta.vue')
    },
    {
        path: '/add_alimento',
        name: 'add_alimento',
        component: () => import('./pages/AddAlimento.vue')
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

router.beforeEach((to, from, next) => {
    const publicPages = ['/', '/login'];
    const adminPages = ['/administrar','administrar_usuarios','administrar_ejercicios','administrar_recetas','administrar_alimentos'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = store.state.loggedIn;
    const adminRequired = adminPages.includes(to.path);

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }

    //darle un par de vueltas
    if (adminRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
