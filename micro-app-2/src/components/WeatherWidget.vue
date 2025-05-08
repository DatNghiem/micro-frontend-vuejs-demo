<template>
  <div class="weather-widget">
    <h4>Weather Widget</h4>
    <div class="weather-card">
      <div class="weather-icon" :class="weatherData.type"></div>
      <div class="weather-info">
        <div class="location">{{ weatherData.location }}</div>
        <div class="temperature">{{ weatherData.temperature }}°C</div>
        <div class="condition">{{ weatherData.condition }}</div>
      </div>
    </div>
    <div class="forecast">
      <div v-for="(day, index) in weatherData.forecast" :key="index" class="forecast-day">
        <div class="day-name">{{ day.day }}</div>
        <div class="day-icon" :class="day.type"></div>
        <div class="day-temp">{{ day.high }}° / {{ day.low }}°</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'WeatherWidget',
  setup() {
    const weatherData = reactive({
      location: 'Hanoi, Vietnam',
      temperature: 28,
      condition: 'Partly Cloudy',
      type: 'partly-cloudy',
      forecast: [
        { day: 'Mon', type: 'sunny', high: 30, low: 22 },
        { day: 'Tue', type: 'partly-cloudy', high: 28, low: 21 },
        { day: 'Wed', type: 'rainy', high: 25, low: 20 },
        { day: 'Thu', type: 'sunny', high: 29, low: 22 },
        { day: 'Fri', type: 'partly-cloudy', high: 27, low: 21 }
      ]
    });

    return { weatherData };
  }
}
</script>

<style scoped>
.weather-widget {
  margin: 20px 0;
  padding: 15px;
  background-color: #e6f7ff;
  border-radius: 4px;
}

.weather-card {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.weather-icon {
  width: 60px;
  height: 60px;
  margin-right: 15px;
  border-radius: 50%;
}

.weather-icon.sunny {
  background-color: #ffec3d;
}

.weather-icon.partly-cloudy {
  background: linear-gradient(to bottom right, #ffec3d 50%, #d9d9d9 50%);
}

.weather-icon.cloudy {
  background-color: #d9d9d9;
}

.weather-icon.rainy {
  background-color: #91d5ff;
}

.weather-info {
  flex-grow: 1;
}

.location {
  font-size: 18px;
  font-weight: bold;
}

.temperature {
  font-size: 24px;
  margin: 5px 0;
}

.condition {
  font-size: 14px;
  color: #666;
}

.forecast {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.forecast-day {
  text-align: center;
  flex: 1;
}

.day-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.day-icon {
  width: 30px;
  height: 30px;
  margin: 0 auto 5px;
  border-radius: 50%;
}

.day-icon.sunny {
  background-color: #ffec3d;
}

.day-icon.partly-cloudy {
  background: linear-gradient(to bottom right, #ffec3d 50%, #d9d9d9 50%);
}

.day-icon.cloudy {
  background-color: #d9d9d9;
}

.day-icon.rainy {
  background-color: #91d5ff;
}

.day-temp {
  font-size: 14px;
}
</style>