declare const window: any
function getTelegramInitData() {
  const initData = window.Telegram?.WebApp?.initData
  return initData
}
export { getTelegramInitData }
