<template>
  <div class="micro-app-wrapper">
    <h2>Micro App 1 Container</h2>
    <div id="micro-app-1-container"></div>
  </div>
</template>

<script>
export default {
  name: 'MicroApp1Wrapper',
  async mounted() {
    try {
      // Dynamically import the remote MicroApp1
      const { mount } = await import('microApp1/MicroApp1');
      mount(document.getElementById('micro-app-1-container'));
    } catch (error) {
      console.error('Error loading Micro App 1:', error);
      document.getElementById('micro-app-1-container').innerHTML =
          '<p style="color: red;">Error loading Micro App 1. Make sure it is running on port 8081.</p>';
    }
  },
  unmounted() {
    // Cleanup if necessary when component is unmounted
    const container = document.getElementById('micro-app-1-container');
    if (container) {
      container.innerHTML = '';
    }
  }
}
</script>

<style scoped>
.micro-app-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>