<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  checkLoginKey,
  loginWithTelegram,
  loginWithEmail,
  loginWithEmailPasswd,
} from '@/utils/user'
import { useRouter } from 'vue-router'
const router = useRouter()
import { markRaw } from 'vue'
import { ref } from 'vue'
import { Lock, User } from '@element-plus/icons-vue'
import GoogleOauth from '@kohara-fuwari/components/icons/GoogleOauth.vue'
import TelegramImage from '@kohara-fuwari/components/icons/TelegramImage.vue'
import TelegramWhite from '@kohara-fuwari/components/icons/TelegramWhite.vue'

import { applyMode, cycleMode, readMode, type FuwariMode } from '@kohara-fuwari/themeMode'

// Font Awesome 配置
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faShieldAlt,
  faBolt,
  faUserCheck,
  faEnvelope,
  faKey,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'

// 添加图标到库
library.add(faShieldAlt, faBolt, faUserCheck, faEnvelope, faKey, faSpinner)
import { useUserInfoStore } from '@/stores/userInfoStore'
const userInfoStore = useUserInfoStore()
const themeMode = ref<FuwariMode>(readMode())
function cycleTheme() {
  themeMode.value = cycleMode(themeMode.value)
  applyMode(themeMode.value)
}

// 获取邀请码
const inviter = ref()
const login_key = ref()

// 跳转
function go_to_user() {
  ElMessage.success('登录成功，跳转到用户中心')
  router.push({
    path: '/user',
    query: {},
  })
}
if (userInfoStore.getToken()) {
  go_to_user()
}

// TG验证
declare const window: any
const bot_name = import.meta.env.VITE_BOT_NAME
function onTelegramAuth(user: any) {
  loginWithTelegram(user, inviter.value)
    .then((res_data: any) => {
      if (res_data.result) {
        userInfoStore.setToken(res_data.result.login_token)
        go_to_user()
      } else {
        ElMessage.error(res_data.error?.message)
      }
    })
    .catch(() => {
      ElMessage.error('网络错误，请检查网络后重试，如有疑问请联系管理员')
    })
}
window.onTelegramAuth = onTelegramAuth
const bot_id = import.meta.env.VITE_BOT_ID
function telegramDirectAuth() {
  const origin = window.location.origin
  const authUrl = `https://oauth.telegram.org/auth?bot_id=${bot_id}&origin=${encodeURIComponent(origin)}&embed=1&return_to=${encodeURIComponent(origin)}/login`
  // 弹出窗口或重定向
  window.location.href = authUrl
}
function isEmail(email: string) {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(email)
}

const login_with_email_passwd = () => {
  ElMessageBox.prompt('请输入您的邮箱地址', '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern:
      /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: 'Invalid Email',
    inputType: 'email',
    autofocus: true,
    type: 'info',
    icon: markRaw(User),
  })
    .then(({ value }) => {
      let email = value
      ElMessageBox.prompt('请输入您的密码', '', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputType: 'password',
        type: 'info',
        icon: markRaw(Lock),
      })
        .then(({ value }) => {
          let passwd = value
          loginWithEmailPasswd(email, passwd)
            .then((res: any) => {
              if (res.result) {
                ElMessage.success('登陆成功')
                userInfoStore.setToken(res.result.login_token)
                go_to_user()
              } else {
                ElMessage.error(res.error?.message)
              }
            })
            .catch((e: any) => {
              console.log(e)
              ElMessage.error('网络连接失败，请检查网络后重试，如有疑问请联系管理员')
            })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Input canceled',
          })
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      })
    })
}
// 邮件密码登录
const email = ref()
const email_ref = ref()
const passwd = ref()
const login = () => {
  if (!email.value || !passwd.value) {
    ElMessage.warning('请输入邮箱地址和密码')
    return
  }

  // 验证邮箱格式
  const emailRegex =
    /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
  if (!emailRegex.test(email.value)) {
    ElMessage.warning('请输入有效的邮箱地址')
    return
  }

  isLoading.value = true
  loginWithEmailPasswd(email.value, passwd.value)
    .then((res: any) => {
      if (res.result) {
        ElMessage.success('登陆成功')
        userInfoStore.setToken(res.result.login_token)
        go_to_user()
      } else {
        ElMessage.error(res.error?.message || '登录失败，请检查邮箱和密码')
      }
    })
    .catch((e: any) => {
      console.log(e)
      ElMessage.error('网络连接失败，请检查网络后重试，如有疑问请联系管理员')
    })
    .finally(() => {
      isLoading.value = false
    })
}

const login_with_email = () => {
  if (!email.value) {
    ElMessage.warning('请输入您的邮箱地址')
    return
  }

  // 验证邮箱格式
  const emailRegex =
    /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
  if (!emailRegex.test(email.value)) {
    ElMessage.warning('请输入有效的邮箱地址')
    return
  }

  isLoading.value = true
  loginWithEmail(email.value, inviter.value)
    .then((res: any) => {
      if (res.result) {
        ElMessage.success('登陆邮件发送成功，请使用邮件中的登陆链接登陆')
      } else {
        ElMessage.error('邮件发送失败，如邮箱正确，请联系管理员')
        if (res.error?.message) {
          ElMessage.error(res.error?.message)
        }
      }
    })
    .catch((e: any) => {
      console.log(e)
      ElMessage.error('网络连接失败，请检查网络后重试，如有疑问请联系管理员')
    })
    .finally(() => {
      isLoading.value = false
    })
}
// 谷歌登录
const google_id = import.meta.env.VITE_GOOGLE_OAUTH
const google_login = function () {
  location.href =
    'https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=token&redirect_uri=https://app.bujidao.org/google-oauth&client_id=' +
    google_id
}
const init = () => {
  inviter.value = router.currentRoute.value.query.code
    ? router.currentRoute.value.query.code
    : undefined
  if (inviter.value) {
    localStorage.setItem('inviter', inviter.value)
  }
  login_key.value = router.currentRoute.value.query.login_key
    ? router.currentRoute.value.query.login_key
    : undefined
  if (login_key.value != undefined) {
    checkLoginKey(login_key.value)
      .then((res: any) => {
        if (res.result) {
          userInfoStore.setToken(res.result)
          go_to_user()
        } else {
          ElMessage.error(res.error)
        }
      })
      .catch((err: any) => {
        ElMessage.error(err)
      })
  }
}
init()
// 移除弹窗逻辑，直接显示登录表单
const focus_email = () => {
  email_ref.value.focus()
}
// 登录方式切换相关
const activeTab = ref('email') // 默认显示邮件登录
const agreeTerms = ref(false)
const rememberMe = ref(false)
const isLoading = ref(false)

// 切换到邮件登录
const switchToEmail = () => {
  activeTab.value = 'email'
}

// 切换到密码登录
const switchToPassword = () => {
  activeTab.value = 'password'
}

// 页面加载时自动聚焦到邮箱输入框
setTimeout(focus_email, 500)
const go_chat = () => {
  location.href = 'https://bujidaoChat.t.me'
}
</script>

<template>
  <div class="login-main">
    <div class="login-container">
      <!-- 左侧信息区域 -->
      <div class="info-section">
        <div class="info-content">
          <div class="logo-section">
            <div class="brand-lockup">
              <img src="/favicon.ico" alt="" class="logo" width="40" height="40" />
              <span class="logo-text">布吉岛</span>
            </div>
            <button
              type="button"
              class="btn-plain scale-animation expand-animation scheme-mini pressable"
              aria-label="切换浅色或暗色"
              @click="cycleTheme"
            >
              <svg v-if="themeMode !== 'dark'" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M11.01 3.05C6.51 3.54 3 7.36 3 12a9 9 0 0 0 9 9c4.63 0 8.45-3.5 8.95-8c.09-.79-.78-1.42-1.54-.95A5.403 5.403 0 0 1 11.1 7.5c0-1.06.31-2.06.84-2.89c.45-.67-.04-1.63-.93-1.56z"
                />
              </svg>
              <svg v-else viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0-5a1 1 0 0 1 1 1v1.07a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1m0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1M4.22 4.22a1 1 0 0 1 1.42 0l.76.76a1 1 0 0 1-1.42 1.42l-.76-.76a1 1 0 0 1 0-1.42m13.38 13.38a1 1 0 0 1 1.42 0l.76.76a1 1 0 0 1-1.42 1.42l-.76-.76a1 1 0 0 1 0-1.42M2 12a1 1 0 0 1 1-1h1.07a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1m18 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1M4.22 19.78a1 1 0 0 1 0-1.42l.76-.76a1 1 0 1 1 1.42 1.42l-.76.76a1 1 0 0 1-1.42 0m13.38-13.38a1 1 0 0 1 0-1.42l.76-.76a1 1 0 1 1 1.42 1.42l-.76.76a1 1 0 0 1-1.42 0"
                />
              </svg>
            </button>
          </div>

          <h1 class="welcome-title">欢迎回来</h1>
          <p class="welcome-text">
            布吉岛什么都布吉岛
          </p>
        </div>
        <div class="copyright">
          <p>© 2026 布吉岛. 保留所有权利。</p>
        </div>
      </div>

      <!-- 右侧登录区域 -->
      <div class="login-section">
        <div class="login-content">
          <div class="login-header">
            <h2 class="login-title">登录您的账户</h2>
            <p class="login-subtitle">选择您喜欢的登录方式</p>
          </div>

          <!-- 登录方式切换标签 -->
          <div class="login-tabs">
            <button
              id="email-tab"
              class="tab-button"
              :class="{ 'tab-active': activeTab === 'email' }"
              @click="switchToEmail"
            >
              <FontAwesomeIcon icon="fa-solid fa-envelope" class="mr-2" />邮件登录
            </button>
            <button
              id="password-tab"
              class="tab-button"
              :class="{ 'tab-active': activeTab === 'password' }"
              @click="switchToPassword"
            >
              <FontAwesomeIcon icon="fa-solid fa-key" class="mr-2" />账号密码登录
            </button>
          </div>

          <!-- 邮件登录表单 -->
          <form v-if="activeTab === 'email'" @submit.prevent="login_with_email" class="login-form">
            <div class="form-group">
              <label for="email" class="form-label">邮箱地址</label>
              <el-input
                v-model="email"
                @keyup.enter="login_with_email"
                placeholder="请输入您的邮箱地址"
                type="email"
                autocomplete
                autofocus
                ref="email_ref"
                :prefix-icon="User"
                class="form-input"
              />
              <p class="form-hint">我们将向该邮箱发送一个安全的登录链接</p>
            </div>

            <el-button
              type="primary"
              size="large"
              @click="login_with_email"
              class="submit-button"
              :loading="isLoading"
            >
              <span v-if="!isLoading">发送登录链接</span>
              <span v-else
                ><FontAwesomeIcon icon="fa-solid fa-spinner" class="fa-spin mr-2" />发送中...</span
              >
            </el-button>
          </form>

          <!-- 密码登录表单 -->
          <form v-else @submit.prevent="login" class="login-form">
            <div class="form-group">
              <label for="email" class="form-label">邮箱地址</label>
              <el-input
                v-model="email"
                @keyup.enter="login"
                placeholder="您的邮箱地址"
                type="email"
                autocomplete
                autofocus
                ref="email_ref"
                :prefix-icon="User"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label for="passwd" class="form-label">密码</label>
              <el-input
                v-model="passwd"
                @keyup.enter="login"
                type="password"
                placeholder="您的密码"
                show-password
                autocomplete
                :prefix-icon="Lock"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <div class="checkbox-group">
                <input id="remember" type="checkbox" v-model="rememberMe" class="custom-checkbox" />
                <label for="remember" class="checkbox-label">记住我</label>
              </div>
              <a href="#" class="forgot-password">忘记密码？</a>
            </div>

            <el-button
              type="primary"
              size="large"
              @click="login"
              class="submit-button"
              :loading="isLoading"
            >
              <span v-if="!isLoading">登录</span>
              <span v-else
                ><FontAwesomeIcon icon="fa-solid fa-spinner" class="fa-spin mr-2" />登录中...</span
              >
            </el-button>
          </form>

          <!-- 第三方登录 -->
          <div class="third-party-login">
            <div class="divider">
              <div class="divider-line"></div>
              <span class="divider-text">第三方登录</span>
              <div class="divider-line"></div>
            </div>

            <div class="third-party-buttons">
              <el-button
                type="primary"
                size="large"
                @click="google_login"
                class="third-party-button"
              >
                <GoogleOauth />使用谷歌账号登录或注册
              </el-button>
              <el-button
                type="primary"
                size="large"
                @click="telegramDirectAuth"
                class="third-party-button"
              >
                <TelegramWhite />使用 Telegram 登录或注册
              </el-button>

              <div class="telegram-widget" style="display: none">
                <component
                  :is="'script'"
                  async
                  src="https://telegram.org/js/telegram-widget.js?22"
                  :data-telegram-login="bot_name"
                  data-size="large"
                  data-onauth="window.onTelegramAuth(user)"
                >
                </component>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <button type="button" class="help" aria-label="前往群组" @click="go_chat()">
    <TelegramImage />
  </button>
</template>

