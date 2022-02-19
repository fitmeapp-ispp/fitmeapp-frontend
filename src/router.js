import { createRouter, createWebHashHistory } from 'vue-router';
import Dashboard from './components/Dashboard.vue';

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
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
