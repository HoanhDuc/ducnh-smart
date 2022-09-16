<template>
  <div class="px-2 sm:p-5 row gap-5">
    <div class="min-h-[250px] col-sm-8 col-xs-12">
      <div
        class="q-video h-[250px] sm:h-[400px] xl:h-[600px] overflow-hidden xxs:fixed sm:relative left-0 w-full"
      >
        <!-- <iframe
          :src="`https://www.youtube.com/embed/${route.query.v}?autoplay=1`"
          frameborder="0"
          style="width: 100%; height: 100%"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        ></iframe> -->
      <YouTube 
        src="https://www.youtube.com/watch?v=jNQXAC9IVRw" 
        ref="youtube" />
      </div>
    </div>
    <div class="col-sm-3 w-full">
      <div v-for="(video, index) in relatedVideos" :key="index" class="mb-4">
        <RelatedCard :video="video" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { deleteKeyNull } from "@/utils";
import { useRoute } from "vue-router";
import useStore from "@/store";
import YouTube from 'vue3-youtube'
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
  defaultValue.relatedToVideoId = route.query.v;
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
      deleteKeyNull(payload);
      const data = await gapi.client.youtube.search.list(payload);
      if (!data.result.error) {
        relatedVideos.value = data.result.items.map((item: any) => {
          if (item.snippet) {
            return {
              id: item.id.videoId,
              channelTitle: item.snippet.channelTitle,
              videoTitle: item.snippet.title,
              thumbnail: item.snippet.thumbnails.default.url,
            };
          }
          return {};
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
<style lang="scss" scoped></style>
