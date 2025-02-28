<template>
  <footer :class="mode">
    <p>&copy; 2025 Smart Bookmark Manager</p>
  </footer>
</template>

<script>
export default {
  props: {
    mode: String,
  }
};
</script>

<style scoped>
footer {
  text-align: center;
  padding: 1rem;
  background-color: var(--footer-bg, #f1f1f1);
  color: var(--footer-color, #000);
}

footer.light {
  background-color: #ffffff;
  color: #000;
}

footer.dark {
  background-color: #222222;
  color: #fff;
}
</style>

