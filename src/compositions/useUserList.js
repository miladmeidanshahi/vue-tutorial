import { api } from 'boot/axios'
import { onMounted, reactive, toRefs } from 'vue'

export function useUserList() {
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

  return {
    ...toRefs(state),
    columns,
    userEdit,
    fetchList,
    onDialogFormHide,
    onSuccessEdit,
    onSuccessDelete,
    deleteUserDialog
  }
}