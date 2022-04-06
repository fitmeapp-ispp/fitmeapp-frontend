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
        path: '/comidas/:tipo',
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
        path: '/register',
        name: 'register',
        component: () => import('./components/Formulario_completo.vue')
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = store.state.loggedIn;

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
