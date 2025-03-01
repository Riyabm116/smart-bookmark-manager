<template>
  <header :class="mode">
    <div class="logo">
      <h1>Smart Bookmark Manager</h1>
    </div>
    <div class="controls">
      <input 
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)" 
        class="search-bar"
        type="text" 
        placeholder="Search Bookmarks" 
      />

      <button @click="searchBookmarks" class="search-btn">Search</button>

      <button @click="toggleForm" class="add-bookmark-btn">+</button>
      
      <button @click="toggleMode" class="mode-toggle-btn">
        {{ mode === 'light' ? 'Dark Mode' : 'Light Mode' }}
      </button>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    mode: String,
    searchQuery: String, 
    bookmarks: Array, 
  },
  emits: ['toggle-mode', 'toggle-form', 'update:searchQuery'],
  setup(props, { emit }) {
    const searchBookmarks = () => {
      if (!Array.isArray(props.bookmarks)) {
        console.error('Bookmarks are not defined or not an array');
        return;
      }
      if (props.searchQuery.trim() === '') {
        console.log('Search query is empty');
      } else {
        const filteredBookmarks = props.bookmarks.filter(bookmark => 
          bookmark.title.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
          bookmark.url.toLowerCase().includes(props.searchQuery.toLowerCase())
        );
        console.log('Filtered Bookmarks:', filteredBookmarks);
      }
    };

    const toggleMode = () => emit('toggle-mode');
    const toggleForm = () => emit('toggle-form');

    return { searchBookmarks, toggleMode, toggleForm };
  }
};
</script>

<style scoped>
header {
  padding: 1rem;
  background-color: var(--header-bg, #ffffff);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header.light {
  background-color: #ffffff;
  color: #000;
}

header.dark {
  background-color: #333333;
  color: #fff;
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
</style>
