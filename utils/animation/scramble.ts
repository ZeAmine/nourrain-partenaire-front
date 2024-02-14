import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin'
import { gsap } from 'gsap/gsap-core'

import { Observe } from '../observe'

gsap.registerPlugin(ScrambleTextPlugin)

const chars1: string = '▎▌▊▉█'
const chars2: string = '▖▗ ▘ ▙ ▚ ▛ ▜ ▝ ▞ ▟'
const chars3: string = '▎▎▎▎▎▎'

export class Scramble {
  private anim: AnimationConfig
  private animated: Element
  private animation!: gsap.core.Tween | null
  private scAnimation!: gsap.core.Tween | null
  private text: string
  private obs!: Observe

  constructor({ element, observed = false }: { element: HTMLElement; observed: boolean }) {
    // super({ element });

    this.animated = element
    this.text = element.textContent || ''
    // console.log(element.textContent.length);

    this.anim = {
      d: 1.2,
      ease: 'expo.out',
      delay: 0.1,
      each: 0.05,
      from: 'start',
      once: false
    }

    if (observed) {
      this.obs = new Observe({
        element,
        config: {
          // autoStart: true,
        },
        cb: {
          in: () => this.animateIn(),
          out: () => this.setOut()
        }
      })
    }

    this.setOut()
  }

  animateIn(delay: number = 0.1): void {
    this.animation?.kill()

    this.animation = gsap.to(this.animated, {
      autoAlpha: 1,
      duration: this.anim.d,
      ease: this.anim.ease,
      delay: this.anim.delay,
      stagger: {
        each: this.anim.each,
        from: this.anim.from
      }
    })

    this.scAnimation?.kill()

    this.scAnimation = gsap.to(this.animated, {
      duration: 0.9 + Math.random() * 0.6 + this.text.length * 0.01,
      delay,
      scrambleText: {
        chars: chars1 + chars2 + chars3, // "lowerCase" for default
        revealDelay: 0,
        text: this.text,
        speed: 0.2,
        delimiter: '',
        rightToLeft: false
      }
    })
  }

  setOut(): void {
    this.animation?.kill()

    gsap.set(this.animated, { autoAlpha: 0 })
  }

  destroy(): void {
    if (this.obs) {
      this.obs.stop()
    }
  }
}
