<template>
    <div class="p-5">
        <YouTube :src="`https://www.youtube.com/watch?v=${route.query.v}`" ref="youtube" class="min-h-[200px]"
            @ready="onReady" width="950px" height="550px" />
    </div>
</template>
<script setup lang="ts">
import YouTube from "vue3-youtube";
import {ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const youtube = ref();

const onReady =() => {
    youtube.value.playVideo()
}
</script>