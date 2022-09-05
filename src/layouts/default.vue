<template>
  <div class="default-layout">
    <div class="flex justify-between shadow-lg w-full p-3 fixed z-50 bg-black h-[65px]">
      <div class="flex gap-1 items-center justify-center cursor-pointer" @click="goHome">
        <img
          src="https://content-calpoly-edu.s3.amazonaws.com/arce/1/widget_images/icon-youtube-green.png"
          alt=""
          width="40"
        />
        <p class="text-2xl font-bold font-jost text-white">No Name</p>
      </div>
      <img
        :src="store.getUserGoogle.avatar"
        alt=""
        width="40"
      />
    </div>
    <div class="relative-position overflow-hidden pt-[65px]">
      <!-- <router-view class="sm:py-6 sm:px-4" /> -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import useStore from "@/store";
const store = useStore();
const router = useRouter();
onMounted(() => {
  gapi.load("client:auth2", async function () {
    gapi.auth2.init({
      client_id:
        "930149329582-n3ttmobrbtfr3l85kc1tdcgnt1sl1e9r.apps.googleusercontent.com",
      scope: "email profile openid",
      plugin_name: "App Name that you used in google developer console API",
    });
    const authInstance = await gapi.auth2.getAuthInstance();
    if (!authInstance.isSignedIn.get()) {
      setAuth();
    } else {
      loadClient();
    }
  });
});
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
  await gapi.client.setApiKey("AIzaSyDSoRBUuXltD2zSfR40mYNVkFGAuiWm2Qw");
  await gapi.client.load(
    "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
  );
  const authInstance = await gapi.auth2.getAuthInstance();
  const user = {
    name: await authInstance.currentUser.get().getBasicProfile().getName(),
    email: await authInstance.currentUser.get().getBasicProfile().getEmail(),
    avatar: await authInstance.currentUser
      .get()
      .getBasicProfile()
      .getImageUrl(),
  };
  store.setUserGoogle(user);
  store.setLogedIn(true);
};
const goHome = () => {
  router.push("/");
};
</script>
<style lang="scss" scoped>
.default-layout {
  // background-image: linear-gradient(to right top, #ff0000, #ff0081, #e15fdb, #8694ff, #00b2ff);
  background-color: #2e2e2e;
  min-height: 100vh;
}
.font-fantasy {
  font-family: fantasy;
}
</style>
