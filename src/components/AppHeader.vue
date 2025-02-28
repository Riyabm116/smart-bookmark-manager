<template>
  <header :class="mode">
    <div class="logo">
      <h1>Smart Bookmark Manager</h1>
    </div>
    <!-- Controls for Dark Mode Toggle and Search -->
    <div class="controls">
      <!-- Search Input -->
      <input 
        v-model="searchQuery" 
        class="search-bar"
        type="text" 
        placeholder="Search Bookmarks" 
      />
      <button @click="searchBookmarks" class="search-btn">Search</button>
      
      <!-- Toggle Mode Button -->
      <button @click="toggleMode" class="mode-toggle-btn">
        {{ mode === 'light' ? 'Dark Mode' : 'Light Mode' }}
      </button>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'; // <-- Add this line

export default {
  props: {
    mode: String,  
  },
  emits: ['toggle-mode'],  
  setup(props, { emit }) {
    const searchQuery = ref('');
    
    const toggleMode = () => {
      emit('toggle-mode');
    };

    const searchBookmarks = () => {
      // Add functionality to search bookmarks
      console.log(searchQuery.value);
    };

    return { 
      toggleMode, 
      searchQuery, 
      searchBookmarks 
    };
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
</style>
