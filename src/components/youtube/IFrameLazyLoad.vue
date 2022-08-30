<template>
  <YouTube :src="`https://www.youtube.com/watch?v=${id}`" ref="youtube" width="300px" height="200px" class="rounded-lg" />
</template>

<script setup lang="ts">
import YouTube from 'vue3-youtube'
const props = defineProps({
  id: String
})
</script>