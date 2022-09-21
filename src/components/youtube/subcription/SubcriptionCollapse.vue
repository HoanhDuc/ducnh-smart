<template>
    <div class="shadow-lg overflow-auto p-3">
      <img src="https://www.iconpacks.net/icons/2/free-instagram-like-icon-3507-thumb.png" width="40" alt="" class="mx-auto">
      <div
        class="p-2 flex items-center gap-3 cursor-pointer hover:text-primary"
        v-for="(item, index) in chanelsSubList"
        :key="index"
      >
        <img
          :src="item.avatar"
          :alt="item.name"
          width="40"
          class="rounded-full shadow-lg"
        />
        <span class="font-bold">
          {{ item.name }}
        </span>
      </div>
    </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import useStore from "@/store";
import { deleteKeyNull } from "@/utils";

const store = useStore();
const loading = ref(false);
const chanelsSubList = ref([]);
const defaultValue = {
  part: ["contentDetails", "id", "snippet"],
  maxResults: 100,
  mine: true,
};

onMounted(() => {
  getSubcriptionsList(defaultValue);
});

watch(store, () => {
  getSubcriptionsList(defaultValue);
});

const getSubcriptionsList = async (payload) => {
  try {
    if (store.isLogedIn) {
      loading.value = true;
      deleteKeyNull(payload);
      const data = await gapi.client.youtube.subscriptions.list(payload);
      if (!data.result.error) {
        chanelsSubList.value = data.result.items.map((item) => ({
          channelId: item.snippet.resourceId.channelId,
          name: item.snippet.title,
          avatar: item.snippet.thumbnails.medium.url,
          description: item.snippet.description,
        }));
        loading.value = false;
      }
    }
  } catch (error) {
    loading.value = false;
  }
};
</script>
