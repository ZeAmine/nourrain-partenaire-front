import { EventEmitter } from 'events'

export default class Time extends EventEmitter {
  start: number
  current: number
  elapsed: number
  delta: number

  constructor() {
    super()

    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  private tick(): void {
    const currentTime: number = Date.now()
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.start

    this.emit('tick')

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }
}
