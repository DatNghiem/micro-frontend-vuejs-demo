// main.js của micro-app
import { mount } from './bootstrap';

// Kiểm tra sớm xem có eventBus không
if (window.rootEventBus) {
    console.log('🔍 Micro-app main.js: Root eventBus tồn tại');

    // Đăng ký sự kiện ngay lập tức nếu có thể
    const unsubscribe = window.rootEventBus.on('root:initialized', (data) => {
        console.log('📡 Micro-app nhận được sự kiện root:initialized:', data);
    });

    // Phát một event để thông báo micro-app đã bắt đầu tải
    window.rootEventBus.emit('micro-app:loading', {
        timestamp: Date.now()
    });
}

// Single-spa lifecycle hooks
export function bootstrap(props) {
    console.log('Micro-app bootstrap');
    return Promise.resolve();
}

export { mount };

export function unmount(props) {
    console.log('Micro-app unmount');
    return Promise.resolve();
}

// Nếu được gọi trực tiếp (không qua single-spa)
if (process.env.NODE_ENV === 'development') {
    // Không cần thêm code ở đây vì bootstrap.js đã xử lý mounting
    console.log('Micro-app đang chạy ở chế độ độc lập');
}