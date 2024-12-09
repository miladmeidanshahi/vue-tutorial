<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="$emit('toggleMenu')"
      />

      <q-toolbar-title>
        پنل ادمین
      </q-toolbar-title>

      <q-btn-dropdown
        flat
        stretch
      >
        <template #label>
          <q-avatar size="30px">
            <img :src="user.avatar">
          </q-avatar>
          <span v-text="user.name" class="q-ml-sm" />
        </template>

        <q-list>
          <q-item
            clickable
            v-close-popup
            @click="openDialogChangePassword"
          >
            <q-item-section>
              <q-item-label>تغییر گذرواژه</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-close-popup
            @click="deleteProfile"
          >
            <q-item-section>
              <q-item-label>حذف حساب کاربری</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            to="/auth/login"
            clickable
            v-close-popup
          >
            <q-item-section>
              <q-item-label>خروج</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
  </q-header>

  <dialog-change-password v-model="dialogChangePasswordState" />
</template>

<script setup>
import { ref } from 'vue'
import { api } from 'boot/axios'

import DialogChangePassword from 'components/DialogChangePassword.vue'

defineEmits(['toggleMenu'])

const user = ref({})
const dialogChangePasswordState = ref(false)

async function fetchUser () {
  const { data } = await api.get('/user/2')

  user.value = data
}

function openDialogChangePassword () {
  dialogChangePasswordState.value = true
}

async function deleteProfile () {
  await api.delete('/user/2')
}

fetchUser()
</script>
