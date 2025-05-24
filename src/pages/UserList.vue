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
    </q-table>
  </q-page>
</template>

<script setup>
import { api } from 'boot/axios'
import { onMounted, reactive } from 'vue'

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
  }
]

const state = reactive({
  rows: [],
  filter: null,
  loading: false,
  tableRef: null,
  selected: [],
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

onMounted(() => {
  state.tableRef.requestServerInteraction()
})
</script>