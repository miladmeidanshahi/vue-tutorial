<template>
  <q-page padding>
    <q-table
      selection="multiple"
      row-key="id"
      :rows="state.rows"
      :columns="columns"
      v-model:selected="state.selected"
    >
      <template #body-cell-avatar="props">
        <q-td :props="props">
          <q-img :src="props.value"></q-img>
        </q-td>
      </template>

      <template #body-cell-full-name="props">
        <q-td :props="props">
          <q-chip>
            {{ props.value }}
          </q-chip>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { reactive } from 'vue';

const columns = [
  {
    name: 'avatar',
    align: 'left',
    field: 'avatar',
    sortable: false
  },
  {
    name: 'id',
    label: 'سناسه',
    align: 'left',
    field: 'id',
    sortable: true,
    classes: 'bg-grey-2'
  },
  {
    name: 'full-name',
    label: 'نام نام خانوادگی',
    align: 'left',
    field: ({ first_name, last_name }) => `${first_name} ${last_name}`,
    sortable: true
  },
  {
    name: 'email',
    label: 'ایمیل',
    align: 'left',
    field: 'email',
    sortable: true
  },
  {
    name: 'role',
    label: 'نقش',
    align: 'left',
    field: 'role',
    format: row => row.label,
    sortable: true
  }
]

const state = reactive({
  rows: [
    {
      id: 1,
      avatar: 'https://cdn.quasar.dev/img/avatar.png',
      first_name: 'میلاد',
      last_name: 'عباسی',
      email: 'milad@gmail.com',
      role: {
        id: '',
        label: 'admin'
      }
    },
    {
      id: 2,
      avatar: 'https://cdn.quasar.dev/img/avatar.png',
      first_name: 'رضا',
      last_name: 'عباسی',
      email: 'milad@gmail.com',
      role: {
        id: '',
        label: 'staf'
      }
    },
    {
      id: 3,
      avatar: 'https://cdn.quasar.dev/img/avatar.png',
      first_name: 'حسن',
      last_name: 'عباسی',
      email: 'milad@gmail.com',
      role: {
        id: '',
        label: 'guest'
      }
    },
    {
      id: 4,
      avatar: 'https://cdn.quasar.dev/img/avatar.png',
      first_name: 'علی',
      last_name: 'عباسی',
      email: 'milad@gmail.com',
      role: {
        id: '',
        label: 'user'
      }
    }
  ],
  selected: []
})
</script>