<template>
  <q-page padding>
    <q-table
      :ref="el => tableRef = el"
      title="لیست کاربران"
      selection="multiple"
      row-key="id"
      :filter="filter"
      :rows="rows"
      :columns="columns"
      :loading="loading"
      :rows-per-page-options="[5, 10, 20]"
      v-model:pagination="pagination"
      v-model:selected="selected"
      @request="fetchList"
    >
      <template v-slot:top-right>
        <q-btn
          label="کاربر جدید"
          color="primary"
          class="q-mr-md"
          @click="dialogForm = true"
        />
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
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

    <dialog-form-cmp
      v-model="dialogForm"
      :form-data="rowData"
      @success="onSuccessEdit"
      @hide="onDialogFormHide"
    />

    <dialog-confirm-cmp
      v-model="dialogConfirm"
      :id="rowData.id"
      @success="onSuccessDelete"
    />
  </q-page>
</template>

<script setup>
import { useUserList } from 'src/compositions/useUserList.js'

import DialogFormCmp from 'components/user-list/DialogForm.vue'
import DialogConfirmCmp from 'components/user-list/DialogConfirm.vue'

const {
  rows,
  filter,
  rowData,
  columns,
  loading,
  tableRef,
  selected,
  userEdit,
  fetchList,
  dialogForm,
  pagination,
  onSuccessEdit,
  dialogConfirm,
  onSuccessDelete,
  onDialogFormHide,
  deleteUserDialog
} = useUserList()
</script>