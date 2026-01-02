import { ElMessage } from 'element-plus'

const copy = async (msg: string) => {
  try {
    // 使用原生 Clipboard API 复制
    await navigator.clipboard.writeText(msg)
    ElMessage({
      message: '复制成功',
      type: 'success',
    })
    // 复制成功
  } catch (e) {
    // 复制失败
    ElMessage({
      message:
        '复制失败，喵也不知道为什么，反馈吧，开发环境就不要反馈了，应该是因为地址不是localhost并且没有https' +
        e,
      type: 'error',
    })
  }
}

function touchCopy(v: string) {
  // 调用
  copy(v)
}

export { touchCopy }
