import { createApp } from 'vue';
import App from './App.vue';

// Hàm để đảm bảo root eventBus đã được tải
function ensureRootEventBus(maxWaitTime = 5000) {
    return new Promise((resolve, reject) => {
        // Nếu eventBus đã tồn tại, trả về ngay lập tức
        if (window.rootEventBus && window.ROOT_EVENT_TYPES) {
            console.log('✅ Micro-app: Root eventBus đã tồn tại');
            return resolve({
                eventBus: window.rootEventBus,
                EVENT_TYPES: window.ROOT_EVENT_TYPES
            });
        }

        console.log('⏳ Micro-app: Chờ đợi root eventBus...');

        // Đặt timeout
        const timeoutId = setTimeout(() => {
            clearInterval(checkInterval);
            console.warn('⚠️ Micro-app: Không tìm thấy rootEventBus sau ' + maxWaitTime + 'ms');
            // Vẫn tiếp tục với giá trị null thay vì reject
            resolve({ eventBus: null, EVENT_TYPES: null });
        }, maxWaitTime);

        // Kiểm tra định kỳ
        const checkInterval = setInterval(() => {
            if (window.rootEventBus && window.ROOT_EVENT_TYPES) {
                clearTimeout(timeoutId);
                clearInterval(checkInterval);
                console.log('✅ Micro-app: Đã tìm thấy root eventBus sau khi chờ đợi');
                resolve({
                    eventBus: window.rootEventBus,
                    EVENT_TYPES: window.ROOT_EVENT_TYPES
                });
            }
        }, 100);
    });
}

// Function to mount the app
const mount = async (el) => {
    // Chờ và lấy eventBus từ root app
    const { eventBus, EVENT_TYPES } = await ensureRootEventBus();

    // Khởi tạo app
    const app = createApp(App);

    // Thêm eventBus vào app nếu có
    if (eventBus && EVENT_TYPES) {
        app.config.globalProperties.$rootEventBus = eventBus;
        app.config.globalProperties.$ROOT_EVENT_TYPES = EVENT_TYPES;

        // Test nhận event
        const unsubscribeTest = eventBus.on(EVENT_TYPES.TEST_EVENT, (data) => {
            console.log('📩 Micro-app nhận được TEST_EVENT:', data);
        });

        // Phát event để xác nhận micro-app đã khởi tạo
        eventBus.emit('micro-app:ready', {
            name: 'my-micro-app',
            timestamp: Date.now()
        });

        console.log('🔌 Micro-app: Kết nối với root eventBus thành công');
    } else {
        console.warn('⚠️ Micro-app: Không thể kết nối với root eventBus');
    }

    app.mount(el);

    return {
        unmount: () => {
            // Hủy đăng ký event listener nếu có
            if (eventBus && unsubscribeTest) {
                unsubscribeTest();
            }
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