<template>
  <Loading v-if="loading" />
  <div class="flex gap-4 mb-5">
    <div v-for="(channel, index) in channels" :key="index" class="flex items-center gap-2 rounded-lg shadow-lg p-2">
      <img :src="channel.thumbnail" alt="" width="40" class="rounded-full">
      <span class="font-bold">{{ channel.channelTitle }}</span>
    </div>
  </div>
  <div class="row gap-5 justify-around" v-if="videos.length">
    <div
      v-for="video in videos"
      :key="video.id"
      class="col-12 col-lg-2 col-md-3 col-sm-5"
    >
      <YoutubeCard :video="video" v-if="video.id" />
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
import useStoreYoutube from "@/store/youtube/index";

const store = useStore();
const storeYoutube = useStoreYoutube();
const videos = ref([]);
const channels = ref([]);
const errorsList = ref([]);
const loading = ref(false);
const defaultValue = {
  part: ["id", "snippet"],
  maxResults: 20,
  type: "video",
  q: "Fo4",
};

onMounted(() => {
  if (store.isLogedIn) {
    getListYoutube(defaultValue);
    getListYoutube(defaultValue, "channel", 5);
  }
});

watch(
  () => storeYoutube.searchText,
  (value) => {
    defaultValue.maxResults = 10;
    defaultValue.q = value;
    getListYoutube(defaultValue);
    getListYoutube(defaultValue, "channel", 5);
  }
);

watch(store, () => {
  if (store.isLogedIn) {
    getListYoutube(defaultValue);
    getListYoutube(defaultValue, "channel", 5);
  }
});

const getListYoutube = async (payload, type = "video", max = 10) => {
  try {
    loading.value = true;
    payload.type = type;
    payload.maxResults = max;
    deleteKeyNull(payload);
    const data = await gapi.client.youtube.search.list(payload);
    if (data.result.error) {
      return;
    } else {
      if (type === "video") {
        videos.value = data.result.items.map((item) => ({
          id: item.id.videoId,
          channelTitle: item.snippet.channelTitle,
          videoTitle: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
        }));
      } else if (type === "channel") {
        channels.value = data.result.items.map((item) => ({
          id: item.id.videoId,
          channelTitle: item.snippet.channelTitle,
          thumbnail: item.snippet.thumbnails.medium.url,
        }));
      }
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
