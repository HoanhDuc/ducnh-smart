import { defineStore } from "pinia";
import { IItemUser } from "@/api/user";
const useStoreGitHub = defineStore("root", {
    state: () => ({ searchValue: '', favoriteList: <IItemUser[]>([]), userDetail: <IItemUser>({}) }),
    getters: {
        getFavoriteList: (state) => state.favoriteList,
        getSearchValue: (state) => state.searchValue,
        getUserDetail: (state) => state.userDetail,
    },
    actions: {
        setSearchValue(value: string) {
            this.searchValue = value
        },
        setFavoriteList(favoriteList: IItemUser[]) {
            this.favoriteList = favoriteList
        },
        setUserDetail(user: IItemUser) {
            this.userDetail = user
        },
    },
});

export default useStoreGitHub;
