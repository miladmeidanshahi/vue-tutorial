<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <drawer-menu v-model="drawerOpen"></drawer-menu>

    <q-page-container>
      <suspense>
        <router-view />
      </suspense>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

import DrawerMenu from 'components/DrawerMenu.vue'

const drawerOpen = ref(false)

function toggleLeftDrawer () {
  drawerOpen.value = !drawerOpen.value
}
</script>
