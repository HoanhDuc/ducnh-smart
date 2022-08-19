<template>
  <div>
    <Loading v-if="isLoading" />
    <div class="flex items-center justify-between mb-5">
      <p class="text-3xl font-bold font-jost">Search</p>
    </div>
    <q-input
      outlined
      v-model="searchValue"
      placeholder="Enter GitHub username, i.e. gaearon"
      @keyup="getListUser"
      class="mb-2"
    />
    <div class="search-item">
      <p class="text-sm font-jost">{{ totalSearch }} GitHub users found</p>
      <Empty
        v-if="!listUsers.length && !isLoading"
        class="mx-auto mt-32 w-3/5"
      />
      <div class="row justify-between">
        <div
          v-for="(user, index) in listUsers"
          :key="index"
          class="col-6 mb-2"
          @click="goToDetailPage(user.login)"
        >
          <user-card :user="user" />
        </div>
      </div>
    </div>
    <div class="text-center">
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-if="listUsers.length > 0"
          v-model="currentPage"
          color="black"
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
import UserCard from "@/components/git-hub/search/UserCard.vue";
import Loading from "@/components/common/Loading.vue";
import useFetchList from "@/api/user";
import { useDebounceFn } from "@vueuse/core";
import { ref } from "vue";
import { IItemUser } from "@api/user";
import { useRoute, useRouter } from "vue-router";
import Empty from "../../components/common/Empty.vue";

const searchValue = ref("");
const isLoading = ref(false);
const listUsers = ref<IItemUser[]>([]);
const currentPage = ref(1);
const totalSearch = ref(0);
const { fetchListUser } = useFetchList();
const router = useRouter();
const route = useRoute();

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
  }
};
const onChangePage = (page: string): void => {
  fetchList(searchValue.value, Number(page));
};
const totalPage = ref(0);
const getListUser = useDebounceFn(async () => {
  fetchList(searchValue.value, 1);
  updatePage();
}, 1000);
const updatePage = async () => {
  const data = await fetchListUser({ q: searchValue.value, page: 0 });
  totalPage.value = data?.totalItems / 12;
  totalSearch.value = data?.totalItems;
};
const goToDetailPage = (user_name: string) => {
  console.log(user_name);
};
</script>
<style scoped lang="scss">
.font-jost {
  font-family: Jost;
}
.col-6 {
  width: 48% !important;
}
::v-deep {
  .q-focus-helper {
    background: red !important;
  }
  .q-pagination {
    gap: 10px;
    padding: 4px;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 10%);
    .q-btn{
      &:hover{
        background-color: rgb(116, 255, 146);
      }
    }
  }
}
</style>
