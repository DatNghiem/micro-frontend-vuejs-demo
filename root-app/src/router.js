import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import EventMonitor from "./components/EventMonitor.vue";

const MicroApp1 = () => import('./components/MicroApp1Wrapper.vue');
const MicroApp2 = () => import('./components/MicroApp2Wrapper.vue');
const TestEvent1 = () => import('microApp1/TestEvent');
const EventTester2 = () => import('microApp2/EventTester');

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
    },
    {
        path: '/event-monitor',
        name: 'EventMonitor',
        component: EventMonitor
    },
    {
        path: '/test-event-1',
        name: 'TestEvent1',
        component: TestEvent1
    },
    {
        path: '/event-tester-2',
        name: 'EventTester2',
        component: EventTester2
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;