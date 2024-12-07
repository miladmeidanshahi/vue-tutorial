<template>
  <q-layout view="lHh Lpr lFf">
    <app-header @toggle-menu="onToggleMenu" />
    <app-drawer v-model="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

import AppHeader from 'components/AppHeader.vue'
import AppDrawer from 'components/AppDrawer.vue'

const leftDrawerOpen = ref(true)

function onToggleMenu (data) {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
