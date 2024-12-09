<template>
  <q-page>
    <q-table
      title="لیست کاربران"
      :rows="rows"
      :columns="columns"
    >
      <template #top-right>
        <q-btn
          label="افزودن کاربر جدید"
          color="primary"
          @click="userFormModal = true"
        />
      </template>

      <template #body-cell-color="props">
        <q-td :props="props">
          <q-chip
            color="black"
            text-color="white"
            :label="props.row.color"
          />
        </q-td>
      </template>

      <template #body-cell-avatar="props">
        <q-td :props="props">
          <q-avatar size="45px">
            <img :src="props.value">
          </q-avatar>
        </q-td>
      </template>
    </q-table>

    <user-form
      v-model="userFormModal"
      @success="onSuccess"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

import { api } from 'boot/axios'

import UserForm from 'components/UserForm.vue'

const columns = [
  {
    name: 'name',
    label: 'نام و نام خانوادگی',
    align: 'left',
    field: 'name',
    sortable: true
  },
  {
    name: 'email',
    label: 'پست الکترونیک',
    align: 'left',
    field: 'email',
    sortable: true
  },
  {
    name: 'avatar',
    label: 'آواتار',
    align: 'left',
    field: 'avatar',
    sortable: false
  }
]

const rows = ref([])
const userFormModal = ref(false)

async function fetchUsers () {
  const { data } = await api.get('/user')

  rows.value = data
}

function onSuccess (data) {
  rows.value.unshift(data)
}

fetchUsers()
</script>
