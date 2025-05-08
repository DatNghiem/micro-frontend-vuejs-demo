<template>
  <div class="counter-component">
    <h4>Counter Component</h4>
    <p>Current count: {{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CounterComponent',
  setup() {
    const count = ref(0);

    const increment = () => {
      count.value++;
    };

    const decrement = () => {
      count.value--;
    };

    return { count, increment, decrement };
  }
}
</script>

<style scoped>
.counter-component {
  margin: 20px 0;
  padding: 15px;
  background-color: #e6f7ff;
  border-radius: 4px;
}

button {
  margin: 0 5px;
  padding: 5px 10px;
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