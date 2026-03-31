<template>
  <RouterView />
</template>
<script setup lang="ts">
import { initTelegram, getTelegramInitData } from '@/utils/telegram'
onMounted(async () => {
  await initTelegram()
  await getTelegramInitData()
})
</script>