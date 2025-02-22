<template>
  <header class="app-header">
    <h1>Smart Bookmark Manager</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/add">Add Bookmark</router-link>
      <router-link to="/settings">Settings</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style scoped>
.app-header {
  background-color: #007bff;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}
</style>
