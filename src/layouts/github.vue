<template>
  <div class="default-layout">
    <div class="child lg:w-3/5  relative-position overflow-hidden">
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
    background: #fff;
    margin: auto;
    height: 100%;
  }
}

.font-fantasy {
  font-family: fantasy;
}
</style>
