<template>
  <div class="app-container">
    <div class="header">
      <h1>Micro Frontends Demo</h1>
    </div>
    <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/micro-app-1">Micro App 1</router-link>
      <router-link to="/micro-app-2">Micro App 2</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  flex-grow: 1;
}
</style>