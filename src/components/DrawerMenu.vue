<template>
  <q-drawer
    v-model="modelValue"
    show-if-above
    bordered
  >
    <q-list>
      <q-item-label header>
        Essential Links
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
import EssentialLink from 'components/EssentialLink.vue'

const modelValue = defineModel({ default: false })

const linksList = [
  {
    title: 'صفحه کاربران',
    icon: 'person',
    to: { name: 'UsersPage' }
  }
]
</script>
