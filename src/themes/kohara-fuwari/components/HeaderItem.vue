<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  FUWARI_HUE_DEFAULT,
  applyHue,
  applyMode,
  cycleMode,
  readHue,
  readMode,
  type FuwariMode,
} from '@kohara-fuwari/themeMode'

const route = useRoute()

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

const mode = ref<FuwariMode>(readMode())
const hue = ref(readHue())
const showMobileMenu = ref(false)
const showDisplay = ref(false)

const activePath = computed(() => route.path)
const hueIsDefault = computed(() => hue.value === FUWARI_HUE_DEFAULT)

function switchTheme(next: FuwariMode) {
  mode.value = next
  applyMode(next)
  showMobileMenu.value = false
}

function toggleScheme() {
  mode.value = cycleMode(mode.value)
}

function onHueInput(event: Event) {
  const value = Number((event.target as HTMLInputElement).value)
  hue.value = value
  applyHue(value)
}

function resetHue() {
  hue.value = FUWARI_HUE_DEFAULT
  applyHue(FUWARI_HUE_DEFAULT)
}

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value
  showDisplay.value = false
}

function toggleDisplay() {
  showDisplay.value = !showDisplay.value
  showMobileMenu.value = false
}

function closeMobileMenu() {
  showMobileMenu.value = false
}

function onDocumentClick(event: MouseEvent) {
  const target = event.target
  if (!(target instanceof Node)) return
  const display = document.getElementById('display-setting')
  const displayBtn = document.querySelector('[aria-label="主题色"]')
  if (showDisplay.value && display && displayBtn && !display.contains(target) && !displayBtn.contains(target)) {
    showDisplay.value = false
  }
  const menu = document.getElementById('nav-menu-panel')
  const menuBtn = document.getElementById('nav-menu-switch')
  if (showMobileMenu.value && menu && menuBtn && !menu.contains(target) && !menuBtn.contains(target)) {
    showMobileMenu.value = false
  }
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onUnmounted(() => document.removeEventListener('click', onDocumentClick))
</script>

<template>
  <div id="navbar" class="onload-animation">
    <div class="navbar-top-mask"></div>
    <div class="card-base navbar-bar">
      <a href="/" class="btn-plain scale-animation expand-animation brand pressable">
        <img class="brand-mark" src="/favicon.ico" alt="" width="28" height="28" />
        布吉岛
      </a>

      <nav class="nav-links" aria-label="页面">
        <RouterLink
          v-for="item in menu"
          :key="item.path"
          :to="item.path"
          class="btn-plain scale-animation expand-animation pressable"
          :class="{ 'current-theme-btn': activePath === item.path }"
          :aria-current="activePath === item.path ? 'page' : undefined"
        >
          {{ item.name }}
        </RouterLink>
      </nav>

      <div class="nav-tools">
        <button
          type="button"
          class="btn-plain scale-animation expand-animation icon-btn pressable"
          aria-label="主题色"
          :aria-expanded="showDisplay"
          @click="toggleDisplay"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 22q-2.05 0-3.875-.788t-3.187-2.15t-2.15-3.187T2 12q0-2.075.813-3.9t2.2-3.175T8.25 2.788T12.2 2q.65 0 1.2.05t1.1.2q-.35.65-.525 1.363T13.8 5.1q0 2.25 1.575 3.825T19.2 10.5q.725 0 1.438-.2t1.362-.6q.125.55.163 1.1t.037 1.2q0 2.05-.788 3.875t-2.15 3.188t-3.175 2.15T12 22"
            />
          </svg>
        </button>

        <div class="scheme">
          <button
            id="scheme-switch"
            type="button"
            class="btn-plain scale-animation expand-animation icon-btn pressable"
            aria-label="浅色、暗色或跟随系统"
            aria-haspopup="menu"
            @click="toggleScheme"
          >
            <svg v-show="mode === 'light'" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M6.05 4.14l-.39-.39a.993.993 0 0 0-1.4 0l-.01.01a.984.984 0 0 0 0 1.4l.39.39c.39.39 1.01.39 1.4 0l.01-.01a.984.984 0 0 0 0-1.4zM3.01 10.5H1.99c-.55 0-.99.44-.99.99v.01c0 .55.44.99.99.99H3c.56.01 1-.43 1-.98v-.01c0-.56-.44-1-.99-1zm9-9.95H12c-.56 0-1 .44-1 .99v.96c0 .55.44.99.99.99H12c.56.01 1-.43 1-.98v-.97c0-.55-.44-.99-.99-.99zm7.74 3.21c-.39-.39-1.02-.39-1.41-.01l-.39.39a.984.984 0 0 0 0 1.4l.01.01c.39.39 1.02.39 1.4 0l.39-.39a.984.984 0 0 0 0-1.4zm-1.81 15.1l.39.39a.996.996 0 1 0 1.41-1.41l-.39-.39a.993.993 0 0 0-1.4 0c-.4.4-.4 1.02-.01 1.41zM20 11.49v.01c0 .55.44.99.99.99H22c.55 0 .99-.44.99-.99v-.01c0-.55-.44-.99-.99-.99h-1.01c-.55 0-.99.44-.99.99zM12 5.5c-3.31 0-6 2.69-6 6s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6zm-.01 16.95H12c.55 0 .99-.44.99-.99v-.96c0-.55-.44-.99-.99-.99h-.01c-.55 0-.99.44-.99.99v.96c0 .55.44.99.99.99zm-7.74-3.21c.39.39 1.02.39 1.41 0l.39-.39a.993.993 0 0 0 0-1.4l-.01-.01a.996.996 0 0 0-1.41 0l-.39.39c-.38.4-.38 1.02.01 1.41z"
              />
            </svg>
            <svg v-show="mode === 'dark'" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M11.01 3.05C6.51 3.54 3 7.36 3 12a9 9 0 0 0 9 9c4.63 0 8.45-3.5 8.95-8c.09-.79-.78-1.42-1.54-.95A5.403 5.403 0 0 1 11.1 7.5c0-1.06.31-2.06.84-2.89c.45-.67-.04-1.63-.93-1.56z"
              />
            </svg>
            <svg v-show="mode === 'auto'" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 2c1.82 0 3.53.5 5 1.35C14.01 6.83 12 9.89 12 14c0 1.93.52 3.73 1.42 5.27c-.47.1-.94.23-1.42.23c-4.41 0-8-3.59-8-8s3.59-8 8-8m0 16c-.53 0-1.05-.05-1.56-.15C12.15 19.25 13 16.75 13 14c0-3.33-1.6-6.26-4.08-8.12C9.55 5.31 10.73 5 12 5c3.86 0 7 3.14 7 7s-3.14 7-7 7"
              />
            </svg>
          </button>
          <div id="light-dark-panel" class="scheme-panel" role="menu" aria-labelledby="scheme-switch">
            <div class="card-base float-panel">
              <button
                type="button"
                class="btn-plain scale-animation expand-animation pressable"
                :class="{ 'current-theme-btn': mode === 'light' }"
                role="menuitemradio"
                :aria-checked="mode === 'light'"
                @click="switchTheme('light')"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M6.05 4.14l-.39-.39a.993.993 0 0 0-1.4 0l-.01.01a.984.984 0 0 0 0 1.4l.39.39c.39.39 1.01.39 1.4 0l.01-.01a.984.984 0 0 0 0-1.4zM3.01 10.5H1.99c-.55 0-.99.44-.99.99v.01c0 .55.44.99.99.99H3c.56.01 1-.43 1-.98v-.01c0-.56-.44-1-.99-1zm9-9.95H12c-.56 0-1 .44-1 .99v.96c0 .55.44.99.99.99H12c.56.01 1-.43 1-.98v-.97c0-.55-.44-.99-.99-.99zm7.74 3.21c-.39-.39-1.02-.39-1.41-.01l-.39.39a.984.984 0 0 0 0 1.4l.01.01c.39.39 1.02.39 1.4 0l.39-.39a.984.984 0 0 0 0-1.4zm-1.81 15.1l.39.39a.996.996 0 1 0 1.41-1.41l-.39-.39a.993.993 0 0 0-1.4 0c-.4.4-.4 1.02-.01 1.41zM20 11.49v.01c0 .55.44.99.99.99H22c.55 0 .99-.44.99-.99v-.01c0-.55-.44-.99-.99-.99h-1.01c-.55 0-.99.44-.99.99zM12 5.5c-3.31 0-6 2.69-6 6s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6zm-.01 16.95H12c.55 0 .99-.44.99-.99v-.96c0-.55-.44-.99-.99-.99h-.01c-.55 0-.99.44-.99.99v.96c0 .55.44.99.99.99zm-7.74-3.21c.39.39 1.02.39 1.41 0l.39-.39a.993.993 0 0 0 0-1.4l-.01-.01a.996.996 0 0 0-1.41 0l-.39.39c-.38.4-.38 1.02.01 1.41z"
                  />
                </svg>
                浅色
              </button>
              <button
                type="button"
                class="btn-plain scale-animation expand-animation pressable"
                :class="{ 'current-theme-btn': mode === 'dark' }"
                role="menuitemradio"
                :aria-checked="mode === 'dark'"
                @click="switchTheme('dark')"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M11.01 3.05C6.51 3.54 3 7.36 3 12a9 9 0 0 0 9 9c4.63 0 8.45-3.5 8.95-8c.09-.79-.78-1.42-1.54-.95A5.403 5.403 0 0 1 11.1 7.5c0-1.06.31-2.06.84-2.89c.45-.67-.04-1.63-.93-1.56z"
                  />
                </svg>
                暗色
              </button>
              <button
                type="button"
                class="btn-plain scale-animation expand-animation pressable"
                :class="{ 'current-theme-btn': mode === 'auto' }"
                role="menuitemradio"
                :aria-checked="mode === 'auto'"
                @click="switchTheme('auto')"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 2c1.82 0 3.53.5 5 1.35C14.01 6.83 12 9.89 12 14c0 1.93.52 3.73 1.42 5.27c-.47.1-.94.23-1.42.23c-4.41 0-8-3.59-8-8s3.59-8 8-8m0 16c-.53 0-1.05-.05-1.56-.15C12.15 19.25 13 16.75 13 14c0-3.33-1.6-6.26-4.08-8.12C9.55 5.31 10.73 5 12 5c3.86 0 7 3.14 7 7s-3.14 7-7 7"
                  />
                </svg>
                跟随系统
              </button>
            </div>
          </div>
        </div>

        <button
          id="nav-menu-switch"
          type="button"
          class="btn-plain scale-animation expand-animation icon-btn nav-burger pressable"
          aria-label="菜单"
          :aria-expanded="showMobileMenu"
          @click="toggleMobileMenu"
        >
          <svg v-show="!showMobileMenu" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
            />
          </svg>
          <svg v-show="showMobileMenu" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
            />
          </svg>
        </button>
      </div>
    </div>

    <nav
      id="nav-menu-panel"
      class="float-panel"
      :class="{ 'float-panel-closed': !showMobileMenu }"
      aria-label="移动端导航"
    >
      <RouterLink
        v-for="item in menu"
        :key="item.path"
        :to="item.path"
        :aria-current="activePath === item.path ? 'page' : undefined"
        @click="closeMobileMenu"
      >
        <span>{{ item.name }}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z" />
        </svg>
      </RouterLink>
    </nav>

    <div
      id="display-setting"
      class="float-panel"
      :class="{ 'float-panel-closed': !showDisplay }"
    >
      <div class="hue-head">
        <div class="hue-title">
          主题色
          <button
            type="button"
            class="btn-regular hue-reset pressable"
            :class="{ 'is-hidden': hueIsDefault }"
            aria-label="恢复默认色相"
            @click="resetHue"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 6V3L8 7l4 4V8c2.76 0 5 2.24 5 5a5 5 0 0 1-8.9 3.1l-1.42 1.42A7 7 0 0 0 19 13c0-3.87-3.13-7-7-7m-7 7c0-1.28.35-2.48.96-3.52l1.46 1.46A5 5 0 0 0 12 18v3l4-4l-4-4v3a5 5 0 0 1-5-5"
              />
            </svg>
          </button>
        </div>
        <div class="hue-value">{{ hue }}</div>
      </div>
      <div class="hue-track">
        <input
          id="colorSlider"
          aria-label="主题色"
          type="range"
          min="0"
          max="360"
          step="5"
          :value="hue"
          @input="onHueInput"
        />
      </div>
    </div>
  </div>
</template>
