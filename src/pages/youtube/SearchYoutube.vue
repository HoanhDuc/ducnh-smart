<template>
  <Loading v-if="loading" />
  <div class="container mx-auto">
    <div class="mb-2">
      <div class="flex items-center justify-between mb-2">
        <p class="text-3xl font-bold font-jost">Search</p>
      </div>
      <q-input outlined v-model="searchTerm" placeholder="Enter Youtube username, i.e." type="search" class="mb-2"
        @keyup.enter="onSearch" />
    </div>
    <div class="row gap-8 justify-between" v-if="videos.length">
      <div v-for="video in videos" :key="video.id" class="col-2 rounded-lg overflow-hidden">
        <IFrameLazyLoad :id="video.id.videoId" v-if="video.id.videoId" />
      </div>
    </div>
  </div>
</template>

<script setup>
import IFrameLazyLoad from "@/components/youtube/IFrameLazyLoad.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Loading from '@/components/common/Loading.vue'

const videos = ref([]);
const errorsList = ref([]);
const loading = ref(false);
const playListId = ref("PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz");
const route = useRoute();
const searchTerm = ref("");

const defaultValue = {
  part: ["id"],
  maxResults: 20,
  type: 'video'
};

const authenticate = () => {
  return gapi.auth2
    .getAuthInstance()
    .signIn({
      scope: "https://www.googleapis.com/auth/youtube.readonly",
    })
    .then(
      function (e) {
        loadClient();
        const userName = e.getBasicProfile().getName();
        // saveUser(userName);
        console.log("Sign-in successful");
      },
      function (err) {
        console.error("Error signing in", err);
      }
    );
};

const loadClient = async () => {
  loading.value = true;
  await gapi.client.setApiKey("AIzaSyApgTHh4YvaItbXw42i_ggLM1CGpHgB0dQ");
  await gapi.client.load(
    "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
  );

  Object.keys(defaultValue).forEach((key) => {
    if (!defaultValue[key]) {
      delete defaultValue[key];
    }
  });
  getVideosList(defaultValue);
};

const getVideosList = async (payload) => {
  try {
    loading.value = true;
    const data = await gapi.client.youtube.search.list(payload);

    if (!data.result.error) {
      videos.value = data.result.items;
      loading.value = false;
      return;
    }

    loading.value = false;
    errorsList.value = data.result.error.errors;
  } catch (error) {
    loading.value = false;
    errorsList.value = error.result.error.errors;
  }
};

const submit = (value) => {
  Object.keys(value).forEach((key) => {
    if (!value[key]) {
      delete value[key];
    }
  });

  getVideosList(value);
};

const onSearch = () => {
  const value = {
    ...defaultValue,
    q: searchTerm.value,
  };

  submit(value);
};

onMounted(async () => {
  gapi.load("client:auth2", async function () {
    gapi.auth2.init({
      client_id:
        "700083678766-7v0ddu3ik1supaucr6jmt5oir9gf0q6n.apps.googleusercontent.com",
      scope: "email profile openid",
      plugin_name: "App Name that you used in google developer console API",
    });

    loading.value = true;
    const authInstance = await gapi.auth2.getAuthInstance();

    if (!authInstance.isSignedIn.get()) {
      loading.value = false;
      authenticate();
    } else {
      const userName = await authInstance.currentUser
        .get()
        .getBasicProfile()
        .getName();
      //   saveUser(userName);
      loadClient();
    }
  });
});
</script>

<style lang="scss">
</style>
