import { LocalStorage } from 'quasar'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    token: LocalStorage.getItem('token') ?? null
  }),

  getters: {
    isAuthorized: (state) => Boolean(state.token)
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
