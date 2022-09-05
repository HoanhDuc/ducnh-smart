<template>
  <div class="p-5 flex justify-between">
    <div class="w-fit">
      <YouTube
        :src="`https://www.youtube.com/watch?v=${route.query.v}`"
        ref="youtube"
        @ready="onReady"
        class="rounded-lg overflow-hidden w-full"
        width="1150px"
        height="550px"
      />
    </div>
    <div class="w-1/3">
      <div v-for="(video, index) in relatedVideos" :key="index" class="mb-4">
        <RelatedCard :video="video" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import YouTube from "vue3-youtube";
import { onMounted, ref, watch } from "vue";
import { deleteKeyNull } from "@/utils";
import { useRoute } from "vue-router";
import useStore from "@/store";
import RelatedCard from "@/components/youtube/card/RelatedCard.vue";

interface IRelatedVideo {
  id: string;
  channelTitle: string;
  videoTitle: string;
  thumbnail: string;
}

const store = useStore();
const route = useRoute();
const youtube = ref();
const videoID = ref();
const relatedVideos = ref<IRelatedVideo[]>([]);

const defaultValue = {
  part: ["snippet"],
  relatedToVideoId: videoID.value,
  type: ["video"],
  maxResults: 8,
};
onMounted(() => {
  videoID.value = route.query.v;
  getRelatedList(defaultValue);
});

const onReady = () => {
  youtube.value.playVideo();
};

watch(store, () => {
  getRelatedList(defaultValue);
});
watch(route, (value) => {
  videoID.value = route.query.v;
  defaultValue.relatedToVideoId = value.query.v;
  getRelatedList(defaultValue);
});

const getRelatedList = async (payload: Object) => {
  try {
    if (store.isLogedIn && videoID.value) {
      const data = await gapi.client.youtube.search.list(payload);
      if (!data.result.error) {
        relatedVideos.value = data.result.items.map((item: any) => ({
          id: item.id.videoId,
          channelTitle: item.snippet.channelTitle,
          videoTitle: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
        }));
      }
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
<style lang="scss" scoped></style>
