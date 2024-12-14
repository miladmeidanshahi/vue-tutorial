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

      <template #body-cell-actions="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              icon="edit"
              round
              color="blue"
              @click="editUser(props.row)"
            />
            <q-btn
              icon="delete"
              round
              color="red"
              @click="deleteUser(props.row)"
            />
          </div>
        </q-td>
      </template>
    </q-table>

    <user-form
      v-model="userFormModal"
      @success="onSuccess"
      @update="onUpdate"
    />
  </q-page>
</template>

<script setup>
import { provide, ref } from 'vue'

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
  },
  {
    name: 'actions',
    label: 'عملیات',
    align: 'right',
    sortable: false
  }
]

const rows = ref([])
const userData = ref({})
const userFormModal = ref(false)

async function fetchUsers () {
  const { data } = await api.get('/user')

  rows.value = data
}

async function deleteUserRequest (id) {
  await api.delete(`/user/${id}`)
}

function findRowIndex (dataId) {
  return rows.value.findIndex(({ id }) => id === dataId)
}

function onSuccess (data) {
  rows.value.unshift(data)
}

function onUpdate (data) {
  const rowIndex = findRowIndex(data.id)

  rows.value[rowIndex] = data
}

function editUser (data) {
  userData.value = data
  userFormModal.value = true
}

async function deleteUser (data) {
  const result = window.confirm(`آیا شما از حذف ${data.name} کاربر مطمئن هستید؟`)

  if (result) await deleteUserRequest(data.id)

  const rowIndex = findRowIndex(data.id)

  rows.value.splice(rowIndex, 1)
}

fetchUsers()

provide('data', userData)
</script>
