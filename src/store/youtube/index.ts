import { defineStore } from "pinia";
const useStoreYoutube = defineStore("youtube", {
  state: () => ({
    searchText: <String>'',
  }),
  getters: {
    getsearchText: (state) => state.searchText,
  },
  actions: {
    setSearchText(text: string) {
      this.searchText = text;
    },
  },
});

export default useStoreYoutube;
