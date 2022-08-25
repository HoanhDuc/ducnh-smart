<template>
  <div>
    <q-tabs
      v-model="tab"
      dense
      align="justify"
      active-color="blue"
      style="color: rgba(0, 0, 0, 0.54)"
      class="mb-4"
    >
      <q-tab name="repo" label="Repositories" class="col-3" />
      <q-tab name="follower" label="Followers" class="col-3" />
      <q-tab name="following" label="Followings" class="col-3" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated class="text-left">
      <q-tab-panel name="repo" class="row justify-between px-0">
        <div
          v-for="(repo, index) in repositories"
          :key="index"
          class="repo-block col-6 text-xs p-2 flex flex-col whitespace-nowrap overflow-hidden mb-2"
        >
          <span class="font-bold text-base mb-2">
            {{ repo.name }}
          </span>
          <span> Forks:{{ repo.forks }}</span>
          <span> Stars:{{ repo.stargazers_count }}</span>
        </div>
      </q-tab-panel>

      <q-tab-panel name="follower" class="row justify-between px-0">
        <div v-for="(user, index) in followers" :key="index" class="col-6 mb-2">
          <UserCard :user="user" isNotSearch />
        </div>
      </q-tab-panel>

      <q-tab-panel name="following" class="row justify-between px-0">
        <div v-for="(user, index) in followings" :key="index" class="col-6 mb-2">
          <UserCard :user="user" isNotSearch />
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { IItemUser } from "@/api/user";
import UserCard from "../card/UserCard.vue";
const tab = ref("repo");
interface IRepo {
  name: string;
  forks: number;
  stargazers_count: number;
}
interface Props {
  repositories: IRepo[];
  followers: IItemUser[];
  followings: IItemUser[];
}
const props = defineProps<Props>();
</script>
<style lang="scss" scoped>
.repo-block {
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
