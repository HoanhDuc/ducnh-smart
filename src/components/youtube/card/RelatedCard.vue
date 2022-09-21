<template>
  <div
    v-if="video.channelTitle"
    @click="onRouteToViewPage"
    class="related-card row cursor-pointer w-full shadow-lg rounded-lg overflow-hidden"
  >
    <div class="col-3 flex items-center">
      <img :src="video.thumbnail" />
    </div>
    <div class="p-2 col-9 flex flex-col">
      <div class="one-line">
        <span>
          {{ video.videoTitle || "" }}
        </span>
      </div>
      <div class="flex items-center">
        <span class="text-secondary-light hover:text-error">
          {{ video.channelTitle || "" }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
interface IProps {
  video: {
    id: string;
    channelTitle: string;
    videoTitle: string;
    thumbnail: string;
  };
}
const props = defineProps<IProps>();
const router = useRouter();
const onRouteToViewPage = () => {
  router.push(`/watch?v=${props.video.id}`);
};
</script>
<style lang="scss" scoped>
.related-card {
  overflow: hidden;
  &:hover {
    transform: scale(1.05);
    transition: ease-in-out 0.2s;
  }
  .one-line {
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 20px;
  }
}
</style>
