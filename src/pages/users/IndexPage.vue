<template>
  <q-page padding>
    <q-table
      :ref="el => state.tableRef = el"
      title="لیست کاربران"
      selection="multiple"
      row-key="id"
      :filter="state.filter"
      :rows="state.rows"
      :columns="columns"
      :loading="state.loading"
      :rows-per-page-options="[5, 10, 20]"
      v-model:pagination="state.pagination"
      v-model:selected="state.selected"
      @request="fetchList"
    >
      <template v-slot:top-right>
        <q-btn
          label="کاربر جدید"
          color="primary"
          class="q-mr-md"
          @click="state.dialogForm = true"
        />
        <q-input borderless dense debounce="300" v-model="state.filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

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

      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            icon="edit"
            color="primary"
            dense
            @click="userEdit(props.row)"
          />
          <q-btn
            flat
            round
            icon="delete"
            color="negative"
            dense
            @click="deleteUserDialog(props.row.id)"
          />
          <q-btn
            :to="{ name: 'UserViewPage', params: { id: props.row.id } }"
            flat
            round
            icon="visibility"
            color="primary"
            dense
          />
        </q-td>
      </template>
    </q-table>

    <dialog-form
      v-model="state.dialogForm"
      :form-data="state.rowData"
      @success="onSuccessEdit"
      @hide="onDialogFormHide"
    />

    <dialog-confirm
      v-model="state.dialogConfirm"
      :id="state.rowData.id"
      @success="onSuccessDelete"
    />
  </q-page>
</template>

<script setup>
import { api } from 'boot/axios'
import { onMounted, reactive } from 'vue'

import DialogForm from 'components/user-list/DialogForm.vue'
import DialogConfirm from 'components/user-list/DialogConfirm.vue'

const columns = [
  {
    name: 'avatar',
    align: 'left',
    field: 'image',
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
    field: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    sortable: true
  },
  {
    name: 'gender',
    label: 'جنسیت',
    align: 'left',
    field: 'gender',
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
    sortable: true
  },
  {
    name: 'actions',
    label: 'عملیات',
    align: 'left'
  }
]

const state = reactive({
  rows: [],
  filter: null,
  rowData: {},
  loading: false,
  tableRef: null,
  selected: [],
  dialogForm: false,
  dialogConfirm: false,
  pagination: {
    page: 0,
    sortBy: 'id',
    descending: false,
    rowsNumber: 0,
    rowsPerPage: 10
  }
})


async function fetchList({ filter, pagination }) {
  const { page, sortBy, descending, rowsPerPage } = pagination

  state.loading = true

  try {
    const { data } = await api.get('/users/search', {
      params: {
        q: filter,
        skip: (page - 1) * rowsPerPage,
        limit: rowsPerPage,
        sortBy,
        order: descending ? 'desc' : 'asc'
      }
    })

    state.pagination.page = page
    state.pagination.sortBy = sortBy
    state.pagination.descending = descending
    state.pagination.rowsNumber = data.total
    state.pagination.rowsPerPage = rowsPerPage

    state.rows = data.users
  } finally {
    state.loading = false
  }
}

function userEdit (data) {
  state.rowData = data
  state.dialogForm = true
}

function onDialogFormHide () {
  state.rowData = {}
}

function onSuccessEdit ({ data, isEdit }) {
  if (isEdit) {
    const index = state.rows.findIndex(item => item.id === data.id)

    state.rows.splice(index, 1, data)
  } else {
    state.rows.unshift(data)
  }
}

function onSuccessDelete () {
  const id = state.rowData.id
  const index = state.rows.findIndex(item => item.id === id)

  state.rows.splice(index, 1)
  state.rowData = {}
}

async function deleteUserDialog (id) {
  state.rowData = { id }
  state.dialogConfirm = true
}

onMounted(() => {
  state.tableRef.requestServerInteraction()
})
</script>