import { easeOutExpo } from '@/vendor/easings'
import Lenis from '@studio-freight/lenis'

interface ScrollOptions {
  scroll: number
  limit: number
  velocity: number
  progress: number
}

export default class Scroll extends Lenis {
  public isActive: boolean
  public time: number
  public y!: number
  public max!: number
  public speed!: number
  public percent!: number

  constructor() {
    super({
      duration: 1.6,
      smoothWheel: true,
      easing: easeOutExpo,
      orientation: 'vertical',
      smoothTouch: false,
      touchMultiplier: 2
    })

    this.time = 0
    this.isActive = true

    this.init()
    this.render()
  }

  public init() {
    this.y = window.scrollY
    this.max = window.innerHeight
    this.speed = 0
    this.percent = 0

    this.on('scroll', ({ scroll, limit, velocity, progress }: ScrollOptions) => {
      this.y = scroll || 0
      this.max = limit || window.innerHeight
      this.speed = velocity || 0
      this.percent = progress || 0
    })
  }

  public scrollZero() {
    setTimeout(() => this.scrollTo(0, { immediate: true }), 5)
  }

  public scrollToTarget(target: number, center = true, duration = 2) {
    this.scrollTo(target, {
      offset: center ? -window.innerHeight / 2 : 0,
      duration,
      easing: easeOutExpo
    })
  }

  /**
   * Resize.
   */
  public resize() { }

  /**
   * Update.
   */
  public render(time: number = 0) {
    if (!this.isActive) {
      return
    }

    this.raf(time)

    window.requestAnimationFrame(this.render.bind(this))
  }

  /**
   * Request animation frame.
   */
  public set active(value: boolean) {
    this.isActive = value
  }
}
