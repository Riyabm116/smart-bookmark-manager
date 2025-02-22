<template>
  <li class="bookmark">
    <div class="bookmark__data">
      <div class="bookmark__text">
        <router-link :to="`/bookmarks/${id}`">
          <h3>{{ title }}</h3>
        </router-link>
        <div class="bookmark__tags">
          <span v-for="(tag, index) in tags" :key="index" class="bookmark__tag">{{ tag }}</span>
        </div>
        <p class="bookmark__description">{{ description }}</p>
      </div>
    </div>
    
    <div class="bookmark__actions">
      <button @click="editBookmark">Edit</button>
      <button @click="deleteBookmark">Delete</button>
    </div>
  </li>
</template>

<script>
export default {
  props: ["id", "title", "url", "description", "tags"],
  methods: {
    editBookmark() {
      this.$router.push(`/edit-bookmark/${this.id}`);
    },
    deleteBookmark() {
      if (confirm("Are you sure you want to delete this bookmark?")) {
        let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        let updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== this.id);
        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
        this.$router.push("/"); // Navigate back to the bookmark list
      }
    }
  }
};
</script>

<style scoped>
/* Base Styles for the Bookmark Item */
.bookmark {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fdfdfd;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  max-width: 30rem;
  margin: 1.5rem auto;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.bookmark:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Data Section Styling */
.bookmark__data {
  width: 100%;
}

.bookmark__text {
  margin-bottom: 1rem;
}

.bookmark__text h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #333;
  font-weight: 600;
}

.bookmark__tags {
  margin: 0.5rem 0;
}

.bookmark__tag {
  background-color: #0070f3;
  color: white;
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  font-size: 0.9rem;
  margin-right: 0.5rem;
}

.bookmark__description {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
  margin: 0.5rem 0;
}

/* Action Buttons */
.bookmark__actions {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  width: 100%;
}

button {
  font: inherit;
  cursor: pointer;
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover,
button:active {
  background-color: #0056c1;
  transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 768px) {
  .bookmark__data {
    flex-direction: column;
    align-items: flex-start;
  }

  .bookmark__actions {
    justify-content: center;
  }
}
</style>
