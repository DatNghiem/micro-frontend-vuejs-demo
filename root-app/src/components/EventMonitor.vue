<template>
  <div class="event-monitor">
    <div class="header">
      <h3>Root App Event Monitor</h3>
      <div class="actions">
        <button @click="sendTestEvent" class="send-btn">Gửi Test Event</button>
        <button @click="clearEvents" class="clear-btn">Clear Events</button>
      </div>
    </div>

    <div class="event-container">
      <table>
        <thead>
        <tr>
          <th>Thời gian</th>
          <th>Loại</th>
          <th>Sự kiện</th>
          <th>Dữ liệu</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(event, index) in events" :key="index" :class="event.type">
          <td>{{ event.time }}</td>
          <td>{{ event.type }}</td>
          <td>{{ event.name }}</td>
          <td class="data">{{ event.data }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { eventBus, EVENT_TYPES } from '../eventBus';

export default {
  setup() {
    const events = ref([]);
    // Lưu trữ các hàm unsubscribe để dọn dẹp sau này
    const unsubscribeFunctions = ref([]);

    // Định dạng thời gian
    const getFormattedTime = () => {
      const now = new Date();
      return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;
    };

    // Ghi lại event
    const recordEvent = (name, data, type) => {
      events.value.unshift({
        time: getFormattedTime(),
        name,
        data: JSON.stringify(data || {}),
        type
      });

      // Giới hạn số lượng events hiển thị
      if (events.value.length > 100) {
        events.value.pop();
      }
    };

    // Bắt tất cả các sự kiện
    const setupEventListeners = () => {
      // Bắt các sự kiện
      Object.values(EVENT_TYPES).forEach(eventType => {
        const unsubscribe = eventBus.on(eventType, (data) => {
          recordEvent(eventType, data, 'received');
        });

        // Lưu hàm unsubscribe để dọn dẹp khi unmount
        unsubscribeFunctions.value.push(unsubscribe);
      });
    };

    // Gửi test event từ root app
    const sendTestEvent = () => {
      const data = {
        from: 'root-app',
        message: 'Test message from Root App',
        timestamp: Date.now()
      };
      eventBus.emit(EVENT_TYPES.TEST_EVENT, data);
      recordEvent(EVENT_TYPES.TEST_EVENT, data, 'sent');
    };

    // Xóa tất cả events
    const clearEvents = () => {
      events.value = [];
    };

    // Setup khi component được mount
    onMounted(() => {
      recordEvent('MONITOR_INIT', { status: 'EventMonitor initialized' }, 'system');
      setupEventListeners();

      // Ghi log để xác nhận eventBus là global
      console.log('Root App Event Monitor mounted - EventBus is global:', window.rootEventBus === eventBus);
    });

    // Dọn dẹp khi component unmount
    onUnmounted(() => {
      // Hủy đăng ký tất cả các sự kiện
      unsubscribeFunctions.value.forEach(unsubscribe => unsubscribe());
      recordEvent('MONITOR_DESTROY', { status: 'EventMonitor destroyed' }, 'system');
    });

    return {
      events,
      sendTestEvent,
      clearEvents
    };
  }
};
</script>

<style scoped>
.event-monitor {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin: 20px 0;
}

.header {
  background-color: #f3f4f6;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d1d5db;
}

.header h3 {
  margin: 0;
  color: #111827;
}

.actions {
  display: flex;
  gap: 8px;
}

button {
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  cursor: pointer;
}

.send-btn {
  background-color: #3b82f6;
  color: white;
}

.clear-btn {
  background-color: #6b7280;
  color: white;
}

.event-container {
  max-height: 400px;
  overflow-y: auto;
  background-color: #ffffff;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
}

th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.data {
  font-family: monospace;
  word-break: break-all;
  max-width: 300px;
}

tr.received {
  background-color: rgba(59, 130, 246, 0.05);
}

tr.sent {
  background-color: rgba(16, 185, 129, 0.05);
}

tr.system {
  background-color: rgba(107, 114, 128, 0.05);
}
</style>