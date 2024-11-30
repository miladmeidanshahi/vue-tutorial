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
const columns = [
  {
    name: 'firstName',
    label: 'نام',
    align: 'left',
    field: 'firstName',
    sortable: true
  },
  {
    name: 'lastName',
    label: 'نام خانوادگی',
    align: 'left',
    field: 'lastName',
    sortable: true
  },
  {
    name: 'color',
    label: 'رنگ',
    align: 'left',
    field: 'color',
    format: value => `${value} را دوست دارم`,
    sortable: true
  }
]

const rows = [
  {
    firstName: 'میلاد',
    lastName: 'میدانشاهی',
    color: 'مشکی'
  },
  {
    firstName: 'علی',
    lastName: 'میدانشاهی',
    color: 'مشکی'
  },
  {
    firstName: 'حسن',
    lastName: 'میدانشاهی',
    color: 'مشکی'
  }
]
</script>
