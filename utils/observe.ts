import { EventEmitter } from 'events'

interface ObserveConfig {
  root?: Element | null
  margin?: string
  threshold?: number
}

export class Observe extends EventEmitter {
  public element: Element
  private config: ObserveConfig
  private addClass?: string
  private in: IntersectionObserver | null
  private out: IntersectionObserver | null

  constructor({ element, config, addClass }: { element: Element; config?: ObserveConfig; addClass?: string }) {
    super()

    this.element = element
    this.config = {
      root: config?.root || null,
      margin: config?.margin || '10px',
      threshold: config?.threshold || 0
    }

    if (addClass !== undefined) {
      this.addClass = addClass
    }

    this.in = null
    this.out = null

    this.init()
    this.start()
  }

  private init() {
    this.in = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isIn()
          }
        })
      },
      {
        // root: this.config.root,
        rootMargin: this.config.margin,
        threshold: this.config.threshold
      }
    )

    this.out = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            this.isOut()
          }
        })
      },
      {
        // root: document.querySelector('#scrollArea'),
        rootMargin: '000px',
        threshold: 0
      }
    )
  }

  private start() {
    this.in?.observe(this.element)
    this.out?.observe(this.element)
  }

  public stop() {
    this.in?.unobserve(this.element)
    this.out?.unobserve(this.element)
  }

  public isIn() {
    if (this.addClass) {
      this.element.classList.add(this.addClass)
    }

    this.emit('IN')
  }

  public isOut() {
    if (this.addClass) {
      this.element.classList.remove(this.addClass)
    }

    this.emit('OUT')
  }
}
