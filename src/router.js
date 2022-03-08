import { createRouter, createWebHashHistory } from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import Ejercicio from './components/Ejercicio.vue';
import Comidas from './components/Comidas.vue';
import Perfil from './components/Perfil.vue';

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
        component: () => import('./pages/Login.vue')
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
