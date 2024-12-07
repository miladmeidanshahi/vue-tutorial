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
        label="میلاد میدانشاهی"
        stretch
      >
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

import DialogChangePassword from 'components/DialogChangePassword.vue'

defineEmits(['toggleMenu'])

const dialogChangePasswordState = ref(false)

function openDialogChangePassword () {
  dialogChangePasswordState.value = true
}
</script>
