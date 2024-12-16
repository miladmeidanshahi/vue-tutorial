<template>
  <div :class="`rounded-borders ${className ? 'bg-red' : null}`">
    <q-input v-model="message" outlined></q-input>
    <br>
    <div>{{ username }}</div>
    <br>
    <div>{{ title }}</div>
    <v-btn
      labe="title change"
      @click="$emit('titleChange')"
    />
  </div>
</template>

<script setup>
const message = defineModel('message')
const username = defineModel('username')

defineProps({
  title: {
    type: String,
    required: true,
    validator (value) {
      if (value.length > 3) return true
    }
  }
})

defineEmits(['titleChange'])

const className = false
</script>
