<template>
  <div
    class="iframe-block rounded-lg shadow-lg overflow-hidden bg-white cursor-pointer"
  >
    <!-- <YouTube
      :src="`https://www.youtube.com/watch?v=${video.id}`"
      ref="youtube"
      width="350px"
      height="200px"
      class="min-h-[200px]"
    /> -->
    <img :src="video.thumbnail" alt="" class="min-h-[200px]" />
    <div class="row p-2 min-h-[100px]">
      <div class="col-2">
        <img
          class="rounded-full w-[40px]"
          src="https://yt3.ggpht.com/MRywaef1JLriHf-MUivy7-WAoVAL4sB7VHZXgmprXtmpOlN73I4wBhjjWdkZNFyJNiUP6MHm1w=s88-c-k-c0x00ffffff-no-rj"
          alt=""
        />
      </div>
      <div class="col-10 flex flex-col overflow-hidden">
        <span class="text-md title-video">
          {{ video.videoTitle }}
        </span>
      </div>
      <span class="hover:text-primary text-center w-full">
        {{ video.channelTitle }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import YouTube from "vue3-youtube";
interface IProps {
  video: {
    id: string;
    channelTitle: string;
    videoTitle: string;
    thumbnail: string;
  };
}
const props = defineProps<IProps>();
</script>
<style lang="scss" scoped>
.iframe-block {
  &:hover {
    transform: scale(1.05);
    transition: ease-in-out 0.2s;
  }
  .title-video {
    white-space: nowrap;
    width: 250px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
