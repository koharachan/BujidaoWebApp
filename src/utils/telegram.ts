declare const window: any
let Telegram: any = null
async function initTelegram() {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    Telegram = window.Telegram.WebApp
  }
}
async function getTelegramInitData() {
  if (Telegram?.WebApp?.initData) {
    alert(Telegram?.WebApp?.initData)
  }
}
export { Telegram, initTelegram, getTelegramInitData }
