<template>
      <div :class="mode" class="app-container">
        <AppHeader 
          :mode="mode" 
          :searchQuery="searchQuery"
          @toggle-mode="toggleMode" 
          @toggle-form="toggleForm"
          @update:searchQuery="searchQuery = $event"
        />
        <div class="main-container">
         <CreateBookmark v-if="showForm" @create-bookmark="addBookmark" />
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
        const showForm = ref(false);
        const searchQuery = ref('');
    
        // Filtered bookmarks based on searchQuery
        const filteredBookmarks = computed(() => {
          if (!searchQuery.value.trim()) {
            return bookmarks.value;
          }
          return bookmarks.value.filter(bookmark => 
            bookmark.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            bookmark.url.toLowerCase().includes(searchQuery.value.toLowerCase()) || // Added URL search
            bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
          );
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
    
        const toggleMode = () => {
          mode.value = mode.value === "light" ? "dark" : "light";
          localStorage.setItem("mode", mode.value);
        };
    
        const toggleForm = () => {
          showForm.value = !showForm.value;
        };
    
        return { 
          mode, 
          bookmarks, 
          addBookmark, 
          deleteBookmark, 
          updateBookmark, 
          searchQuery, 
          filteredBookmarks,
          toggleMode,
          showForm, 
          toggleForm
        };
      }
    };
    </script>
    

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transition */
  margin: 0; /* Remove all margin from the app container */
  padding: 0; /* Remove all padding */
}

/* Light Mode Styles */
.app-container.light {
  background-color: #f0f0f0;
  color: #000;
}

.app-container.light header,
.app-container.light footer {
  background-color: #ffffff;
  color: #000;
}

/* Dark Mode Styles */
.app-container.dark {
  background-color: #121212;
  color: #f5f5f5;
}

.app-container.dark header,
.app-container.dark footer {
  background-color: #333333;
  color: #fff;
}

header {
  padding: 0.5rem; /* Reduced padding for header */
  margin: 0; /* Remove space around the header */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-bar {
  padding: 8px;
  font-size: 14px;
  width: 200px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.search-btn {
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
}

.search-btn:hover {
  background-color: #0056c1;
}

.mode-toggle-btn {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background-color: #0070f3;
  color: white;
  border-radius: 5px;
  font-size: 14px;
}

.mode-toggle-btn:hover {
  background-color: #0056c1;
}

.add-bookmark-btn {
  padding: 8px 15px;
  font-size: 18px;
  font-weight: bold;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.add-bookmark-btn:hover {
  background-color: #218838;
}


.main-container {
  margin: 0; 
  padding: 0; 
  flex-grow: 1; 
}


footer {
  padding: 0.5rem; 
  margin: 0; 
}
</style>
