import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

import { Observe } from '../observe'

gsap.registerPlugin(SplitText)

export class Text extends Observe {
  public element: HTMLElement
  private anim: AnimationConfig
  private animated: Element[]
  private animation!: gsap.core.Tween | null

  constructor({ element }: { element: HTMLElement }) {
    super({
      element,
      config: {
        root: null,
        margin: '10px',
        threshold: 0.8
      },
      addClass: 'active'
    })

    this.anim = {
      d: 1.6,
      ease: 'expo.out',
      delay: 0.1,
      each: 0.02,
      from: 'start',
      once: !!element.dataset.aMod
    }

    this.element = element
    this.animated = returnSplit(this.element)

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
      x: '0%',
      y: '0%',
      duration: this.anim.d,
      ease: this.anim.ease,
      stagger: {
        each: this.anim.each,
        from: this.anim.from
      }
    })
  }

  animateOut(): void {
    this.stop()

    this.animation?.kill()

    this.animation = gsap.to(this.animated, {
      y: '-110%',
      x: '0%',
      duration: this.anim.d,
      ease: this.anim.ease,
      stagger: {
        each: this.anim.each,
        from: this.anim.from
      }
    })
  }

  setIn(): void {
    this.animation?.kill()

    gsap.set(this.animated, {
      y: '0%',
      x: '0%'
    })
  }

  setOut(): void {
    this.animation?.kill()

    gsap.set(this.animated, {
      x: '0%',
      y: '110%'
    })
  }
}

/* --- Helpers --- */
function returnSplit(element: HTMLElement) {
  switch (element.dataset.a) {
    case 'char':
      return splitChar(element)
    case 'word':
      return splitWord(element)
    case 'line':
      return splitLine(element)
    default:
      return splitWord(element)
  }
}

function splitChar(el: HTMLElement) {
  return new SplitText(el, {
    type: 'words, chars',
    charsClass: 'char'
  }).chars
}

function splitWord(el: HTMLElement) {
  return new SplitText(el, {
    type: 'lines, words',
    wordsClass: 'word'
  }).words
}

function splitLine(el: HTMLElement) {
  const line = new SplitText(el, {
    type: 'lines'
  }).lines
  return new SplitText(line, {
    type: 'lines',
    linesClass: 'line'
  }).lines
}
