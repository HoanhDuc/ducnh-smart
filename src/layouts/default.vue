<template>
  <q-layout view="hHh Lpr lff" style="height: 200px">
    <q-header elevated class="bg-black">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>DucNH</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      :width="200"
      :breakpoint="500"
      overlay
      bordered
      class="bg-grey-3"
    >
      <q-scroll-area class="fit text-base">
        <q-list v-model="itemList">
          {{ itemList }}
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item-section avatar class="p-0">
              <q-expansion-item
                v-if="menuItem.subItem"
                expand-separator
                class="w-full"
              >
                <template v-slot:header>
                  <div class="flex items-center">
                    <img :src="menuItem.icon" alt="" />
                    <!-- <span> {{ menuItem.label }}</span> -->
                  </div>
                </template>
                <router-link
                  v-for="(sub, indexSub) in menuItem.subItem"
                  :key="indexSub"
                  class="p-2 ml-6 flex items-center cursor-pointer hover:bg-grey-100"
                  :to="sub.to"
                >
                  <span class="material-icons mr-2">
                    {{ sub.icon }}
                  </span>

                  <span>
                    {{ sub.label }}
                  </span>
                </router-link>
              </q-expansion-item>
              <q-item clickable v-else class="w-full items-center">
                <q-icon :name="menuItem.icon" class="mr-2" />
                {{ menuItem.label }}
              </q-item>
            </q-item-section>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <q-page padding class="p-0">
        <router-view></router-view>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ref } from "vue";

const menuList = [
  {
    icon: "https://brademar.com/wp-content/uploads/2022/05/GitHub-Logo-PNG-2013-%E2%80%93-Now-3.png",
    label: "GitHub API",
    subItem: [
      {
        icon: "search",
        label: "Search",
        to: "/github/search",
      },
      {
        icon: "favorite",
        label: "Favorite",
        to: "/github/favorite",
      },
    ],
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/34/YouTube_logo_%282017%29.png",
    label: "Youtube API",
    subItem: [
      {
        icon: "search",
        label: "Search",
        to: "/youtube/search",
      },
      {
        icon: "thumb_up",
        label: "Subcribes",
        to: "/github/subcribe",
      },
    ],
  },
];

export default {
  setup() {
    return {
      drawer: ref(true),
      menuList,
      itemList: ref(""),
      itemSub: ref(""),
    };
  },
};
</script>

<style scoped lang="scss">
::v-deep {
  .q-expansion-item__toggle-icon {
    display: none !important;
  }
}
</style>
