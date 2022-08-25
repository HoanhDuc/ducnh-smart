<template>
  <q-layout view="hHh Lpr lff" style="height: 200px">
    <q-header elevated class="bg-error">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>DucNH</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" :width="200" :breakpoint="500" overlay bordered class="bg-grey-3">
      <q-scroll-area class="fit text-base">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item-section avatar class="p-0">
              <q-expansion-item v-if="menuItem.subItem" expand-separator
                :header-class="tabSelected === menuItem.key ? 'selected-menu' : ''" class="w-full">
                <template v-slot:header>
                  <div class="flex items-center">
                    <img :src="menuItem.icon" alt="" class="w-10 mr-2" />
                    <span> {{ menuItem.label }}</span>
                  </div>
                </template>
                <router-link v-for="(sub, indexSub) in menuItem.subItem" :key="indexSub"
                  class="p-2 ml-6 flex items-center cursor-pointer sub-item-menu" :to="sub.to">
                  <span class="material-icons mr-2">
                    {{ sub.icon }}
                  </span>

                  <span>
                    {{ sub.label }}
                  </span>
                </router-link>
              </q-expansion-item>
              <q-item clickable v-else class="w-full items-center">
                <q-icon :name="menuItem.icon" class="mr-2" />
                {{ menuItem.label }}
              </q-item>
            </q-item-section>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <q-page padding class="p-0">
        <slot />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { menuList } from "@/utils/menuSideBar";
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute()
const drawer = ref(true)
const tabSelected = ref('github')
const subTabSelected = ref('')
watch((route), () => {
  if (route.fullPath.includes('/github')) {
    tabSelected.value = 'github'
    return
  }
  if (route.fullPath.includes('/youtube')) {
    tabSelected.value = 'youtube'
    return
  }
})
</script>

<style scoped lang="scss">
.sub-item-menu {
  &:hover {
    color: rgb(255, 0, 0);
  }
}

::v-deep {
  .q-item--clickable {
    justify-content: space-between;
  }

  .q-item__section--side {
    padding: 0 !important;
  }

  .selected-menu {
    color: rgb(255, 0, 0);

    .q-expansion-item__toggle-icon {
      color: rgb(255, 0, 0);
    }
  }

}
</style>
