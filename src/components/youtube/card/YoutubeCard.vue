<template>
  <div
    class="iframe-block shadow-lg overflow-hidden cursor-pointer"
    @click="onRouteToViewPage"
  >
    <img :src="video.thumbnail" alt="" class="min-h-[150px] w-full" />
    <div class="p-3 min-h-[100px]">
      <div class="flex flex-col overflow-hidden">
        <span class="text-md title-video">
          {{ video.videoTitle }}
        </span>
      </div>
      <span class="text-secondary-light hover:text-primary text-center w-full">
        {{ video.channelTitle }}
      </span>
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
const isShowPopUp = ref(false);
const onRouteToViewPage = () => {
  router.push(`/watch?v=${props.video.id}`);
};
</script>
<style lang="scss" scoped>
.iframe-block {
  &:hover {
    transform: scale(1.05);
    transition: ease-in-out 0.2s;
  }

  .title-video {
    width: 250px;
    height: 3rem;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
