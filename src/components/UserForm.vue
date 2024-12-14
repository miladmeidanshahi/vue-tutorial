<template>
  <q-dialog
    v-model="modelValue"
    @show="onShow"
    @hide="onHide"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6" v-text="`${isEdit ? 'ویرایش کاربر' : 'افزودن کاربر جدید'}`"></div>
      </q-card-section>

      <q-form
        greedy
        @submit="onSubmit"
      >
        <q-card-section class="q-pt-none">
          <q-input
            v-model="form.name"
            :rules="[requiredRule]"
            label="نام و نام خانوداگی"
          />

          <q-input
            v-model="form.email"
            :rules="[requiredRule, emailRule]"
            label="پست الکترونیک"
          />

          <q-input
            v-model="form.avatar"
            label="آواتار"
          />
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
import { ref, inject, computed } from 'vue'

import { api } from 'boot/axios'
import { requiredRule, emailRule } from 'src/utils/rules'

const emits = defineEmits(['success', 'update'])

const modelValue = defineModel({
  default: false
})

const data = inject('data')

const initialData = {
  name: null,
  email: null,
  avatar: null
}

const form = ref(initialData)
const loading = ref(false)

const isEdit = computed(() => !!data.value.id)

async function onSubmit () {
  loading.value = true

  try {
    const config = {
      url: isEdit.value ? `/user/${data.value.id}` : '/user',
      method: isEdit.value ? 'put' : 'post',
      data: form.value
    }

    const { data: formData } = await api(config)

    modelValue.value = false

    const emitName = isEdit.value ? 'update' : 'success'

    emits(emitName, formData)
  } finally {
    loading.value = false
  }
}

function onShow () {
  form.value = { ...data.value }
}

function onHide () {
  data.value = {}
  form.value = initialData
}
</script>
