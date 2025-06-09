<template>
  <q-page class="flex flex-center">
    <pre>{{ user }}</pre>
  </q-page>
</template>

<script setup>
import { useUser } from 'src/compositions/useUser.js'

const {
  user
} = useUser()
</script>
