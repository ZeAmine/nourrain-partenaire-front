import gsap from 'gsap/gsap-core'

export function lerp(p1: number, p2: number, t: number): number {
  return gsap.utils.interpolate(p1, p2, t)
}

export function clamp(min: number, max: number, number: number): number {
  return gsap.utils.clamp(min, max, number)
}

export function random(min: number, max: number): number {
  return gsap.utils.random(min, max)
}

export function map(valueToMap: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return gsap.utils.mapRange(inMin, inMax, outMin, outMax, valueToMap)
}

/** ------------ Angles **/
export function radToDeg(r: number): number {
  return (r * 180) / Math.PI
}

export function degToRad(d: number): number {
  return (d * Math.PI) / 180
}

/** ------------ Bitwise **/
export const isPowerOfTwo = (n: number): boolean => !!n && (n & (n - 1)) === 0
