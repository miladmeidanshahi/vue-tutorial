<template>
  <q-page class="flex flex-center">
    <div
      class="q-pa-md"
      style="max-width: 500px"
    >
      <q-form
        greedy
        class="q-gutter-md"
        @submit.prevent="submit"
      >
        <q-input
          v-model="form.username"
          filled
          label="نام کاربری"
          :rules="[requiredRule]"
        />

        <q-input
          v-model="form.password"
          filled
          label="گذرواژه"
          :rules="[requiredRule]"
        />

        <div>
          <q-btn
            label="ورود"
            type="submit"
            color="primary"
            class="full-width"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { reactive } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

import { requiredRule } from 'src/utils/rules'

const $q = useQuasar()
const router = useRouter()

const form = reactive({
  username: null,
  password: null
})

function submit () {
  $q.notify({
    color: 'positive',
    message: `${form.username} و رمز ${form.password} صحیح میباشد.`
  })

  router.push('/')
}
</script>
