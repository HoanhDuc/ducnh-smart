<template>
  <div class="card-container p-2">
    <div class="row justify-between">
      <div class="image col-4 rounded-lg">
        <img
          :src="
            user.avatar_url ||
            'https://bitsofco.de/content/images/2018/12/broken-1.png'
          "
          alt=""
          class="rounded-lg"
        />
      </div>
      <div class="user-info col-6 ml-3 py-2 font-jost overflow-hidden">
        <span class="mb-2"
          ><span class="font-bold">{{ route.query.name }}</span
          >{{ userNameDisplay }}</span
        >
        <span class="text-xs">{{ `${follower} Followers` }}</span>
        <span class="text-xs">{{ `${following} Followings` }}</span>
      </div>
      <div class="p-2 flex flex-col">
        <span class="material-icons text-red text-sm"> favorite_border </span>
        <span class="material-icons text-red text-sm"> favorite </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useFetchList from "@/api/user";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
const { fetchListUserFollows } = useFetchList();
const props = defineProps({
  user: {
    type: Object,
    default: () => {},
  },
});
const route = useRoute();
const follower = ref(0);
const following = ref(0);
const userNameDisplay = computed(() => {
  return props.user.login.toLowerCase().replace(route.query.name, "");
});
watch(
  () => props.user,
  (value) => {
    onGetUserFollows(value);
  }
);

const onGetUserFollows = async (user: any) => {
  const userUrls = {
    followers_url: user.followers_url,
    following_url: user.following_url.replace("{/other_user}", ""),
  };
  const totalFollowers =
    (await fetchListUserFollows(userUrls.followers_url)) || 0;
  const totalFollowing =
    (await fetchListUserFollows(userUrls.following_url)) || 0;
  follower.value = totalFollowers;
  following.value = totalFollowing;
};
</script>

<style scoped lang="scss">
.card-container {
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  &:hover {
    transform: scale(1.1);
    transition: ease-in-out 0.2s;
  }
  .image {
    width: 80px !important;
  }
  .user-info {
    display: flex;
    flex-direction: column;
  }
}
</style>
