<template>
    <q-dialog v-model="isShowPopUp" persistent transition-show="flip-down" transition-hide="flip-up">
        <q-card class="bg-primary text-white">
            <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
            <YouTube :src="`https://www.youtube.com/watch?v=${id}`" ref="youtube" width="350px" height="200px"
                class="min-h-[200px]" />
        </q-card>
    </q-dialog>
</template>
<script lang="ts" setup>
import YouTube from "vue3-youtube";
import { ref, watch } from 'vue'
const props = defineProps({
    isShow: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        default: ''
    }
})
const isShowPopUp = ref()
</script>