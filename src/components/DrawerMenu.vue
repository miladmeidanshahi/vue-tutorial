<template>
  <q-drawer
    v-model="modelValue"
    show-if-above
    bordered
  >
    <q-list>
      <q-item-label header>
        {{ $t('menusTitle') }}
      </q-item-label>

      <EssentialLink
        v-for="link in linksList"
        :key="link.title"
        v-bind="link"
      />
    </q-list>
  </q-drawer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

import EssentialLink from 'components/EssentialLink.vue'

const modelValue = defineModel({ default: false })

const { t } = useI18n()

const linksList = computed(() => [
  {
    title: t('menusDrawer.users'),
    icon: 'person',
    to: { name: 'UsersPage' }
  }
])
</script>
