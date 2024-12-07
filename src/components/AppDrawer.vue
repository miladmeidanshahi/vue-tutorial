<template>
  <q-drawer
    v-model="modelValue"
    bordered
  >
    <q-list>
      <essential-link
        v-for="(link, index) in linksList"
        :key="index"
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
    title: 'خانه',
    icon: 'home',
    link: '/'
  },
  {
    title: 'لیست کاربران',
    icon: 'group',
    link: '/users'
  }
]
</script>
