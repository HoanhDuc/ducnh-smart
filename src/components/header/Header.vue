<template>
  <div
    class="flex justify-between shadow-lg w-full p-3 fixed z-50 bg-white h-[65px]"
  >
    <div class="flex gap-1 items-center justify-center cursor-pointer">
      <router-link to="/">
        <img
          src="https://hotro.garena.vn/static/images/fo4.png?v=20181215"
          alt=""
          width="40"
        />
      </router-link>
      <q-input
        outlined
        v-model="searchText"
        dense
        rounded
        @keyup.enter="onSendSearchText"
      >
        <template v-slot:append>
          <q-icon v-if="searchText === ''" name="search" />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="searchText = ''"
          />
        </template>
      </q-input>
    </div>

    <div class="flex items-center">
      <img
        :src="store.getUserGoogle.avatar"
        alt=""
        width="40"
        class="rounded-full"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import useStore from "@/store";
import useStoreYoutube from "@/store/youtube/index";
const storeYoutube = useStoreYoutube();
const store = useStore();
const searchText = ref("");
const onSendSearchText = () => {
  storeYoutube.setSearchText(searchText.value);
};
</script>
