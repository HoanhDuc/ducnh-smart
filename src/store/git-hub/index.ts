import { defineStore } from "pinia";
import { IItemUser } from "@/api/user";
import { IUserDetail } from "@/typescript/User";
const useStoreGitHub = defineStore("root", {
  state: () => ({
    searchValue: "",
    favoriteList: <IItemUser[]>[],
    userDetail: <IUserDetail>{},
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
    setUserDetail(userDetail: IUserDetail) {
        this.userDetail = userDetail
    },
  },
});

export default useStoreGitHub;
