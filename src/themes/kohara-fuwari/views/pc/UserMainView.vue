<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useUserInfoStore } from '@/stores/userInfoStore'
import HeaderItem from '@kohara-fuwari/components/HeaderItem.vue'

const route = useRoute()
const userInfoStore = useUserInfoStore()
const user = computed(() => userInfoStore.getUserInfo())
const displayName = computed(() => user.value?.email || '布吉岛')
const bio = computed(() => {
  if (!user.value) return '账户尚未登录'
  const balance = Number(user.value.balance ?? 0) / 100
  return `余额 ${balance}`
})
const year = new Date().getFullYear()

const menu = [
  { path: '/user', name: '概览' },
  { path: '/sub', name: '订阅' },
  { path: '/balance', name: '财务' },
  { path: '/announcement', name: '公告' },
  { path: '/node_list', name: '节点' },
  { path: '/tutorial', name: '教程' },
  { path: '/cc', name: '个性化' },
  { path: '/signout', name: '登出' },
]
</script>

<template>
  <div class="fuwari-shell">
  <div class="fuwari-top">
    <div class="fuwari-top-sticky">
      <HeaderItem />
    </div>
  </div>

  <div class="fuwari-panel">
    <div class="fuwari-panel-inner">
      <div id="main-grid">
        <aside id="sidebar" class="onload-animation">
          <div class="card-base profile-card">
            <a class="profile-avatar" href="https://bujidao.org" aria-label="布吉岛官网">
              <img src="/favicon.ico" alt="" width="64" height="64" />
            </a>
            <div class="profile-name">{{ displayName }}</div>
            <div class="profile-rule"></div>
            <div class="profile-bio">{{ bio }}</div>
            <div class="profile-links">
              <a class="btn-regular pressable" href="https://bujidao.org" target="_blank" rel="noopener">官网</a>
              <a class="btn-regular pressable" href="https://t.me/bujidaoChat" target="_blank" rel="noopener">群组</a>
            </div>
          </div>

          <nav class="card-base widget-card" aria-label="账户">
            <div class="widget-title">目录</div>
            <RouterLink
              v-for="item in menu"
              :key="item.path"
              class="side-link"
              :class="{ 'is-current': route.path === item.path }"
              :to="item.path"
              :aria-current="route.path === item.path ? 'page' : undefined"
            >
              <span>{{ item.name }}</span>
            </RouterLink>
          </nav>
        </aside>

        <main id="swup-container">
          <div id="content-wrapper" class="onload-animation">
            <slot></slot>
            <footer class="fuwari-footer onload-animation">
              <p class="text-50">
                &copy; {{ year }} 布吉岛. All Rights Reserved. /
                <a href="https://github.com/saicaca/fuwari" target="_blank" rel="noopener">Fuwari</a>
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  </div>
  </div>
</template>
