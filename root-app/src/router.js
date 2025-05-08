import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';

const MicroApp1 = () => import('./components/MicroApp1Wrapper.vue');
const MicroApp2 = () => import('./components/MicroApp2Wrapper.vue');

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/micro-app-1',
        name: 'MicroApp1',
        component: MicroApp1
    },
    {
        path: '/micro-app-2',
        name: 'MicroApp2',
        component: MicroApp2
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;