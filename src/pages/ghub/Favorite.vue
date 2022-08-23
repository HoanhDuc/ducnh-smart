<template>
    <div>
        <div class="flex items-center justify-between mb-5">
            <p class="text-3xl font-bold font-jost">Favorite</p>
        </div>
        <div class="row justify-between">
            <div v-for="(user, index) in favoriteList" :key="index" class="col-6 mb-2"
                @click="goToDetailPage(user.login)">
                <user-card :user="user" @un-set-favorite="onUnSetFavorite" is-favorite />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useStoreGitHub from '@/store/git-hub';
import UserCard from '@/components/git-hub/search/UserCard.vue';
import { ref } from 'vue'
import { IItemUser } from '@/api/user'
const storeGitHub = useStoreGitHub()
const favoriteList = ref<IItemUser[]>(storeGitHub.favoriteList)
const goToDetailPage = (user_name: string) => {
    console.log(user_name);
};
const onUnSetFavorite = (user: IItemUser) => {
    favoriteList.value = favoriteList.value.filter(item => item.login !== user.login)
    window.localStorage.setItem("favorite", JSON.stringify(favoriteList.value))
    storeGitHub.setFavoriteList(favoriteList.value)
}
</script>

<style scoped lang="scss">
.font-jost {
    font-family: Jost;
}

.col-6 {
    width: 48% !important;
}
</style>
