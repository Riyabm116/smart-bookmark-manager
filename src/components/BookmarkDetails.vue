<template>
  <h1>Bookmark Details</h1>
  <router-link to="/" class="back-link">Back to Bookmark List</router-link>

  <div v-if="selectedBookmark" class="bookmark-detail-container">
    <h2 class="bookmark-title">{{ selectedBookmark.title }}</h2>

    <div class="bookmark-card">
      <div class="bookmark-info">
        <p><strong>URL:</strong>
          <a :href="selectedBookmark.url" target="_blank" class="bookmark-link">{{ selectedBookmark.url }}</a>
        </p>
        <p><strong>Category:</strong> {{ selectedBookmark.category }}</p>
        <p><strong>Tags:</strong> {{ selectedBookmark.tags.join(", ") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    selectedBookmark() {
      let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
      let selectedId = this.$route.params.id;
      return bookmarks.find((bookmark) => bookmark.id == selectedId) || null;
    },
  },
};
</script>

<style scoped>
.bookmark-detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  padding: 0 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.bookmark-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.bookmark-card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 750px;
  margin-top: 2rem;
}

.bookmark-info p {
  font-size: 1.1rem;
  color: #444;
  margin: 0.5rem 0;
}

.bookmark-info p strong {
  color: #333;
}

.bookmark-link {
  color: #007bff;
  text-decoration: none;
}

.bookmark-link:hover {
  text-decoration: underline;
}

.back-link {
  margin-top: 1.5rem;
  text-decoration: none;
  color: #007bff;
  font-size: 1.2rem;
  font-weight: bold;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #0056b3;
}
</style>
