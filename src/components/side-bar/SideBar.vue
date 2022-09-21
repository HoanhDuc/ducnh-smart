<template>
  <div class="flex gap-3 overflow-x-auto">
    <q-toolbar class="bg-green justify-between gap-3 text-white rounded-sm w-auto">
      <q-avatar class="gt-xs rounded-none">
        <img src="https://cdn-icons-png.flaticon.com/512/4404/4404094.png" />
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
    <div class="relative">
    <SubcriptionCollapse />
  </div>
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
