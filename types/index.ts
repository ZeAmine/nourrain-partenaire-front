
export interface IType {
  name: string
  value: string
}

declare global {
  interface Window {
    isMobile: boolean
    assets: any
  }

  interface Path {
    from: string | null
    to: string | null
  }

  interface Transition {
    from: HTMLElement | Element
    to: HTMLElement | Element
    trigger: string | false | HTMLElement
    done: () => void
  }

  interface Sizes {
    width: number
    height: number
    aspect: number
    dpr: number
  }

  interface Source {
    type: string
    name: string
    path: string
  }

  interface Scroll {
    current: number
    target: number
    last: number
    velocity: number
    ease: number
  }

  interface Mouse {
    x: number
    y: number
  }

  interface Touch {
    start: number
    distance: number
    end: number
  }

  interface AnimationConfig {
    d: number
    ease: string
    delay: number
    each: number
    from: number | 'start' | 'center' | 'end' | 'edges' | 'random' | [number, number]
    once: boolean
  }
}
