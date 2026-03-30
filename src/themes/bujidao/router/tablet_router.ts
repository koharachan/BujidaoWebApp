import type { RouteRecordRaw } from 'vue-router'
import sharedRouter from './shared_router'
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
        component: () => import('@bujidao/views/pc/UserView.vue'),
      },
      {
        path: '/sub',
        name: 'sub',
        component: () => import('@bujidao/views/pc/SubView.vue'),
      },
      {
        path: '/tutorial',
        name: 'tutorial',
        component: () => import('@bujidao/views/pc/tutorial/TutorialView.vue'),
      },
      {
        path: '/t',
        name: 't',
        component: () => import('@bujidao/views/pc/tutorial/TutorialView.vue'),
      },
      {
        path: '/cc',
        name: 'CustomizedConfiguration',
        component: () => import('@bujidao/views/pc/CustomizedConfiguration.vue'),
      },
      {
        path: '/node_list',
        name: 'node_list',
        component: () => import('@bujidao/views/pc/NodeList.vue'),
      },
      {
        path: '/balance',
        name: 'balance',
        component: () => import('@bujidao/views/pc/BalanceView.vue'),
      },
      {
        path: '/announcement',
        name: 'Announcement',
        component: () => import('@bujidao/views/pc/AnnouncementView.vue'),
      },
      ...sharedRouter,
    ],
  },
] as RouteRecordRaw[]
