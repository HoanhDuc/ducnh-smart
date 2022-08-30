<template>
  <div class="default-layout">
    <div class="child relative-position overflow-hidden">
      <router-view class="py-6 px-4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
</script>
<style lang="scss" scoped>
.default-layout {
  .child {
    background-image: linear-gradient(to right top, #ff7373, #ff4183, #ee00a4, #c000d0, #402eff);
    margin: auto;
    min-height: 100vh;
  }
}

.font-fantasy {
  font-family: fantasy;
}
</style>
