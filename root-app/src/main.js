// main.js
// Import eventBus trước khi import bootstrap
import eventBus from './eventBus';

// Đảm bảo eventBus đã được khởi tạo và gắn vào window
if (typeof window !== 'undefined') {
    console.log('🌍 Confirming eventBus on window:', !!window.rootEventBus);
}

// Sau đó mới import bootstrap
import('./bootstrap.js');

// Đối với single-spa, có thể thêm các lifecycle hooks ở đây
export async function bootstrap(props) {
    console.log('Root app bootstrapped');
}

export async function mount(props) {
    console.log('Root app mounted');
    // Thông báo cho các micro-app khác biết root-app đã sẵn sàng
    if (window.rootEventBus) {
        window.rootEventBus.emit('root:ready', { timestamp: Date.now() });
    }
}

export async function unmount(props) {
    console.log('Root app unmounted');
}