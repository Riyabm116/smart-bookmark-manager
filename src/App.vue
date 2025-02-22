<template>
  <div class="app-container">
    <AppHeader />
    <div class="main-container">
      <router-view />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
  margin: 0;
  font-family: Arial, sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-container {
  flex: 1; /* Ensures main content expands to available space */
  padding: 20px;
  overflow-y: auto; /* Enables scrolling if content overflows */
  background-color: #f5f5f5;
}

/* Footer always at the bottom */
footer {
  margin-top: auto;
}
</style>
