<template>
    <div></div>
</template>
<script setup lang="ts">
</script>
<script setup lang="ts">
import { getTelegramInitData } from '@/utils/telegram'
import { loginWithTelegramWebApp } from '@/utils/user'
onMounted(() => {
  const initData = getTelegramInitData()
  if (initData) {
    loginWithTelegramWebApp(initData)
      .then((res_data: any) => {
        if (res_data.result) {
          userInfoStore.setToken(res_data.result.login_token)
          go_to_user()
        } else {
          ElMessage.error(res_data.error?.message)
        }
      })
  }
})
</script>