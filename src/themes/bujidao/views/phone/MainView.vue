<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import TelegramImage from '@bujidao/components/icons/TelegramImage.vue'
import UserFilled from '@bujidao/components/icons/UserFilled.vue'
import SubscribeItem from '@bujidao/components/icons/SubscribeItem.vue'
import ListItem from '@bujidao/components/icons/ListItem.vue'
import DarkTheme from '@bujidao/components/DarkTheme.vue'
import { ElMessage } from 'element-plus'
const menu = [
  {
    name: '我的',
    icon: UserFilled,
    path: '/user',
  },
  {
    name: '订阅中心',
    icon: SubscribeItem,
    path: '/sub',
  },
  {
    name: '公告',
    icon: ListItem,
    path: '/announcement',
  },
]
const activePath = computed(() => router.currentRoute.value.path)
const go_telegram = () => {
  ElMessage.info('正在前往群组')
  location.href = 'https://t.me/bujidaoChat'
}
const logout = () => {
  router.push({ path: '/signout' })
}
const go_to = (path: string) => {
  router.push({ path: path })
}
const bujidao = () => {
  location.href = 'https://bujidao.org'
}
</script>
<template>
  <div class="header">
    <div class="telegram" @click="go_telegram()">
      <TelegramImage />
    </div>
    <div>
      <h1 @click="bujidao()">布吉岛</h1>
    </div>
    <div class="logout" @click="logout()">
      <span> 登出 </span>
    </div>
  </div>
  <slot></slot>
  <div class="menu" :style="{ 'grid-template-columns': 'repeat(' + menu.length + ',1fr)' }">
    <div v-for="item in menu" :key="item.name" @click="go_to(item.path)">
      <div class="icon" :class="activePath.includes(item.path) ? 'active' : ''">
        <component :is="item.icon" />
      </div>
      <div class="name">
        {{ item.name }}
      </div>
    </div>
  </div>
  <DarkTheme class="none" />
</template>
<style lang="scss" scoped>
.dark {
  .header {
    background-image: linear-gradient(1deg, #1c1b22f0, #1c1b22fe);
    box-shadow: none;
  }

  .menu {
    background-image: linear-gradient(179deg, #1c1b22f0, #1c1b22fe);
    box-shadow: none;
  }
}

.header {
  position: fixed;
  top: 0px;
  width: 100vw;
  height: 54px;
  padding: 0 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  color: var(--el-text-color-primary);
  background-color: var(--el-bg-color, #fafafa);
  z-index: 1;
  box-shadow: 0 1px 0 var(--el-border-color-lighter, #eee);

  h1 {
    font-size: 18px;
    line-height: 1.2;
    font-weight: 600;
  }

  align-items: center;
  justify-items: center;

  .telegram {
    svg {
      height: 28px !important;
      width: 28px !important;
      fill: var(--el-text-color-regular);
    }
  }

  .logout {
    color: var(--el-text-color-regular);
    padding: 4px 10px;
    border: 1px solid var(--el-border-color);
    border-radius: 6px;
    line-height: 1.4;
  }

  .telegram,
  .logout {
    cursor: pointer;
  }
}

.active svg {
  color: var(--el-color-primary);
  height: 22px !important;
  width: 22px !important;
}

.menu {
  position: fixed;
  bottom: 0px;
  width: 100vw;
  padding: 5px;
  display: grid;
  background-color: var(--el-bg-color, #fff);
  z-index: 1;
  grid-template-rows: 1fr;
  color: var(--el-text-color-regular);
  box-shadow: 0 -1px 0 var(--el-border-color-lighter, #eee);
  padding-bottom: max(5px, env(safe-area-inset-bottom));

  > div {
    display: flex;
    flex-direction: column;
    align-content: center;
    text-align: center;
    line-height: 15px;
    font-size: 11px;
  }

  .icon {
    display: block;

    svg {
      height: 20px;
      width: 20px;
    }
  }
}

.none {
  display: none;
}
</style>
