<template>
  <section>
    <ul>
      <BookmarkItem 
        v-for="bookmark in bookmarks" 
        :key="bookmark.id" 
        :id="bookmark.id"
        :title="bookmark.title"
        :url="bookmark.url"
        :tags="bookmark.tags"
        :category="bookmark.category"
      />
    </ul>
  </section>
</template>

<script>
import BookmarkItem from "../components/bookmarks/BookmarkItem.vue";

export default {
  components: {
    BookmarkItem,
  },
  computed: {
    bookmarks() {
      return JSON.parse(localStorage.getItem("bookmarks")) || [];
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 40rem;
}
</style>
