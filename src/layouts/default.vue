<template>
  <div class="default-layout p-5 row">
    <div class="col-2">
      <div class="flex gap-1 items-center justify-center ">
        <img src="https://denkavit.com/en/wp-content/uploads/sites/8/2021/11/YouTube-Icon.png" alt="" width="30">
        <p class="text-2xl font-bold  font-jost">YouTube</p>
      </div>
      <SideBar class="" />
    </div>
    <div class="relative-position overflow-hidden col-10">
      <router-view class="py-6 px-4" />
    </div>
  </div>
</template>

<script setup>
import SideBar from "@/components/side-bar/SideBar.vue";
import { onMounted } from 'vue'
import useStore from '@/store'
const store = useStore();

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
      loadClient()
    }
  })
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
  await gapi.client.setApiKey("AIzaSyAtGK3TwFP06WOsDDkxcLF6mStFDxgoHZU");
  await gapi.client.load(
    "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
  );
  const authInstance = await gapi.auth2.getAuthInstance();
  const user = {
    avatar: await authInstance.currentUser.get().getBasicProfile().getName(),
    name: await authInstance.currentUser.get().getBasicProfile().getImageUrl()
  }
  store.setUserGoogle(user)
  store.setLogedIn(true)
};
</script>
<style lang="scss" scoped>
.default-layout {
  // background-image: linear-gradient(to right top, #ff0000, #ff0081, #e15fdb, #8694ff, #00b2ff);
  min-height: 100vh;
}
.font-fantasy {
  font-family: fantasy;
}
</style>
