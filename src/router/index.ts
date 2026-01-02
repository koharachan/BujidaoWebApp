import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 创建一个空路由数组，稍后会在 main.ts 中通过 theme store 动态添加路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [] as RouteRecordRaw[],
})

export default router
