<template>
  <li>
    <a :href="bookmark.url" target="_blank">{{ bookmark.title }}</a> 
    <span>({{ bookmark.category }})</span> 
    <span class="tags">{{ bookmark.tags.join(', ') }}</span>
    <button @click="$emit('delete')">❌</button>
  </li>
</template>

<script>
export default {
  props: ['bookmark']
};
</script>

<style scoped>
li {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.tags {
  font-size: 12px;
  color: gray;
}
button {
  cursor: pointer;
}
</style>
