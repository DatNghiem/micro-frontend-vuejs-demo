import { createApp } from 'vue';
import App from './App.vue';

// Function to mount the app
const mount = (el) => {
    const app = createApp(App);
    app.mount(el);

    return {
        unmount: () => {
            app.unmount();
        }
    };
};

// Mount the app if it's in standalone mode
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#app');
    if (devRoot) {
        mount(devRoot);
    }
}

// Export the mount function for container app
export { mount };