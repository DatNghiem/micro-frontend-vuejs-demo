// bootstrap.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// Import eventBus ở đây để đảm bảo nó được khởi tạo
import eventBus, { EVENT_TYPES } from './eventBus';

// Khởi tạo ứng dụng
const app = createApp(App);
app.use(router);

// Thêm eventBus vào instance Vue
app.config.globalProperties.$eventBus = eventBus;
app.config.globalProperties.$EVENT_TYPES = EVENT_TYPES;

// Debug: Kiểm tra eventBus đã được khởi tạo
console.log('🔄 EventBus initialized in bootstrap.js:', !!eventBus);

// Phát một event để kiểm tra
eventBus.emit(EVENT_TYPES.TEST_EVENT, { message: 'Root app initialized' });

// Mount app
app.mount('#app');