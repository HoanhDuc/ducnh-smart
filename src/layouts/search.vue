<template>
  <div class="default-layout">
    <div class="child lg:w-2/3  relative-position overflow-hidden">
      <router-view class="py-8 px-4" />
      <div v-if="!route.path.includes('/detail')" class="footer row p-4">
        <router-link class="footer-item col-6 text-base" :style="`color:${colorTab.searchTab}`" to="/search">
          <span class="material-icons text-lg"> search </span>
          <span>Search</span>
        </router-link>
        <router-link class="footer-item col-6 text-base" :style="`color:${colorTab.favoriteTab}`" to="/favorite">
          <span class="material-icons text-lg"> favorite </span>
          <span>Favorite</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();
const colorTab = computed(() => {
  const path = route.path;
  if (path.includes("/search")) {
    return {
      searchTab: "#1976D2",
      favoriteTab: "rgba(0, 0, 0, 0.6)",
    };
  }
  return {
    searchTab: "rgba(0, 0, 0, 0.6)",
    favoriteTab: "#1976D2",
  };
});
</script>
<style lang="scss" scoped>
.default-layout {
  height: 100vh;
  background: rgb(0, 139, 242);
  background: linear-gradient(90deg, rgba(0, 139, 242, 1) 0%, rgba(94, 152, 116, 0.7035189075630253) 35%, rgba(208, 53, 53, 1) 100%);

  .child {
    background: #fff;
    margin: auto;
    height: 100%;
  }
}

.font-fantasy {
  font-family: fantasy;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.05);

  .footer-item {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
}
</style>
