<template>
  <q-page>
    <q-table
      title="لیست کاربران"
      :rows="rows"
      :columns="columns"
    >
      <template #body-cell-color="props">
        <q-td :props="props">
          <q-chip
            color="black"
            text-color="white"
            :label="props.row.color"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

import { api } from 'boot/axios'

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

async function fetchUsers () {
  const { data } = await api.get('/user')

  rows.value = data
}

fetchUsers()
</script>
