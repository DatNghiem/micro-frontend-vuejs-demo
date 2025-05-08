<template>
  <div class="chart-component">
    <h4>Sales Chart</h4>
    <div class="chart-container">
      <div class="chart">
        <div
            v-for="(item, index) in chartData"
            :key="index"
            class="chart-bar"
            :style="{ height: `${item.value * 2}px`, backgroundColor: getBarColor(item.value) }"
        >
          <div class="bar-value">{{ item.value }}</div>
        </div>
      </div>
      <div class="chart-labels">
        <div
            v-for="(item, index) in chartData"
            :key="index"
            class="chart-label"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <div class="chart-actions">
      <button @click="refreshData">Refresh Data</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ChartComponent',
  setup() {
    const chartData = ref([
      { label: 'Jan', value: 42 },
      { label: 'Feb', value: 63 },
      { label: 'Mar', value: 38 },
      { label: 'Apr', value: 48 },
      { label: 'May', value: 75 },
      { label: 'Jun', value: 59 }
    ]);

    const getBarColor = (value) => {
      if (value >= 60) return '#52c41a'; // Green for high values
      if (value >= 40) return '#1890ff'; // Blue for medium values
      return '#f5222d'; // Red for low values
    };

    const refreshData = () => {
      // Generate random data between 30 and 80
      chartData.value = chartData.value.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 50) + 30
      }));
    };

    return { chartData, getBarColor, refreshData };
  }
}
</script>

<style scoped>
.chart-component {
  margin: 20px 0;
  padding: 15px;
  background-color: #e6f7ff;
  border-radius: 4px;
}

.chart-container {
  margin: 20px 0;
}

.chart {
  display: flex;
  align-items: flex-end;
  height: 200px;
  justify-content: space-around;
  padding: 0 10px;
}

.chart-bar {
  width: 40px;
  position: relative;
  transition: height 0.5s;
  border-radius: 4px 4px 0 0;
}

.bar-value {
  position: absolute;
  top: -20px;
  width: 100%;
  text-align: center;
  font-size: 12px;
}

.chart-labels {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.chart-label {
  width: 40px;
  text-align: center;
  font-size: 12px;
}

.chart-actions {
  text-align: center;
  margin-top: 15px;
}

button {
  padding: 6px 12px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #40a9ff;
}
</style>