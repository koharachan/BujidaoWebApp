import type { RouteRecordRaw } from 'vue-router'
import sharedRouter from './shared_router'
export default [
  {
    path: '/',
    redirect: '/user',
    // 用于全局挂载一些奇奇怪怪的东西
    component: () => import('@test/views/MainLayout.vue'),
    children: [
      {
        path: '/user',
        name: 'user',
        component: () => import('@test/views/phone/UserView.vue'),
      },
      {
        path: '/sub',
        name: 'sub',
        component: () => import('@test/views/phone/SubView.vue'),
      },
      ...sharedRouter,
    ],
  },
] as RouteRecordRaw[]
