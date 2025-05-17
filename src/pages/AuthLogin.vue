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
import { useRouter } from 'vue-router'

const router = useRouter()

const state = reactive({
  form: {
    username: null,
    password: null
  },
  isPwd: true,
  loading: false
})

function requiredRule(value) {
  return !!value || 'این فیلد الزامی است'
}

function passwordRule (value) {
  return value.length > 8 || 'رمزعبور باید بیشتر از ۸ کاراکتر باشد'
}

function onSubmit () {
  state.loading = true

  setTimeout(() => {
    state.loading = false
    router.push({ name: 'HomePage' })
  }, 3000)
}
</script>