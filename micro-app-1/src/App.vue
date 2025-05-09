<template>
  <div class="micro-app-1">
    <h3>Micro App 1 Content</h3>
    <p>This is a standalone micro frontend application built with Vue.js.</p>
    <counter-component></counter-component>
    <todo-list></todo-list>
    <test-event></test-event>
  </div>
</template>

<script>
import CounterComponent from './components/CounterComponent.vue';
import TodoList from './components/TodoList.vue';
import TestEvent from "./components/TestEvent.vue";

export default {
  name: 'MicroApp1',
  components: {
    TestEvent,
    CounterComponent,
    TodoList
  }
}
</script>

<style>
.micro-app-1 {
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>