<template>
  <Loading v-if="loading" />
  <div class="row">
    <div class="col-2">
      <SideBar v-model:search-text="searchText"/>
    </div>
    <div class="col-10">
      <div class="row gap-5 justify-between p-0 sm:px-3" v-if="videos.length">
        <div v-for="video in videos" :key="video.id" class="col-3">
          <YoutubeCard :video="video" v-if="video.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import YoutubeCard from "@/components/youtube/card/YoutubeCard.vue";
import SideBar from "@/components/side-bar/SideBar.vue";
import { onMounted, ref, watch } from "vue";
import { deleteKeyNull } from "@/utils";
import Loading from "@/components/common/Loading.vue";
import useStore from "@/store";

const store = useStore();
const videos = ref([]);
const errorsList = ref([]);
const loading = ref(false);
const searchText = ref("");
const defaultValue = {
  part: ["id", "snippet"],
  maxResults: 12,
  type: "video",
  q: "game",
};

onMounted(() => {
  if (store.isLogedIn) {
    getVideosList(defaultValue);
  }
});

watch(searchText, () => {
  defaultValue.maxResults = 12;
  defaultValue.q = searchText.value;
  getVideosList(defaultValue);
});

watch(store, () => {
  if (store.isLogedIn) {
    getVideosList(defaultValue);
  }
});

const getVideosList = async (payload) => {
  try {
    loading.value = true;
    deleteKeyNull(payload);
    const data = await gapi.client.youtube.search.list(payload);
    if (!data.result.error) {
      videos.value = data.result.items.map((item) => ({
        id: item.id.videoId,
        channelTitle: item.snippet.channelTitle,
        videoTitle: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
      }));
      loading.value = false;
    }
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
};
</script>

<style lang="scss">
.col-3 {
  max-width: 23% !important;
}
</style>
