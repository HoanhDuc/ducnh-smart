<template>
  <div class="card-container p-2 relative">
    <div class="row justify-between">
      <div class="col-10 row" @click="goToDetailPage()">
        <div class="image col-4 w-1/3 my-auto rounded-lg">
          <img :src="
            user.avatar_url ||
            'https://bitsofco.de/content/images/2018/12/broken-1.png'
          " alt="" class="rounded-lg" />
        </div>
        <div class="user-info col-6 ml-3 py-2 font-jost overflow-hidden whitespace-nowrap">
          <span class="mb-2"><span class="font-bold text-red">{{ route.query.name }}</span>{{ userNameDisplay
          }}</span>
          <span class="text-xs ">{{ follower || 'Loading ...' }}</span>
          <span class="text-xs">{{ following || 'Loading ...' }}</span>
        </div>
      </div>
      <div class="py-2 flex flex-col absolute right-2">
        <span v-if="isFavorite" class="material-icons text-red text-sm" @click="onUnSetFavorite()"> favorite </span>
        <span v-else class="material-icons text-red text-sm" @click="onSetFavorite()"> favorite_border </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useFetchList, { IItemUser } from "@/api/user";
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const { fetchListUserFollows } = useFetchList();
const props = defineProps({
  user: {
    type: Object,
    default: () => { },
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['setFavorite', 'unSetFavorite', 'goToDetail'])
const route = useRoute();
const follower = ref('');
const following = ref('');
const userNameDisplay = computed(() => {
  return props.user.login.toLowerCase().replace(route.query.name?.toString().toLowerCase(), "");
});
onMounted(() => {
  onGetUserFollows(props.user);
})
const onGetUserFollows = async (user: any) => {
  const userUrls = {
    followers_url: user.followers_url,
    following_url: user.following_url.replace("{/other_user}", ""),
  };
  const totalFollowers =
    (await fetchListUserFollows(userUrls.followers_url) || 0) + ' Followers';
  const totalFollowing =
    (await fetchListUserFollows(userUrls.following_url) || 0) + ' Followings';
  follower.value = totalFollowers;
  following.value = totalFollowing;
};
const onSetFavorite = () => {
  emit('setFavorite', props.user)
}
const onUnSetFavorite = () => {
  emit('unSetFavorite', props.user)
}
const goToDetailPage = () => {
  emit('goToDetail', props.user)
}
</script>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name:'UserCard'
})
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
    max-width: 80px !important;
  }

  .user-info {
    display: flex;
    flex-direction: column;
  }
}
</style>
