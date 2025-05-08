// src/eventBus.js
export const EVENT_TYPES = {
    USER_LOGIN: 'user:login',
    USER_LOGOUT: 'user:logout',
    NOTIFICATION: 'app:notification',
    DATA_CHANGED: 'data:changed',
    NAVIGATION: 'app:navigation',
};

class EventBus {
    constructor() {
        this.events = {};
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
        return () => this.off(event, callback); // Return unsubscribe function
    }

    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }

    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }

    // Emit event once and remove all listeners
    once(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
            delete this.events[event];
        }
    }

    // Clear all events
    clear() {
        this.events = {};
    }
}

// Tạo và export một instance duy nhất
export const eventBus = new EventBus();

// Export mặc định để tiện import
export default eventBus;