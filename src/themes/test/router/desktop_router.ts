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
        component: () => import('@test/views/pc/UserView.vue'),
      },
      {
        path: '/sub',
        name: 'sub',
        component: () => import('@test/views/pc/SubView.vue'),
      },
      {
        path: '/tutorial',
        name: 'tutorial',
        component: () => import('@test/views/pc/tutorial/TutorialView.vue'),
      },
      {
        path: '/t',
        name: 't',
        component: () => import('@test/views/pc/tutorial/TutorialView.vue'),
      },
      {
        path: '/cc',
        name: 'CustomizedConfiguration',
        component: () => import('@test/views/pc/CustomizedConfiguration.vue'),
      },
      {
        path: '/node_list',
        name: 'node_list',
        component: () => import('@test/views/pc/NodeList.vue'),
      },
      {
        path: '/balance',
        name: 'balance',
        component: () => import('@test/views/pc/BalanceView.vue'),
      },
      ...sharedRouter,
    ],
  },
] as RouteRecordRaw[]
