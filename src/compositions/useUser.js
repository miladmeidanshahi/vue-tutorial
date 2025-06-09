import { api } from 'boot/axios'
import { onMounted, reactive, toRefs } from 'vue'

const state = reactive({
  user: null
})

export function useUser () {
  async function fetchUser () {
    const { data } = await api('/user/me')

    state.user = data
  }

  onMounted(() => {
    if (!state.user) fetchUser()
  })

  return {
    ...toRefs(state),
    fetchUser
  }
}