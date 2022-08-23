import userAPI from "@/api/user";
import { defineStore } from "pinia";
import { IItemUser } from "@/api/user";
import { UserDetail } from "@/typescript/User";
const { fetchUserDetail } = userAPI();
const useStoreGitHub = defineStore("root", {
  state: () => ({
    searchValue: "",
    favoriteList: <IItemUser[]>[],
    userDetail: <UserDetail>{},
  }),
  getters: {
    getFavoriteList: (state) => state.favoriteList,
    getSearchValue: (state) => state.searchValue,
    getUserDetail: (state) => state.userDetail,
  },
  actions: {
    setSearchValue(value: string) {
      this.searchValue = value;
    },
    setFavoriteList(favoriteList: IItemUser[]) {
      this.favoriteList = favoriteList;
    },
    async fetchUserDetail(userName: string) {
      try {
        const data = await fetchUserDetail(userName);
        this.userDetail = data
      } catch (err) {
        console.log("Can not fetch user detail", err);
      }
    },
  },
});

export default useStoreGitHub;
