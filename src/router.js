import { createRouter, createWebHashHistory } from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import FormularioAlimentos from './components/alimentos/FormularioAlimentos.vue';
import FormularioRecetas from './components/alimentos/FormularioRecetas.vue';
import SelectorFormularios from './components/alimentos/SelectorFormularios.vue';

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
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
    {
        path: '/alimentos/form',
        name: 'alimentos_form',
        component: FormularioAlimentos
    },
    {
        path: '/recetas/form',
        name: 'recetas_form',
        component: FormularioRecetas
    },
    {
        path: '/alimentos_recetas',
        name: 'selector_alimentos_recetas',
        component: SelectorFormularios
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
