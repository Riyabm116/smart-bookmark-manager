<template>
    <div class="filter-bar">
      <label for="category-filter">Filter by Category</label>
      <select v-model="categoryFilter" id="category-filter">
        <option value="">All Categories</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        
      </select>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      categoryFilter: String,
    },
    emits: ['update:categoryFilter'],
  };
  </script>
  
  <style scoped>
  .filter-bar select {
    padding: 8px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  </style>
  