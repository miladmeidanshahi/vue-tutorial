<template>
  <pre>{{ user }}</pre>
</template>

<script setup>
import { useUser } from 'src/compositions/useUser.js'

const {
  user
} = useUser()
</script>
