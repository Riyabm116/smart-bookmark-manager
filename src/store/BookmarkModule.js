export default {
    namespaced: true,
    state() {
      return {
        bookmarks: [
          {
            id: "b1",
            title: "Google",
            url: "https://www.google.com",
            description: "The world's most popular search engine.",
            tags: ["search", "tech"],
          },
          {
            id: "b2",
            title: "Vue.js",
            url: "https://vuejs.org",
            description: "Progressive JavaScript framework for building UIs.",
            tags: ["javascript", "framework"],
          },
          {
            id: "b3",
            title: "GitHub",
            url: "https://github.com",
            description: "Platform for version control and collaborative software development.",
            tags: ["development", "collaboration"],
          },
        ],
      };
    },
    getters: {
      bookmarks(state) {
        return state.bookmarks;
      },
      bookmarkById(state) {
        return (id) => state.bookmarks.find((bookmark) => bookmark.id === id);
      },
    },
  };
  