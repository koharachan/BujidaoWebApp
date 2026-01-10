export default [
  {
    path: '/signout',
    name: 'signout',
    component: () => import('@test/views/shared/SignOut.vue'),
  },
  {
    path: '/google-oauth',
    name: 'google_oauth',
    component: () => import('@test/views/shared/GoogleOauth.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@test/views/shared/login/LoginView.vue'),
  },
  {
    path: '/announcement',
    name: 'Announcement',
    component: () => import('@test/views/pc/AnnouncementView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@test/views/shared/login/LoginView.vue'),
  },
  {
    path: '/gateway/unsubscribe',
    name: 'unsubscribe',
    component: () => import('@test/views/shared/Unsubscribe.vue'),
  },
]
