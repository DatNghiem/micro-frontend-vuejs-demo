<!-- src/components/TestEvent.vue trong micro-app-1 -->
<template>
  <div class="test-panel">
    <h3>Test Event Bus từ Micro App 1</h3>
    <div class="connection-status" :class="isConnected ? 'connected' : 'disconnected'">
      {{ isConnected ? '✅ Đã kết nối với Root EventBus' : '❌ Chưa kết nối với Root EventBus' }}
    </div>

    <div class="controls">
      <input v-model="message" placeholder="Nhập nội dung tin nhắn" :disabled="!isConnected" />
      <button @click="sendTestEvent" class="send-btn" :disabled="!isConnected">Gửi Event</button>
      <button @click="checkConnection" class="check-btn">Kiểm tra kết nối</button>
    </div>

    <div class="event-log">
      <h4>Log sự kiện:</h4>
      <div v-if="logs.length === 0" class="no-logs">
        Chưa có log nào
      </div>
      <ul v-else>
        <li v-for="(log, index) in logs" :key="index" :class="log.type">
          {{ log.time }} - {{ log.message }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const message = ref('Hello từ Micro App 1');
    const logs = ref([]);
    const isConnected = ref(false);

    // Lưu trữ tham chiếu đến eventBus và EVENT_TYPES
    const rootEventBus = ref(null);
    const rootEventTypes = ref(null);

    // Lưu trữ hàm unsubscribe để dọn dẹp khi unmount
    let unsubscribe = null;

    const addLog = (message, type = 'info') => {
      const now = new Date();
      const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      logs.value.unshift({
        time: timeStr,
        message,
        type
      });

      // Giới hạn số lượng log
      if (logs.value.length > 50) {
        logs.value.pop();
      }
    };

    // Kết nối với Root EventBus
    const connectToRootEventBus = () => {
      if (window.rootEventBus && window.ROOT_EVENT_TYPES) {
        rootEventBus.value = window.rootEventBus;
        rootEventTypes.value = window.ROOT_EVENT_TYPES;
        isConnected.value = true;

        addLog('Đã kết nối thành công với Root EventBus', 'success');

        // Đăng ký lắng nghe sự kiện TEST_EVENT
        try {
          unsubscribe = rootEventBus.value.on(rootEventTypes.value.TEST_EVENT, handleTestEvent);
          addLog('Đã đăng ký lắng nghe sự kiện TEST_EVENT', 'info');
        } catch (error) {
          addLog(`Lỗi khi đăng ký sự kiện: ${error.message}`, 'error');
          console.error('Error registering event:', error);
        }

        return true;
      }

      addLog('Không tìm thấy Root EventBus trên window object', 'error');
      isConnected.value = false;
      return false;
    };

    // Kiểm tra kết nối với Root EventBus
    const checkConnection = () => {
      if (isConnected.value && rootEventBus.value) {
        addLog('EventBus kết nối đang hoạt động', 'success');
      } else {
        addLog('Đang thử kết nối lại với Root EventBus...', 'warning');

        // Thử kết nối lại
        if (connectToRootEventBus()) {
          addLog('Kết nối lại thành công!', 'success');
        } else {
          addLog('Không thể kết nối với Root EventBus. Thử lại sau 1 giây...', 'warning');

          // Thử kết nối lại sau 1 giây
          setTimeout(() => {
            if (connectToRootEventBus()) {
              addLog('Kết nối lại thành công sau khi chờ!', 'success');
            } else {
              addLog('Không thể kết nối với Root EventBus sau nhiều lần thử', 'error');
            }
          }, 1000);
        }
      }
    };

    const sendTestEvent = () => {
      if (!isConnected.value || !rootEventBus.value || !rootEventTypes.value) {
        addLog('Không thể gửi event: EventBus chưa được kết nối', 'error');
        return;
      }

      try {
        const eventData = {
          from: 'micro-app-1',
          message: message.value,
          timestamp: Date.now()
        };

        rootEventBus.value.emit(rootEventTypes.value.TEST_EVENT, eventData);
        addLog(`Event đã được gửi: ${message.value}`, 'sent');
      } catch (error) {
        addLog(`Lỗi khi gửi event: ${error.message}`, 'error');
        console.error('Error sending event:', error);
      }
    };

    // Handler cho sự kiện nhận được từ các app khác
    const handleTestEvent = (data) => {
      if (!data || typeof data !== 'object') {
        addLog(`Đã nhận event không hợp lệ`, 'warning');
        return;
      }

      if (data.from !== 'micro-app-1') {
        addLog(`Đã nhận: ${data.message} từ ${data.from}`, 'received');
      }
    };

    onMounted(() => {
      addLog('Component Test Event được khởi tạo', 'info');

      // Kết nối với Root EventBus
      if (!connectToRootEventBus()) {
        addLog('Thử kết nối lại sau 1 giây...', 'warning');

        // Thử kết nối lại sau 1 giây
        setTimeout(connectToRootEventBus, 1000);
      }
    });

    onUnmounted(() => {
      // Hủy đăng ký lắng nghe sự kiện khi component unmount
      if (unsubscribe && typeof unsubscribe === 'function') {
        try {
          unsubscribe();
          addLog('Đã hủy đăng ký lắng nghe sự kiện', 'info');
        } catch (error) {
          console.error('Lỗi khi hủy đăng ký sự kiện:', error);
        }
      }

      addLog('Component đã unmount', 'info');
    });

    return {
      message,
      logs,
      isConnected,
      sendTestEvent,
      checkConnection
    };
  }
};
</script>

<style scoped>
.test-panel {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin: 15px 0;
  background-color: #f9f9f9;
}

.connection-status {
  margin-bottom: 15px;
  padding: 8px;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
}

.connected {
  background-color: #d4edda;
  color: #155724;
}

.disconnected {
  background-color: #f8d7da;
  color: #721c24;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn {
  background-color: #4CAF50;
  color: white;
}

.check-btn {
  background-color: #007bff;
  color: white;
}

.event-log {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  max-height: 300px;
  overflow-y: auto;
}

.event-log h4 {
  margin-top: 0;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
}

.no-logs {
  color: #888;
  font-style: italic;
  text-align: center;
  padding: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 8px;
  border-bottom: 1px dotted #ddd;
  line-height: 1.4;
}

li:last-child {
  border-bottom: none;
}

.info {
  color: #0c5460;
}

.success {
  color: #155724;
  background-color: rgba(40, 167, 69, 0.05);
}

.warning {
  color: #856404;
  background-color: rgba(255, 193, 7, 0.05);
}

.sent {
  color: #155724;
  background-color: rgba(0, 128, 0, 0.05);
}

.received {
  color: #004085;
  background-color: rgba(0, 0, 255, 0.05);
}

.error {
  color: #721c24;
  background-color: rgba(255, 0, 0, 0.05);
}
</style>