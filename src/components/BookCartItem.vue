<template>
  <li class="bookmark-cart-item">
    <div class="item__details">
      <h3>{{ title }}</h3>
      <div class="item__url">
        <span>URL:</span>
        <a :href="url" target="_blank">{{ url }}</a>
      </div>
      <div class="item__tags">
        <span>Tags:</span>
        <span v-for="(tag, index) in tags" :key="index" class="item__tag">{{ tag }}</span>
      </div>
    </div>
    <div class="item__actions">
      <button class="item__remove-btn" @click="removeBookmark">Remove</button>
    </div>
  </li>
</template>

<script>
export default {
  props: ["id", "title", "url", "tags"],
  methods: {
    removeBookmark() {
      this.$emit('remove', this.id);
    },
  },
};
</script>

<style scoped>
.bookmark-cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem auto;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #ffffff;
  max-width: 30rem;
}

.item__details {
  flex-grow: 1;
  text-align: left;
}

.item__details h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.item__url {
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0;
}

.item__tags {
  margin-top: 0.5rem;
}

.item__tag {
  display: inline-block;
  padding: 0.3rem 0.6rem;
  margin-right: 0.5rem;
  background-color: #0070f3;
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
}

.item__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.item__remove-btn {
  font: inherit;
  border: 1px solid #d32f2f;
  background-color: #d32f2f;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s, transform 0.2s;
}

.item__remove-btn:hover,
.item__remove-btn:active {
  background-color: #b71c1c;
  transform: scale(1.05);
}
</style>
