<template>
  <q-item
    :to="to"
    clickable
  >
    <q-item-section
      v-if="props.icon"
      avatar
    >
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },

  caption: {
    type: String,
    default: ''
  },

  to: {
    type: Object,
    default: () => {}
  },

  icon: {
    type: String,
    default: ''
  }
})
</script>
