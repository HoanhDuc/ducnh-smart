<template>
  <div class="card-container p-2 relative">
    <div class="row justify-between">
      <div class="col-10 row" @click="goToDetailPage()">
        <div class="image col-4 w-1/3 my-auto rounded-lg">
          <img
            :src="
              user.avatar_url ||
              'https://bitsofco.de/content/images/2018/12/broken-1.png'
            "
            alt=""
            class="rounded-lg"
          />
        </div>
        <div
          class="user-info col-6 ml-3 py-2 font-jost overflow-hidden whitespace-nowrap"
        >
          <span class="mb-2 font-bold">
            <span class="text-red">{{ props.isNotSearch ? '' : route.query.name }}</span>
            {{ userNameDisplay }}
          </span>
          <span class="text-xs">{{
            displayFollowUser(detail?.followers || 0, "Followers")
          }}</span>
          <span class="text-xs">{{
            displayFollowUser(detail?.following || 0, "Followings")
          }}</span>
        </div>
      </div>
      <div class="py-2 flex flex-col absolute right-2">
        <span
          v-if="isFavorite"
          class="material-icons text-red text-sm"
          @click="onUnSetFavorite()"
        >
          favorite
        </span>
        <span
          v-else
          class="material-icons text-red text-sm"
          @click="onSetFavorite()"
        >
          favorite_border
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import userAPI, { IItemUser } from "@/api/user";
import { IUserDetail } from "@/typescript/User";
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const { fetchUserDetail } = userAPI();
const props = defineProps({
  user: {
    type: Object,
    default: () => {},
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  isNotSearch: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["setFavorite", "unSetFavorite", "goToDetail"]);
const route = useRoute();
const follower = ref("");
const following = ref("");
const detail = ref<IUserDetail>();

const userNameDisplay = computed(() => {
  if (props.isNotSearch) {
    return props.user.login;
  }
  return props.user.login
    .toLowerCase()
    .replace(route.query.name?.toString().toLowerCase(), "");
});
onMounted(async () => {
  detail.value = await fetchUserDetail(props.user.login);
});
const displayFollowUser = (followText: number, subText: string) => {
  if (followText >= 0) {
    if (followText > 1000) {
      return `${(followText / 1000).toFixed(1)}K ${subText}`;
    }
    return `${followText} ${subText}`;
  }
};
const onSetFavorite = () => {
  emit("setFavorite", props.user);
};
const onUnSetFavorite = () => {
  emit("unSetFavorite", props.user);
};
const goToDetailPage = () => {
  emit("goToDetail", detail.value);
};
</script>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "UserCard",
});
</script>

<style scoped lang="scss">
.card-container {
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  &:hover {
   background-color: rgb(238, 238, 238);
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
