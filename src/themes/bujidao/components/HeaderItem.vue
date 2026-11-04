<script setup lang="ts">
import ThemeDark from './icons/ThemeDark.vue'
import TelegramMark from './icons/TelegramMark.vue'
import GithubMark from './icons/GithubMark.vue'
</script>

<template>
  <div class="header box">
    <div></div>
    <h1>百慕大里的小小布吉岛～</h1>
    <div class="icons">
      <div>
        <TelegramMark />
      </div>
      <div>
        <GithubMark />
      </div>
      <div>
        <ThemeDark />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.dark {
  .header {
    border-color: var(--el-border-color, #414243);
    background-color: var(--el-bg-color, #1c1b22);
  }
}

.header {
  height: 60px !important;
  width: 100%;
  position: fixed;
  z-index: 999;
  border-bottom: 1px solid var(--el-border-color-lighter, #eee);
  background-color: var(--el-bg-color, rgba(250, 250, 250, 0.96));
  display: grid;
  grid-template-columns: 1fr minmax(0, 3fr) 1fr;
  align-items: center;

  .icons {
    margin-right: 12px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    > div {
      margin-right: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      border-radius: 8px;
    }

    > div:focus-visible {
      outline: 2px solid var(--el-color-primary);
      outline-offset: 2px;
    }

    :deep(svg) {
      width: 32px;
      height: 32px;
    }
  }

  h1 {
    text-align: center;
    line-height: 1.2;
    font-size: clamp(16px, 2.2vw, 22px);
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 8px;
  }
}

@media (max-width: 640px) {
  .header {
    grid-template-columns: auto minmax(0, 1fr) auto;
    padding-left: 8px;

    h1 {
      font-size: 16px;
    }

    .icons {
      margin-right: 4px;
    }

    .icons > div {
      margin-right: 6px;
    }
  }
}
</style>
