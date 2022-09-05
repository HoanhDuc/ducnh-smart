<template>
  <div class="">
    <q-toolbar class="bg-green justify-between text-white rounded-sm">
      <q-avatar class="gt-xs">
        <img src="https://static.vecteezy.com/system/resources/previews/001/198/681/non_2x/video-camera-png.png" />
      </q-avatar>
      <q-input
        dark
        dense
        standout
        v-model="searchText"
        input-class="text-right"
        @keyup.enter="onSendSearchText"
      >
        <template v-slot:append>
          <q-icon v-if="searchText === ''" name="search" />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="searchText = ''"
          />
        </template>
      </q-input>
    </q-toolbar>
    <SubcriptionCollapse />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import SubcriptionCollapse from "@/components/youtube/subcription/SubcriptionCollapse.vue";

const emit = defineEmits(["update:searchText"]);
const searchText = ref("");
const onSendSearchText = () => {
  emit("update:searchText", searchText.value);
};
</script>
