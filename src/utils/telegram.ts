declare const window: any
function getTelegramInitData() {
  const initData = window.Telegram?.WebApp?.initData
  return initData
}
function closeTelegramWebApp() {
  window.Telegram.WebApp.close()
}
export { getTelegramInitData, closeTelegramWebApp }
