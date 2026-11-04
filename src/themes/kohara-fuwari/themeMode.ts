/** Theme mode + hue, matching saicaca/fuwari `setting-utils` (light | dark | auto, default hue 250). */

export type FuwariMode = 'light' | 'dark' | 'auto'

export const FUWARI_HUE_DEFAULT = 250

// Pinia already persists the skin name under `theme`. Fuwari's upstream key is the same
// string, so the color mode lives beside it and only borrows `theme` when that value
// is exactly light/dark/auto (a fresh Fuwari profile, not the Pinia JSON blob).
const MODE_KEY = 'fuwari-color-mode'
const LEGACY_MODE_KEY = 'app-theme-mode'
const HUE_KEY = 'hue'

let booted = false

function asMode(value: string | null): FuwariMode | null {
  if (value === 'light' || value === 'dark' || value === 'auto') return value
  if (value === 'system') return 'auto'
  return null
}

export function readMode(): FuwariMode {
  return (
    asMode(localStorage.getItem(MODE_KEY)) ||
    asMode(localStorage.getItem(LEGACY_MODE_KEY)) ||
    asMode(localStorage.getItem('theme')) ||
    'auto'
  )
}

export function readHue(): number {
  const stored = localStorage.getItem(HUE_KEY)
  const hue = stored ? Number.parseInt(stored, 10) : FUWARI_HUE_DEFAULT
  if (Number.isNaN(hue)) return FUWARI_HUE_DEFAULT
  return Math.min(360, Math.max(0, hue))
}

export function applyHue(hue: number) {
  const next = Math.min(360, Math.max(0, Math.round(hue)))
  localStorage.setItem(HUE_KEY, String(next))
  document.documentElement.style.setProperty('--hue', String(next))
}

export function applyMode(mode: FuwariMode) {
  const dark =
    mode === 'dark' ||
    (mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem(MODE_KEY, mode)
}

export function cycleMode(mode: FuwariMode): FuwariMode {
  const seq: FuwariMode[] = ['light', 'dark', 'auto']
  const index = seq.indexOf(mode)
  const next = seq[(index + 1) % seq.length] ?? 'auto'
  applyMode(next)
  return next
}

export function initFuwariDocument() {
  if (typeof document === 'undefined') return
  document.documentElement.classList.add('skin-kohara-fuwari')
  applyMode(readMode())
  applyHue(readHue())
  if (booted) return
  booted = true
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (readMode() === 'auto') applyMode('auto')
  })
}
