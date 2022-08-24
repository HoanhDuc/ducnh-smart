<template>
  <div>
    <Loading v-if="isLoading" />
    <div class="flex items-center justify-between mb-2">
      <p class="text-3xl font-bold font-jost">Search</p>
    </div>
    <q-input
      outlined
      v-model="searchValue"
      placeholder="Enter GitHub username, i.e. gaearon"
      type="search"
      @keyup="getListUser"
      class="mb-2"
    />
    <div class="search-item">
      <p class="text-sm font-jost">{{ totalSearch }} GitHub users found</p>
      <GitHubNotify
        v-if="!searchValue && !isLoading && !route.query.name"
        class="mx-auto mt-32"
      />
      <div class="row justify-between min-w-">
        <div v-for="(user, index) in listUsers" :key="index" class="col-6">
          <user-card
            :user="user"
            @set-favorite="onSetFavorite"
            @un-set-favorite="onUnSetFavorite"
            :is-favorite="checkFavorite(user)"
            @go-to-detail="goToDetail"
          />
        </div>
      </div>
    </div>
    <div class="text-center">
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-if="totalPage > 1"
          v-model="currentPage"
          color="black"
          direction-links
          push
          :max="totalPage > 100 ? 80 : totalPage"
          :max-pages="5"
          :boundary-numbers="false"
          @update:model-value="onChangePage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserCard from "@/components/git-hub/card/UserCard.vue";
import Loading from "@/components/common/Loading.vue";
import useFetchList from "@/api/user";
import { useDebounceFn } from "@vueuse/core";
import { ref, onMounted, watch } from "vue";
import { IItemUser } from "@api/user";
import { useRoute, useRouter } from "vue-router";
import useStoreGitHub from "@/store/git-hub";
import GitHubNotify from "../../components/common/GitHubNotify.vue";
import { IUserDetail } from "@/typescript/User";

const storeGHub = useStoreGitHub();
const isLoading = ref(false);
const searchValue = ref(storeGHub.getSearchValue);
const favoriteList = ref<IItemUser[]>([]);
const listUsers = ref<IItemUser[]>([]);
const currentPage = ref(1);
const totalSearch = ref(0);
const { fetchListUser } = useFetchList();
const router = useRouter();
const route = useRoute();
const totalPage = ref(0);

onMounted(() => {
  const favoriteItems = window.localStorage.getItem("favorite");
  if (favoriteItems) {
    favoriteList.value = JSON.parse(favoriteItems);
    storeGHub.setFavoriteList(favoriteList.value);
  }
  if (searchValue.value || route.query.name) {
    if (route.query.name) {
      searchValue.value = route.query.name.toString();
      storeGHub.setSearchValue(searchValue.value);
    }
    fetchList(storeGHub.getSearchValue, 1);
    updatePage();
  }
});
watch(searchValue, (value: string) => {
  currentPage.value = 1
  if (!value) {
    listUsers.value = [];
    totalSearch.value = 0;
    totalPage.value = 0;
    storeGHub.setSearchValue(searchValue.value);
  }
});
const checkFavorite = (user: IItemUser) => {
  return Boolean(favoriteList.value.find((item) => item.login === user.login));
};
const fetchList = async (q: string, page: number) => {
  isLoading.value = true;
  listUsers.value = [];
  router.replace(`${route.path}?name=${searchValue.value}`);
  try {
    const data = await fetchListUser({ q, page });
    listUsers.value = data?.data || [];
    isLoading.value = false;
  } catch (err: any) {
    isLoading.value = false;
    totalSearch.value = 0;
    listUsers.value = [];
  }
};
const getListUser = useDebounceFn(async () => {
  if (searchValue.value) {
    fetchList(searchValue.value, 1);
    updatePage();
    storeGHub.setSearchValue(searchValue.value);
  }
}, 1000);
const onChangePage = (page: string): void => {
  fetchList(searchValue.value, Number(page));
};

const updatePage = async () => {
  const data = await fetchListUser({ q: searchValue.value, page: 0 });
  totalPage.value = data?.totalItems / 12;
  totalSearch.value = data?.totalItems;
};
const onSetFavorite = (user: IItemUser) => {
  favoriteList.value.push(user);
  window.localStorage.setItem("favorite", JSON.stringify(favoriteList.value));
  storeGHub.setFavoriteList(favoriteList.value);
};
const onUnSetFavorite = (user: IItemUser) => {
  favoriteList.value = favoriteList.value.filter(
    (item) => item.login !== user.login
  );
  window.localStorage.setItem("favorite", JSON.stringify(favoriteList.value));
  storeGHub.setFavoriteList(favoriteList.value);
};
const goToDetail = (userDetail: IUserDetail) => {
  storeGHub.setUserDetail(userDetail);
  router.push(`/search/detail?name=${userDetail.login}`);
};
</script>
<style scoped lang="scss">
.font-jost {
  font-family: Jost;
}
.search-item {
  min-height: 615px;
}
::v-deep {
  .q-focus-helper {
    background: red !important;
  }
  .q-pa-lg {
    padding: 0px;
    .q-pagination {
      gap: 10px;
      padding: 4px;
      .q-btn {
        &:hover {
          background-color: rgb(119, 119, 119);
          color: #fff !important;
        }
      }
    }
  }
}
</style>
