export default {
    namespaced: true,
    state() {
      return {
        items: [],
        totalBookmarks: 0,
        qty: 0,
      };
    },
    mutations: {
      addBookmarkToList(state, payload) {
        const bookmarkData = payload;
        const bookmarkInListIndex = state.items.findIndex(
          (bookmark) => bookmark.id === bookmarkData.id
        );
        
        if (bookmarkInListIndex >= 0) {
          // Update the existing bookmark data if needed
          state.items[bookmarkInListIndex].qty++;
        } else {
          // Add a new bookmark if it doesn't exist already
          const newBookmark = {
            id: bookmarkData.id,
            title: bookmarkData.title,
            url: bookmarkData.url,
            tags: bookmarkData.tags,
            qty: 1,
          };
          state.items.push(newBookmark);
        }
        state.qty++;
        state.totalBookmarks++;
      },
  
      removeBookmarkFromList(state, payload) {
        const bookmarkIndex = state.items.findIndex(
          (bookmark) => bookmark.id === payload.id
        );
        if (bookmarkIndex >= 0) {
          state.items.splice(bookmarkIndex, 1);
          state.qty--;
          state.totalBookmarks--;
        }
      },
    },
    actions: {
      addToBookmarkList({ commit, rootGetters }, payload) {
        const bookmarkId = payload.id;
        const allBookmarks = rootGetters["bookmarks/bookmarks"];
        const foundBookmark = allBookmarks.find((bookmark) => bookmark.id === bookmarkId);
        if (foundBookmark) {
          commit("addBookmarkToList", foundBookmark);
        }
      },
  
      removeFromBookmarkList({ commit }, payload) {
        commit("removeBookmarkFromList", payload);
      },
    },
    getters: {
      getBookmarkCount(state) {
        return state.qty;
      },
      getTotalBookmarks(state) {
        return state.totalBookmarks;
      },
      getAllBookmarks(state) {
        return state.items;
      },
    },
  };
  