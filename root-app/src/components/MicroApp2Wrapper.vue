<template>
  <div class="micro-app-wrapper">
    <h2>Micro App 2 Container</h2>
    <div id="micro-app-2-container"></div>
  </div>
</template>

<script>
export default {
  name: 'MicroApp2Wrapper',
  async mounted() {
    try {
      // Dynamically import the remote MicroApp2
      const { mount } = await import('microApp2/MicroApp2');
      mount(document.getElementById('micro-app-2-container'));
    } catch (error) {
      console.error('Error loading Micro App 2:', error);
      document.getElementById('micro-app-2-container').innerHTML =
          '<p style="color: red;">Error loading Micro App 2. Make sure it is running on port 8082.</p>';
    }
  },
  unmounted() {
    // Cleanup if necessary when component is unmounted
    const container = document.getElementById('micro-app-2-container');
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