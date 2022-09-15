<template>
  <div v-if="video.channelTitle" @click="onRouteToViewPage" class="related-card row cursor-pointer h-[70px] md:h-[80px] w-full shadow-lg">
    <div class="col-3 p-1 flex items-center">
      <img :src="video.thumbnail" class="rounded-sm" />
    </div>
    <div class="p-2 col-9 flex flex-col justify-between">
      <div class="one-line">
        <span>
          {{ video.videoTitle || '' }}
        </span>
      </div>
      <div class="flex items-center">
        <!-- <img
          src="https://i.pinimg.com/originals/e8/c9/82/e8c9828387de2a83e5469a95bc6d8574.png"
          width="30"
          class="rounded-full mr-2"
        /> -->
        <span class="text-secondary-light hover:text-error">
          {{ video.channelTitle || '' }}
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
