import { createPinia, defineStore } from 'pinia';

export const pinia = createPinia();

export const useSharedStore = defineStore('shared', {
    state: () => ({
        user: null,
        isAuthenticated: false,
        notifications: [],
        appSettings: {
            theme: 'light',
            language: 'vi'
        }
    }),

    getters: {
        getUser: (state) => state.user,
        getNotifications: (state) => state.notifications,
        getTheme: (state) => state.appSettings.theme
    },

    actions: {
        setUser(user) {
            this.user = user;
            this.isAuthenticated = !!user;
        },

        logout() {
            this.user = null;
            this.isAuthenticated = false;
        },

        addNotification(notification) {
            this.notifications.push({
                id: Date.now(),
                timestamp: new Date().toISOString(),
                read: false,
                ...notification
            });
        },

        markNotificationAsRead(notificationId) {
            const notification = this.notifications.find(n => n.id === notificationId);
            if (notification) {
                notification.read = true;
            }
        },

        updateSettings(settings) {
            this.appSettings = {
                ...this.appSettings,
                ...settings
            };
        }
    }
});

export default pinia;