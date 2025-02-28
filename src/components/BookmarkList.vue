<template>
  <div class="bookmark-list">
    <h2>Your Bookmarks</h2>
    <div v-if="bookmarks.length === 0" class="empty-message">
      No bookmarks added yet.
    </div>
    <div v-else class="bookmarks-container">
      <div v-for="bookmark in bookmarks" :key="bookmark.id" class="bookmark-item">
        <div v-if="editingId === bookmark.id" class="edit-form">
          <input type="text" v-model="editedBookmark.title" placeholder="Title" required />
          <input type="url" v-model="editedBookmark.url" placeholder="URL" required />
          <input type="text" v-model="editedBookmark.tags" placeholder="Tags (comma-separated)" />
          <select v-model="editedBookmark.category">
            <option value="">Select Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>

          <div class="edit-actions">
            <button class="save-btn" @click="saveEdit(bookmark.id)">💾 Save</button>
            <button class="cancel-btn" @click="cancelEdit">❌ Cancel</button>
          </div>
        </div>

        <div v-else class="bookmark-info">
          <h3>{{ bookmark.title }}</h3>
          <a :href="bookmark.url" target="_blank">{{ bookmark.url }}</a>
          <p><strong>Tags:</strong> {{ bookmark.tags.join(", ") }}</p>
          <p><strong>Category:</strong> {{ bookmark.category }}</p>

          <div class="bookmark-actions">
            <button class="edit-btn" @click="startEdit(bookmark)">✎ Edit</button>
            <button class="delete-btn" @click="deleteBookmark(bookmark.id)">🗑️ Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    bookmarks: {
      type: Array,
      required: true,
      default: () => [] 
    }
  },
  emits: ["delete-bookmark", "update-bookmark", "update:bookmarks"],
  setup(props, { emit }) {
    const editingId = ref(null);
    const editedBookmark = ref({ title: "", url: "", tags: "", category: "" });

    const startEdit = (bookmark) => {
      editingId.value = bookmark.id;
      editedBookmark.value = {
        title: bookmark.title,
        url: bookmark.url,
        tags: bookmark.tags.join(", "),
        category: bookmark.category
      };
    };

    const saveEdit = (id) => {
      emit("update-bookmark", {
        id,
        title: editedBookmark.value.title,
        url: editedBookmark.value.url,
        tags: editedBookmark.value.tags.split(",").map((tag) => tag.trim()),
        category: editedBookmark.value.category
      });
      editingId.value = null;
    };

    const cancelEdit = () => {
      editingId.value = null;
    };

    const deleteBookmark = (id) => {
      emit("delete-bookmark", id);
    };

    return {
      editingId,
      editedBookmark,
      startEdit,
      saveEdit,
      cancelEdit,
      deleteBookmark
    };
  }
};
</script>

<style scoped>
.bookmark-list {
  max-width: 90%;
  margin: 2rem auto;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
}

.empty-message {
  text-align: center;
  font-style: italic;
  color: #555;
}

.bookmarks-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
}

.bookmark-item {
  flex: 0 0 calc(33.33% - 16px);
  max-width: calc(33.33% - 16px);
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.bookmark-item:hover {
  transform: scale(1.02);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.bookmark-info a {
  color: #333;
}

.bookmark-actions {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.edit-btn {
  background: #007bff;
  color: white;
  padding: 10px 16px;
  font-weight: bold;
  border-radius: 8px;
}

.delete-btn {
  background-color: #ff4d4d;
  color: white;
  padding: 10px 16px;
  font-weight: bold;
  border-radius: 8px;
}

.delete-btn:hover {
  background-color: #e60000;
  transform: scale(1.1);
}

.save-btn {
  background-color: #2ecc71;
  color: white;
  padding: 10px 16px;
  font-weight: bold;
  border-radius: 8px;
}

.cancel-btn {
  background-color: #e74c3c;
  color: white;
  padding: 10px 16px;
  font-weight: bold;
  border-radius: 8px;
}

button:hover {
  transform: scale(1.05);
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.edit-actions {
  display: flex;
  gap: 0.5rem;
}
</style>
