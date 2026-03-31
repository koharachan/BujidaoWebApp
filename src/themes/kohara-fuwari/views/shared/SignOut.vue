<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useUserInfoStore } from '@/stores/userInfoStore'
import { useRouter } from 'vue-router'
import { closeTelegramWebApp } from '@/utils/telegram'
const router = useRouter()

const userInfoStore = useUserInfoStore()
userInfoStore.clearUserInfo()
ElMessage.success('已退出登录')
setTimeout(() => {
closeTelegramWebApp()
}, 233)
setTimeout(() => {
  router.push({
    path: '/login',
    query: {},
  })
}, 1000)
</script>
