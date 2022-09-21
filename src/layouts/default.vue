<template>
  <div class="default-layout font-jost h-screen">
    <Header />
    <div class="pt-[65px] row h-full">
      <div class="p-3 col-md-10">
        <router-view />
      </div>
      <SubcriptionCollapse class="col-2 fixed right-0 top-[65px] bottom-0 hidden sm:static" />
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/header/Header.vue";
import SubcriptionCollapse from "@/components/youtube/subcription/SubcriptionCollapse.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import useStore from "@/store";
const store = useStore();
const router = useRouter();
onMounted(() => {
  gapi.load("client:auth2", async function () {
    gapi.auth2.init({
      client_id:
        "5354673368-eal9lani9uo2uqihp0vv971o428mhg1f.apps.googleusercontent.com",
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
  await gapi.client.setApiKey("AIzaSyDNfziLpL9tPvW8C-CAahC6ci73N8Hbv7o");
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
</script>
<style lang="scss" scoped>
.default-layout {
  // background-image: linear-gradient(to right top, #ff0000, #ff0081, #e15fdb, #8694ff, #00b2ff);
  // background-color: #2e2e2e;
  min-height: 100vh;
}
.font-fantasy {
  font-family: fantasy;
}
</style>
