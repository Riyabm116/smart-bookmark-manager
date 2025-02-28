<template>
  <div :class="mode" class="app-container">
    <AppHeader :mode="mode" @toggle-mode="toggleMode" />
    <div class="main-container">
      <CreateBookmark @create-bookmark="addBookmark" />
      <BookmarkList 
        :bookmarks="filteredBookmarks" 
        @delete-bookmark="deleteBookmark" 
        @update-bookmark="updateBookmark" 
      />
    </div>
    <AppFooter :mode="mode" />
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import CreateBookmark from "./components/CreateBookmark.vue";
import BookmarkList from "./components/BookmarkList.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    CreateBookmark,
    BookmarkList,
  },
  setup() {
    const mode = ref(localStorage.getItem("mode") || "light");
    const bookmarks = ref([]);
    const searchQuery = ref('');

    
    const filteredBookmarks = computed(() => {
      return bookmarks.value.filter(bookmark => {
        return (
          bookmark.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
          bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
        );
      });
    });

    
    onMounted(() => {
      const savedBookmarks = localStorage.getItem("bookmarks");
      if (savedBookmarks) {
        bookmarks.value = JSON.parse(savedBookmarks);
      }
    });

    
    watch(bookmarks, (newBookmarks) => {
      localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
    }, { deep: true });

    const addBookmark = (bookmark) => {
      bookmarks.value.push({
        id: Date.now(), 
        ...bookmark,
        tags: bookmark.tags.split(",").map(tag => tag.trim()),
      });
    };

    const deleteBookmark = (id) => {
      bookmarks.value = bookmarks.value.filter(bookmark => bookmark.id !== id);
    };

    const updateBookmark = (updatedBookmark) => {
      const index = bookmarks.value.findIndex(bookmark => bookmark.id === updatedBookmark.id);
      if (index !== -1) {
        bookmarks.value[index] = { ...updatedBookmark };
      }
    };

    const searchBookmarks = () => {};

    const toggleMode = () => {
      mode.value = mode.value === "light" ? "dark" : "light";
      localStorage.setItem("mode", mode.value);
    };

    return { 
      mode, 
      bookmarks, 
      addBookmark, 
      deleteBookmark, 
      updateBookmark, 
      searchQuery, 
      filteredBookmarks,
      searchBookmarks,
      toggleMode
    };
  }
};
</script>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
}

.app-container.light {
  background-color: #f0f0f0;
  color: #000;
}

.app-container.dark {
  background-color: #121212;
  color: #f5f5f5;
}



</style>