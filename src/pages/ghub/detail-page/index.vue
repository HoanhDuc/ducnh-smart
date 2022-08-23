<template>
  <div class="detail">
    <img src="@/assets/home-icon.svg" alt="" class="mb-5" />
    <div class="user-info text-center">
      <img
        :src="userDetail.avatar_url"
        alt=""
        class="w-40 mx-auto rounded-full mb-2"
      />
      <span class="font-bold text-xl font-arsenal">
        {{ userDetail.name }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import useStoreGitHub from "@/store/git-hub";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const useStoreGHub = useStoreGitHub();
const { userDetail } = storeToRefs(useStoreGitHub());
const route = useRoute();

onMounted(() => {
  if (route.query.name) {
    useStoreGHub.fetchUserDetail(route.query.name?.toString());
  }
});
</script>

<style scoped></style>
