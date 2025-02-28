<template>
  <div class="bookmark-form-container">
    <div class="bookmark-form">
      <h2>Add New Bookmark</h2>
      <form @submit.prevent="submitBookmark">
        <div class="form-group">
          <label for="title">Title</label>
          <input v-model="bookmark.title" type="text" id="title" />
        </div>
        <div class="form-group">
          <label for="url">URL</label>
          <input v-model="bookmark.url" type="url" id="url" />
        </div>
        <div class="form-group">
          <label for="tags">Tags</label>
          <input v-model="bookmark.tags" type="text" id="tags" />
        </div>
        <div class="form-group">
          <label for="category">Category</label>
          <select v-model="bookmark.category" id="category">
            <option value="">Select Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="button-group">
          <button type="submit" class="add-button">Add</button>
          <button @click.prevent="saveBookmark" class="save-button">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookmark: {
        title: '',
        url: '',
        tags: '',
        category: '',
      },
    };
  },
  methods: {
    submitBookmark() {
      this.$emit('create-bookmark', this.bookmark);
      this.clearForm();
    },
    saveBookmark() {
      this.$emit('create-bookmark', this.bookmark);
      this.clearForm();
    },
    clearForm() {
      this.bookmark = { title: '', url: '', tags: '', category: '' };
    }
  }
};
</script>

<style scoped>
.bookmark-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  margin: auto;
}

.bookmark-form {
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  color: black;
  width: 100%;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input, select {
  padding: 10px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  outline: none;
}

input:focus, select:focus {
  border: 2px solid #0070f3;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

button {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-button {
  background: #0070f3;
  color: white;
}

.add-button:hover {
  background: #0056c1;
}

.save-button {
  background: #28a745;
  color: white;
}

.save-button:hover {
  background: #218838;
}
</style>
