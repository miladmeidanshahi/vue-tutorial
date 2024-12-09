<template>
  <q-dialog v-model="modelValue">
    <q-card>
      <q-card-section>
        <div class="text-h6">افزودن کاربر جدید</div>
      </q-card-section>

      <q-form
        greedy
        @submit="onSubmit"
      >
        <q-card-section class="q-pt-none">
          <q-input
            v-model="form.name"
            :rules="[requiredRule]"
            label="نام و نام خانوداگی"></q-input>

          <q-input
            v-model="form.email"
            :rules="[requiredRule, emailRule]"
            label="پست الکترونیک"></q-input>

          <q-file
            v-model="form.avatar"
            label="آواتار"></q-file>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            type="submit"
            label="ذخیره"
            color="primary"
            :loading="loading"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'

import { api } from 'boot/axios'
import { requiredRule, emailRule } from 'src/utils/rules'

const emits = defineEmits(['success'])

const modelValue = defineModel({
  default: false
})

const loading = ref(false)

const form = reactive({
  name: null,
  email: null,
  avatar: null
})

async function onSubmit () {
  loading.value = true

  try {
    const { data } = await api.post('/user', form)

    modelValue.value = false

    emits('success', data)
  } finally {
    loading.value = false
  }
}
</script>
