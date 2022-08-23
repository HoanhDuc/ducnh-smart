<template>
    <div class="detail">
        <img src="@/assets/home-icon.svg" alt="" class="mb-5" />
        <div class="user-info text-center">
            <img :src="user.avatar_url" alt="" class="w-40 mx-auto rounded-full mb-2" />
            <span class="font-bold text-xl font-arsenal">
                {{ user.login }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useStoreGitHub from '@/store/git-hub'
const useStoreGHub = useStoreGitHub()
const user = ref(useStoreGHub.userDetail)
</script>

<style scoped>
</style>
