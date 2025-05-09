<template>
  <div class="micro-app-2">
    <h3>Micro App 2 Content</h3>
    <p>This is another standalone micro frontend application built with Vue.js.</p>
    <weather-widget></weather-widget>
    <chart-component></chart-component>
    <event-tester></event-tester>
  </div>
</template>

<script>
import WeatherWidget from './components/WeatherWidget.vue';
import ChartComponent from './components/ChartComponent.vue';
import EventTester from "./components/EventTester.vue";

export default {
  name: 'MicroApp2',
  components: {
    EventTester,
    WeatherWidget,
    ChartComponent
  }
}
</script>

<style>
.micro-app-2 {
  background-color: #f6ffed;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>