const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'HomePage',
        meta: {
          requiresAuth: true
        },
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'users',
        name: 'UsersPage',
        meta: {
          requiresAuth: true
        },
        component: () => import('pages/users/IndexPage.vue')
      },
      {
        path: 'users/:id',
        name: 'UserViewPage',
        meta: {
          requiresAuth: true
        },
        component: () => import('pages/users/ViewPage.vue')
      }
    ]
  },
  {
    path: '/auth',
    meta: {
      requiresAuth: false
    },
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      {
        path: 'public',
        name: 'PublicPage',
        meta: {
          requiresAuth: false
        },
        component: () => import('pages/PublicPage.vue')
      },
      {
        path: 'login',
        name: 'LoginPage',
        component: () => import('pages/AuthLogin.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
