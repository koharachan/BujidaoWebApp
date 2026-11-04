<template>
  <RouterView />
  <ScreenSize />
  <ThemeSwitcher />
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import ScreenSize from '@bujidao/components/ScreenSize.vue'
import ThemeSwitcher from '@bujidao/components/ThemeSwitcher.vue'
</script>
<style lang="scss">
.box {
  background-color: var(--el-bg-color, #fff);
}

.dark {
  .box {
    background-color: var(--el-bg-color, #2e303d) !important;
  }

  .box.phone {
    padding: 8px;
  }
}
</style>
