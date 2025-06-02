<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6 col-lg-4">
        <q-card>
          <q-card-section>
            <div>مشخصات کاربر:</div>
            <div class="flex items-center">
              <q-avatar size="64px">
                <img :src="state.data.image">
              </q-avatar>

              <div class="text-body1 text-weight-bold q-ml-sm">
                <span v-text="state.data.firstName"></span>
                <span v-text="state.data.lastName"></span>
              </div>

              <q-chip
                class="q-ml-auto"
                :label="state.data.role"
                square
              />
            </div>
            <div v-text="state.data.email"></div>
            <div v-text="state.data.phone"></div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-lg-4">
        <q-card>
          <q-card-section>
            <div>آدرس:</div>
    
            <q-list>
              <q-item
                v-for="(value, key, index) in state.data.address"
                :key="index"
              >
                <q-item-section>
                  <q-item-label>{{ key }}</q-item-label>
                  <q-item-label caption lines="2">{{ value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-lg-4">
        <q-card>
          <q-card-section>
            <div>اطلاعات حساب بانکی:</div>

            <q-list>
              <q-item
                v-for="(value, key, index) in state.data.bank"
                :key="index"
              >
                <q-item-section>
                  <q-item-label>{{ key }}</q-item-label>
                  <q-item-label caption lines="2">{{ value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-inner-loading :showing="state.loading">
      <q-spinner-dots size="100px" color="cyan" />
    </q-inner-loading>
  </q-page>
</template>

<script setup>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

import { api } from 'boot/axios'

const route = useRoute()

const state = reactive({
  data: {},
  loading: false
})

async function fetchUser () {
  state.loading = true

  try {
    const { data } = await api.get(`/users/${route.params.id}`)

    state.data = data
  } finally {
    state.loading = false
  }
}

try {
  await fetchUser()
} catch (error) {
  console.log(error)
}
</script>
