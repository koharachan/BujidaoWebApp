import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { getUserInfo as fetchUserInfo } from '@/utils/user'
export interface UserInfo {
  user_id: string
  user_name: string | null
  email: string | null
  telegram_id: number | null
  balance: number
  rebate: number
  points: number
  tron_address: string | null
  xmr_address: string | null
  sub_address: string[]
  email_opt_in: number
}
interface UserInfoStore {
  userInfo: Ref<UserInfo | null>
  token: Ref<string | null>
  setUserInfo: (userInfo: UserInfo) => void
  getUserInfo: () => UserInfo | null
  setToken: (token: string | null) => void
  getToken: () => string | null
  clearUserInfo: () => void
  updateUserInfo: () => Promise<void>
}
export const useUserInfoStore = defineStore(
  'userInfo',
  (): UserInfoStore => {
    const userInfo = ref<UserInfo | null>(null)
    const token = ref<string | null>(null)
    const setUserInfo = (newUserInfo: UserInfo) => {
      userInfo.value = newUserInfo
    }
    const getUserInfo = () => {
      return userInfo.value
    }
    const setToken = (newToken: string | null) => {
      token.value = newToken
    }
    const getToken = () => {
      return token.value
    }
    const clearUserInfo = () => {
      userInfo.value = null
      token.value = null
    }
    let updateUserInfoPromise: Promise<void> | null = null
    const updateUserInfo = async () => {
      // 如果已经有更新在进行，返回现有的Promise
      if (updateUserInfoPromise) {
        return updateUserInfoPromise
      }
      // 创建新的更新Promise
      updateUserInfoPromise = (async () => {
        try {
          const res = await fetchUserInfo()
          if (res.result) {
            userInfo.value = res.result
          }
          if (res.error) {
            clearUserInfo()
            window.location.href = '/'
          }
        } finally {
          // 更新完成后清除Promise引用
          updateUserInfoPromise = null
        }
      })()
      return updateUserInfoPromise
    }
    return {
      userInfo,
      token,
      setUserInfo,
      getUserInfo,
      setToken,
      getToken,
      clearUserInfo,
      updateUserInfo,
    }
  },
  {
    persist: true,
  },
)
