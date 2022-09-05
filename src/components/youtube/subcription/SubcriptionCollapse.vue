<template>
  <div class="q-pa-md sm:w-full p-0 sm:px-0 absolute sm:static">
    <q-expansion-item class="shadow-1 overflow-hidden" style="border-radius: 6px" icon="favorite" label="Subcriptions"
      header-class="bg-green text-white" expand-icon-class="text-white">
      <div class="p-3 text-center bg-warning-light">
        <div class="py-2 flex items-center gap-1 cursor-pointer hover:text-primary"
          v-for="(item, index) in chanelsSubList" :key="index">
          <img :src="item.avatar" :alt="item.name" width="40" class="rounded-full shadow-lg" />
          <span>
            {{ item.name }}
          </span>
        </div>
        <q-btn color="green" push @click="onLoadMore" class="w-full" :loading="loading">
          <div class="row items-center no-wrap text-center">More</div>
        </q-btn>
      </div>
    </q-expansion-item>
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
  maxResults: 5,
  mine: true,
};

onMounted(()=>{
  getSubcriptionsList(defaultValue);
})

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
const onLoadMore = () => {
  defaultValue.maxResults += 4;
  getSubcriptionsList(defaultValue);
};
</script>
