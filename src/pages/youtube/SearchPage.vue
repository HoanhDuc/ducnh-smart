<template>
  <Loading v-if="loading" />
  <div>
    <div class="flex justify-end mb-3">
      <q-input outlined v-model="searchTerm" placeholder="Youtube search"
        @keyup.enter="onSearch" bg-color="white" class="w-1/3" />
    </div>
    <div class="row gap-5 justify-between p-0 sm:p-3" v-if="videos.length">
      <div v-for="video in videos" :key="video.id" class="col-3">
        <YoutubeCard :video="video" v-if="video.id" />
      </div>
    </div>
  </div>
</template>

<script setup>
import YoutubeCard from '@/components/youtube/card/YoutubeCard.vue'
import { onMounted, ref, watch } from "vue";
import { deleteKeyNull } from "@/utils"
import Loading from "@/components/common/Loading.vue";
import useStore from '@/store'

const store = useStore();
const videos = ref([]);
const errorsList = ref([]);
const loading = ref(false);
const searchTerm = ref("");
const defaultValue = {
  part: ["id", "snippet"],
  maxResults: 12,
  type: "video",
  q: "Manchester"
};

watch((searchTerm), () => {
  defaultValue.maxResults = 12
})
watch((store), () => {
  if (store.isLogedIn) {
    deleteKeyNull(defaultValue);
    getVideosList(defaultValue);
  }
})

const onSearch = () => {
  defaultValue.q = searchTerm.value
  deleteKeyNull(defaultValue);
  getVideosList(defaultValue);
};

const getVideosList = async (payload) => {
  try {
    loading.value = true;
    const data = await gapi.client.youtube.search.list(payload);
    if (!data.result.error) {
      videos.value = data.result.items.map((item) => ({
        id: item.id.videoId,
        channelTitle: item.snippet.channelTitle,
        videoTitle: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url
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
