<template>
  <q-page class="flex flex-center">
    <q-card class="text-center" style="width: 400px;">
      <q-card-section>
        <div class="q-mb-md">ورود به سامانه</div>
        <q-form @submit="onSubmit" greedy>
          <q-input
            v-model="state.form.username"
            label="نام کاربری"
            :rules="[requiredRule]"
            lazy-rules
          />
          <q-input
            v-model="state.form.password"
            :type="state.isPwd ? 'password' : 'text'"
            label="رمزعبور"
            :rules="[requiredRule, passwordRule]"
            lazy-rules
          >
            <template v-slot:append>
              <q-icon
                :name="state.isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="state.isPwd = !state.isPwd"
              />
            </template>
          </q-input>

          <q-btn
            type="submit"
            label="ورود"
            color="primary"
            class="full-width q-mt-xl"
            :loading="state.loading"
          />

          <q-btn
            flat
            type="reset"
            label="بازنشانی"
            color="primary"
            class="full-width q-mt-sm"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { reactive } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

import { api } from 'boot/axios'
import { requiredRule, passwordRule } from 'src/utils'

const $q = useQuasar()
const router = useRouter()

const state = reactive({
  form: {
    username: 'emilys',
    password: 'emilyspass'
  },
  isPwd: true,
  loading: false
})

async function onSubmit () {
  state.loading = true

  try {
    const { data } = await api.post('/user/login', state.form)

    $q.localStorage.set('token', data.accessToken)
    await router.push({ name: 'HomePage' })
  } finally {
    state.loading = false
  }
}
</script>