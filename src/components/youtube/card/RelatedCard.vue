<template>
  <div @click="onRouteToViewPage" class="related-card flex cursor-pointer">
    <img :src="video.thumbnail" width="200" class="rounded-lg mr-3 w-1/3" />
    <div class="w-1/2 flex flex-col justify-between">
      <div class="text-white one-line">
        <span>
          {{ video.videoTitle || '' }}
        </span>
      </div>
      <div class="flex items-center mb-3">
        <img
          src="https://i.pinimg.com/originals/e8/c9/82/e8c9828387de2a83e5469a95bc6d8574.png"
          width="30"
          class="rounded-full mr-2"
        />
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
  &:hover {
    transform: scale(1.05);
    transition: ease-in-out 0.2s;
  }
  .one-line {
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 40px;
  }
}
</style>
