<template>
  <div class="iframe-block rounded-lg shadow-lg overflow-hidden bg-white cursor-pointer" @click="onRouteToViewPage">
    <img :src="video.thumbnail" alt="" class="min-h-[200px] w-full" />
    <div class="row p-2 min-h-[100px]">
      <div class="col-2">
        <img class="rounded-full w-[40px]" src="https://ddragon.leagueoflegends.com/cdn/12.3.1/img/profileicon/3183.png"
          alt="" />
      </div>
      <div class="col-10 flex flex-col overflow-hidden">
        <span class="text-md title-video">
          {{ video.videoTitle }}
        </span>
      </div>
      <span class="text-secondary-light hover:text-primary text-center w-full">
        {{ video.channelTitle }}
      </span>
    </div>
    <!-- <q-dialog v-model="isShowPopUp" persistent transition-show="rotate" transition-hide="rotate">
      <q-card style="max-width: none !important; max-height: none !important;">
        <q-btn dense flat icon="close" v-close-popup class="float-right mb-2">
          <q-tooltip class="bg-white text-error">Close</q-tooltip>
        </q-btn>
        <div class="p-5">
          <YouTube :src="`https://www.youtube.com/watch?v=${video.id}`" ref="youtube" class="min-h-[200px]"
            width="950px" height="550px" />
        </div>
      </q-card>
    </q-dialog> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useRouter} from 'vue-router'
interface IProps {
  video: {
    id: string;
    channelTitle: string;
    videoTitle: string;
    thumbnail: string;
  };
}
const props = defineProps<IProps>();
const router = useRouter()
const isShowPopUp = ref(false)
const onRouteToViewPage = () => {
  router.push(`/watch?v=${props.video.id}`)
}
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

  .max-w-screen-2xl {
    max-width: max-content !important;
    max-height: max-content !important;
  }
}

::v-deep {
  .q-dialog__inner--minimized>div {
    max-width: auto !important;
    max-height: auto !important;
  }

  .max-w-screen-2xl {}
}
</style>
