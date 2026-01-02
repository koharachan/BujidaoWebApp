import type { RouteRecordRaw } from 'vue-router'
export default [
  {
    path: '/',
    redirect: '/user',
    // 用于全局挂载一些奇奇怪怪的东西
    component: () => import('@bujidao/views/MainLayout.vue'),
    children: [
      {
        path: '/user',
        name: 'user',
        component: () => import('@bujidao/views/phone/UserView.vue'),
      },
      {
        path: '/sub',
        name: 'sub',
        component: () => import('@bujidao/views/phone/SubView.vue'),
      },
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
        component: () => import('@bujidao/views/shared/LoginView.vue'),
      },
      {
        path: '/announcement',
        name: 'Announcement',
        component: () => import('@bujidao/views/phone/AnnouncementView.vue'),
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@bujidao/views/shared/LoginView.vue'),
      },
      {
        path: '/gateway/unsubscribe',
        name: 'unsubscribe',
        component: () => import('@bujidao/views/shared/Unsubscribe.vue'),
      },
    ],
  },
] as RouteRecordRaw[]
