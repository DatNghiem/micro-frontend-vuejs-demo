<!-- src/components/EventTester.vue trong micro-app-2 -->
<template>
  <div class="event-tester">
    <h3>Test Event Bus từ Micro App 2</h3>
    <div class="form-group">
      <input v-model="message" placeholder="Nhập tin nhắn" />
      <button @click="sendEvent">Gửi Event</button>
    </div>

    <div class="events-log">
      <div class="log-header">
        <h4>Event Logs</h4>
        <button @click="clearLogs" class="clear-btn">Clear</button>
      </div>

      <div class="log-container">
        <div v-for="(entry, index) in eventLogs" :key="index"
             :class="['log-entry', entry.eventType]">
          <span class="timestamp">{{ entry.time }}</span>
          <span class="event-name">{{ entry.eventName }}</span>
          <div class="event-data">{{ entry.data }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { eventBus, EVENT_TYPES } from 'rootApp/eventBus';

export default {
  setup() {
    const message = ref('Hello từ Micro App 2');
    const eventLogs = ref([]);

    const formatTime = () => {
      const now = new Date();
      return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    };

    const logEvent = (eventName, data, eventType = 'received') => {
      eventLogs.value.unshift({
        time: formatTime(),
        eventName,
        data: typeof data === 'object' ? JSON.stringify(data) : data,
        eventType
      });
    };

    const sendEvent = () => {
      const payload = {
        from: 'micro-app-2',
        message: message.value,
        timestamp: Date.now()
      };

      try {
        eventBus.emit(EVENT_TYPES.TEST_EVENT, payload);
        logEvent(EVENT_TYPES.TEST_EVENT, payload, 'sent');
      } catch (error) {
        logEvent('ERROR', error.message, 'error');
      }
    };

    const handleTestEvent = (data) => {
      if (data.from !== 'micro-app-2') {
        logEvent(EVENT_TYPES.TEST_EVENT, data);
      }
    };

    const clearLogs = () => {
      eventLogs.value = [];
    };

    onMounted(() => {
      logEvent('INIT', 'EventTester component mounted', 'system');
      eventBus.on(EVENT_TYPES.TEST_EVENT, handleTestEvent);
    });

    onUnmounted(() => {
      eventBus.off(EVENT_TYPES.TEST_EVENT, handleTestEvent);
    });

    return {
      message,
      eventLogs,
      sendEvent,
      clearLogs
    };
  }
};
</script>

<style scoped>
.event-tester {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0069d9;
}

.events-log {
  background-color: #343a40;
  color: #f8f9fa;
  border-radius: 4px;
  overflow: hidden;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #212529;
}

.log-header h4 {
  margin: 0;
}

.clear-btn {
  background-color: #6c757d;
  font-size: 12px;
  padding: 4px 8px;
}

.log-container {
  max-height: 300px;
  overflow-y: auto;
  padding: 8px;
}

.log-entry {
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 13px;
}

.timestamp {
  color: #adb5bd;
  margin-right: 8px;
}

.event-name {
  font-weight: bold;
  margin-right: 8px;
}

.event-data {
  margin-top: 4px;
  word-break: break-all;
  white-space: pre-wrap;
}

.sent {
  background-color: rgba(40, 167, 69, 0.2);
}

.received {
  background-color: rgba(0, 123, 255, 0.2);
}

.error {
  background-color: rgba(220, 53, 69, 0.2);
}

.system {
  background-color: rgba(108, 117, 125, 0.2);
}
</style>