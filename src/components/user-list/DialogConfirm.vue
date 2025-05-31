<template>
  <q-dialog v-model="modelValue" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">آیا از حذف این کاربر اطمینان دارید؟</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="خیر" color="primary" v-close-popup />
        <q-btn
          flat
          label="بله"
          color="primary"
          :loading="loading"
          @click="onOk"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'boot/axios'

const modelValue = defineModel({
  type: Boolean,
  default: false
})

const props = defineProps({
  id: {
    type: Number,
    required: true,
    default: 0
  }
})

const emits = defineEmits(['success'])

const loading = ref(false)

async function onOk () {
  loading.value = true

  try {
    await api.delete(`/users/${props.id}`)
    modelValue.value = false

    emits('success')
  } finally {
    loading.value = false
  }
}
</script>
