import CustomEase from 'gsap/CustomEase'
import gsap from 'gsap/gsap-core'

gsap.registerPlugin(CustomEase)

export const PRELOADER = CustomEase.create('custom', 'M0,0 C0.2,0 0.2,1 1,1')
export const DEFAULT = CustomEase.create('default', '0.77, 0, 0.175, 1')
export const CSS = 'cubic-bezier(0.77, 0, 0.175, 1)'

export const EXPO_OUT = 'cubic-bezier(0.19, 1, 0.22, 1)'
export const EXPO_IN_OUT = 'cubic-bezier(1, 0, 0, 1)'
export const SINE_OUT = 'cubic-bezier(0.39, 0.575, 0.565, 1)'
export const SINE_IN_OUT = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)'
export const BACK_OUT = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
export const BACK_IN_OUT = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'

const PI = Math.PI

export function easeOutSine(x: number) {
  return Math.sin((x * Math.PI) / 2)
}

export function easeInOutSine(x: number) {
  return -(Math.cos(PI * x) - 1) / 2
}

export function easeOutExpo(x: number) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
}

export function easeInOutExpo(x: number) {
  return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2
}

export function easeOutBack(x: number) {
  const c1 = 1.70158
  const c3 = c1 + 1

  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}
