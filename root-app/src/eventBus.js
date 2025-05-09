// src/eventBus.js
export const EVENT_TYPES = {
    USER_LOGIN: 'user:login',
    USER_LOGOUT: 'user:logout',
    NOTIFICATION: 'app:notification',
    DATA_CHANGED: 'data:changed',
    NAVIGATION: 'app:navigation',
    TEST_EVENT: 'test:event', // Thêm TEST_EVENT vào đây
};

class EventBus {
    constructor() {
        this.events = {};
        console.log('🚀 Root EventBus initialized');
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
        console.log(`📥 ROOT: Listener added for "${event}"`);
        return () => this.off(event, callback); // Return unsubscribe function
    }

    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
            console.log(`🗑️ ROOT: Listener removed for "${event}"`);
        }
    }

    emit(event, data) {
        console.log(`📣 ROOT: Event emitted: "${event}"`, data || '');
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }

    once(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
            delete this.events[event];
        }
    }

    clear() {
        this.events = {};
    }
}

// Export lớp để các micro-app có thể sử dụng nếu cần
export { EventBus };

// Tạo và export một instance duy nhất
export const eventBus = new EventBus();

// Export mặc định để tiện import
export default eventBus;

// Thêm đoạn code này để các micro-app có thể truy cập
// Đặt eventBus và EVENT_TYPES lên window object
if (typeof window !== 'undefined') {
    window.rootEventBus = window.rootEventBus || eventBus;
    window.ROOT_EVENT_TYPES = EVENT_TYPES;
}