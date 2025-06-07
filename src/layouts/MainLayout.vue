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

        <q-select
          v-model="locale"
          :options="localeOptions"
          label="انتخاب زبان"
          dense
          borderless
          emit-value
          map-options
          options-dense
          style="min-width: 150px"
        />
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
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { ref, watch } from 'vue'

import DrawerMenu from 'components/DrawerMenu.vue'

const modules = import.meta.glob('../../node_modules/quasar/lang/(fa-IR|en-US).js')

const $q = useQuasar()
const { locale } = useI18n({ useScope: 'global' })

const drawerOpen = ref(false)

function toggleLeftDrawer () {
  drawerOpen.value = !drawerOpen.value
}

const localeOptions = [
  { value: 'en-US', label: 'English' },
  { value: 'fa-IR', label: 'فارسی' }
]

watch(locale, val => {
  modules[`../../node_modules/quasar/lang/${val}.js`]().then(lang => {
    $q.lang.set(lang.default)
  })
})
</script>
