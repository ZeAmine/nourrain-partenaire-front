import { gsap } from 'gsap/gsap-core'

import { Observe } from '../observe'

export class Alpha extends Observe {
  public element: HTMLElement
  private anim: AnimationConfig
  private animated: Element
  private animation!: gsap.core.Tween | null

  constructor({ element }: { element: HTMLElement }) {
    super({
      element,
      config: {
        root: null,
        margin: '10px',
        threshold: 0.3
      }
    })

    this.anim = {
      d: window.isMobile ? 0.87 : 1.2,
      ease: 'expo.out',
      delay: window.isMobile ? 0.05 : 0.1,
      each: 0.05,
      from: 'start',
      once: false
    }

    this.element = element
    this.animated = this.element

    this.setOut()
  }

  isIn(): void {
    this.animateIn()

    if (this.anim.once) {
      this.stop()
    }
  }

  isOut(): void {
    this.setOut()
  }

  animateIn(): void {
    this.animation?.kill()

    this.animation = gsap.to(this.animated, {
      autoAlpha: 1,
      duration: this.anim.d,
      ease: this.anim.ease,
      delay: this.anim.delay
    })
  }

  animateOut(): void {
    this.stop()

    this.animation?.kill()

    this.animation = gsap.to(this.animated, {
      autoAlpha: 0,
      duration: this.anim.d,
      ease: this.anim.ease,
      delay: 0
    })
  }

  setIn(): void {
    this.animation?.kill()

    gsap.set(this.animated, { autoAlpha: 1 })
  }

  setOut(): void {
    this.animation?.kill()

    gsap.set(this.animated, { autoAlpha: 0 })
  }
}
