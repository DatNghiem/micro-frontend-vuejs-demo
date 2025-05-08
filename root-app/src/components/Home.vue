<template>
  <div class="home">
    <h2>Root App - Home Page</h2>
    <p>Welcome to the Micro Frontend Demo application. This is the main application that hosts multiple micro frontends.</p>
    <p>Use the navigation above to visit the different micro apps.</p>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>