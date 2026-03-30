export default [
  {
    path: '/signout',
    name: 'signout',
    component: () => import('@bujidao/views/shared/SignOut.vue'),
  },
  {
    path: '/google-oauth',
    name: 'google_oauth',
    component: () => import('@bujidao/views/shared/GoogleOauth.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@bujidao/views/shared/login/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@bujidao/views/shared/login/LoginView.vue'),
  },
  {
    path: '/gateway/unsubscribe',
    name: 'unsubscribe',
    component: () => import('@bujidao/views/shared/Unsubscribe.vue'),
  },
]
