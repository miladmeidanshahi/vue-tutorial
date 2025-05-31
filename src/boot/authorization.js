import { defineBoot } from '#q-app/wrappers'
import { useAppStore } from 'stores/app-store'

export default defineBoot(({ router }) => {
  const appStore = useAppStore()

  router.beforeEach((to, from, next) => {
    if (appStore.isAuthorized || to.meta.requiresAuth === false) next()
    else {
      if (to.name !== 'LoginPage') next({ name: 'LoginPage' })
      else next()
    }
  })
})
