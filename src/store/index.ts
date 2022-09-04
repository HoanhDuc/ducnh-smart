import { defineStore } from "pinia";
import { IUserGoogle } from '@/typescript/User'
const useStore = defineStore("root", {
    state: () => ({
        userGoogle: <IUserGoogle>{},
        isLogedIn: false
    }),
    getters: {
        getUserGoogle: (state) => state.userGoogle,
        getLogedIn: (state) => state.isLogedIn,
    },
    actions: {
        setUserGoogle(user: IUserGoogle) {
            this.userGoogle = user;
        },
        setLogedIn(isLogedIn : Boolean) {
            this.isLogedIn = true;
        },
    },
});

export default useStore;
