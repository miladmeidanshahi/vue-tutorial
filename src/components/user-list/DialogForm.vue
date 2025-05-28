<template>
  <q-dialog v-model="modelValue">
    <q-card style="width: 500px">
      <q-card-section>
        <div class="text-h6">
          {{ isEdit ? 'ویرایش کاربر' : 'ثبت کاربر جدید' }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="submit" greedy>
          <q-input
            v-model="state.form.firstName"
            :rules="[requiredRule]"
            label="نام"
          />
          <q-input
            v-model="state.form.lastName"
            :rules="[requiredRule]"
            label="نام خانوادگی"
          />
          <q-input
            v-model="state.form.email"
            :rules="[requiredRule]"
            label="ایمیل"
          />
          <q-select
            v-model="state.form.role"
            :rules="[requiredRule]"
            label="نقش"
            :options="roles"
            option-label="text"
            option-value="id"
            emit-value
            map-options
          />
          <q-select
            v-model="state.form.gender"
            :rules="[requiredRule]"
            label="جنسیت"
            :options="['male', 'female']"
          />

          <q-btn type="submit" label="ذخیره" color="primary" :loading="state.loading" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { api } from 'boot/axios'
import { computed, reactive, watch } from 'vue'

import { requiredRule } from 'src/utils'

const props = defineProps({
  formData: {
    type: Object,
    default: () => {}
  }
})

const modelValue = defineModel({
  type: Boolean,
  default: false
})

const emits = defineEmits(['success'])

const state = reactive({
  form: {
    firstName: null,
    lastName: null,
    email: null,
    role: null,
    gender: null
  },
  loading: false
})

const isEdit = computed(() => !!props.formData.id)

watch(() => props.formData, value => {
  if (value) {
    const { id, firstName, lastName, email, role, gender } = value

    state.form = {
      id,
      firstName,
      lastName,
      email,
      role,
      gender
    }
  }
})

const roles = [
  {
    text: 'ادمین',
    id: 'admin'
  },
  {
    text: 'مدیر',
    id: 'moderator'
  },
  {
    text: 'کاربر',
    id: 'user'
  }
]

async function submit () {
  state.loading = true

  try {
    const config = {
      url: isEdit.value ? `/users/${state.form.id}` : '/users/add',
      method: isEdit.value ? 'put' : 'post',
      data: state.form
    }

    const { data } = await api(config)

    emits('success', { data, isEdit: isEdit.value })
    modelValue.value = false
  } finally {
    state.loading = false
  }
}
</script>
