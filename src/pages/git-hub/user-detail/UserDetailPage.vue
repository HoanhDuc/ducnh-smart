<template>
  <div class="detail">
    <img src="@/assets/icon/home-icon.svg" alt="" class="mb-5" />
    <div class="user-info flex flex-col text-center">
      <img
        :src="userDetail.avatar_url"
        alt=""
        class="w-40 mx-auto rounded-full mb-2"
      />
      <span class="font-bold text-xl font-arsenal">
        {{ userDetail.name }}
      </span>
      <span class="text-xl">
        {{ userDetail.login }}
      </span>
      <div class="flex justify-center mb-2">
        <img src="@/assets/icon/location.svg" alt="" class="mr-1" />
        <span class="text-base">
          {{ userDetail.location }}
        </span>
      </div>
      <TabDetail :repositories="repos" :followers="followers" :followings="followings" />
    </div>
  </div>
</template>

<script setup lang="ts">
import userAPI from "@/api/user";
import { onMounted, ref } from "vue";
import useStoreGitHub from "@/store/git-hub";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import TabDetail from "@/components/git-hub/search/TabDetail.vue";
const { fetchUserDetail, fetchListUserFollows } = userAPI();

const useStoreGHub = useStoreGitHub();
const { userDetail } = storeToRefs(useStoreGitHub());
const route = useRoute();
const repos = ref([]);
const followers = ref([]);
const followings = ref([]);

onMounted(async () => {
  if (route.query.name && !Object.keys(userDetail.value).length) {
    const encode = encodeURIComponent(route.query.name?.toString());
    const detail = await fetchUserDetail(encode);
    useStoreGHub.setUserDetail(detail);
  }
  repos.value = await fetchListUserFollows(userDetail.value.repos_url);
  followers.value = await fetchListUserFollows(userDetail.value.followers_url);
  followings.value = await fetchListUserFollows(userDetail.value.following_url.replace('{/other_user}', ''));
});
</script>

<style scoped></style>
