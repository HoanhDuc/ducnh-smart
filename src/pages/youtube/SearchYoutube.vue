<template>
  <Loading v-if="loading" />
  <div class="container mx-auto">
    <div class="mb-2">
      <div class="flex items-center justify-between mb-2">
        <p class="text-3xl font-bold font-jost">Search</p>
      </div>
      <q-input
        outlined
        v-model="searchTerm"
        placeholder="Enter Youtube username, i.e."
        type="search"
        class="mb-2"
        @keyup.enter="onSearch"
      />
    </div>
    <div class="row gap-5 justify-between" v-if="videos.length">
      <div v-for="video in videos" :key="video.id" class="col-3">
        <YoutubeCard :video="video" v-if="video.id" />
      </div>
    </div>
  </div>
</template>

<script setup>
import YoutubeCard from '@/components/youtube/card/YoutubeCard.vue'
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Loading from "@/components/common/Loading.vue";

const videos = ref([]);
const errorsList = ref([]);
const loading = ref(false);
const playListId = ref("PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz");
const route = useRoute();
const searchTerm = ref("");

const defaultValue = {
  part: ["id", "snippet"],
  maxResults: 8,
  type: "video",
};

onMounted(() => {
  gapi.load("client:auth2", async function () {
    gapi.auth2.init({
      client_id:
        "870086184702-qm8k72suv8cvp8cstre2ae5cpscuuk3d.apps.googleusercontent.com",
      scope: "email profile openid",
      plugin_name: "App Name that you used in google developer console API",
    });
    const authInstance = await gapi.auth2.getAuthInstance();
    if (!authInstance.isSignedIn.get()) {
      setAuth();
    } else {
      loadClient();
      window.onscroll = (ev) => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          loadMoreVideo();
        }
      };
    }
  });
});

const deleteKeyNull = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (!obj[key]) {
      delete obj[key];
    }
  });
};

const setAuth = () => {
  return gapi.auth2
    .getAuthInstance()
    .signIn({
      scope: "https://www.googleapis.com/auth/youtube.readonly",
    })
    .then((e) => {
      loadClient();
    });
};

const loadClient = async () => {
  loading.value = true;
  await gapi.client.setApiKey("AIzaSyAtGK3TwFP06WOsDDkxcLF6mStFDxgoHZU");
  await gapi.client.load(
    "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
  );

  deleteKeyNull(defaultValue);
  getVideosList(defaultValue);
};
const loadMoreVideo = () => {
  defaultValue.maxResults += 8;
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
        thumbnail : item.snippet.thumbnails.medium.url
      }));
      loading.value = false;
    }
  } catch (error) {
    loading.value = false;
    errorsList.value = error.result.error.errors;
  }
};

const onSearch = () => {
  defaultValue.maxResults = 8
  const value = {
    ...defaultValue,
    q: searchTerm.value,
  };
  deleteKeyNull(value);
  getVideosList(value);
};
</script>

<style lang="scss">
.col-3 {
  max-width: 23% !important;
}
</style>
