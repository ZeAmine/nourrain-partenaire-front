
import { $root } from '@/composables/useRoot'
import { Alpha } from './animation/alpha'
import { Text } from './animation/text'

export default class Dom {
  private once!: Text[]
  private text!: Text[]
  private alpha!: Alpha[]

  constructor() {
    this.createOnce()
    this.createAnimation()
  }

  /**
   * Create Once.
   */
  private createOnce() {
    this.once = Array.from(document.querySelectorAll('[data-a="once"]')).map((el: Element) => {
      return new Text({ element: el as HTMLElement })
    })
  }

  /**
   * Text Animation.
   */
  public createAnimation() {
    this.text = Array.from(document.querySelectorAll('[data-a="char"], [data-a="word"], [data-a="line"]')).map(
      (el: Element) => {
        return new Text({ element: el as HTMLElement })
      }
    )

    this.alpha = Array.from(document.querySelectorAll('[data-a="alpha"]')).map((el: Element) => {
      return new Alpha({ element: el as HTMLElement })
    })
  }

  public destroyAnimation() {
    this.text?.forEach((el) => el.animateOut())
    this.alpha?.forEach((el) => el.animateOut())
  }

  /**
   * Page Transition.
   */
  public transitionOut(page: HTMLElement, { from, to }: Path) {
    this.destroyAnimation()

    // console.log('transitionOut', from);

    // switch (from[0]) {
    //   case '':
    //     console.log('from home')
    //     break
    //   case 'about':
    //     console.log('from about')
    //     break
    //   case 'work':
    //     console.log('from work')
    //     break
    //   default:
    //     $root.scroll?.scrollZero()
    // }

    return new Promise<void>((resolve) => {
      setTimeout(resolve, 800)
    })
  }

  public transitionIn(page: HTMLElement, { from, to }: Path) {
    this.createAnimation()

    // console.log('transitionIn', to);

    $root.scroll?.scrollZero()

    // switch (to[0]) {
    //   case '':
    //     console.log('to home')
    //     break
    //   case 'about':
    //     console.log('to about')
    //     break
    //   case 'work':
    //     console.log('to work')
    //     break
    //   default:
    //     break
    // }

    return new Promise<void>((resolve) => {
      setTimeout(resolve, 800)
    })
  }

  /**
   * Resize.
   */
  resize() { }
}

