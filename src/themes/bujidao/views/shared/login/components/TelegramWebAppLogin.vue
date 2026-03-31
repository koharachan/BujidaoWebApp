<template>
    <div></div>
</template>
<script setup lang="ts">
import { getTelegramInitData } from '@/utils/telegram'
import { loginWithTelegramWebApp } from '@/utils/user'
import { useUserInfoStore } from '@/stores/userInfoStore'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()

const userInfoStore = useUserInfoStore()
function go_to_user() {
    ElMessage.success('登录成功，跳转到用户中心')
    router.push({
        path: '/user',
        query: {},
    })
}
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