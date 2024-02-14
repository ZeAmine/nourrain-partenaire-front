export default class Viewport {
  width: number
  height: number
  aspect: number
  dpr: number

  constructor() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.aspect = this.width / this.height
    this.dpr = Math.min(window.devicePixelRatio, 2)
  }

  onResize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.aspect = this.width / this.height
    this.dpr = Math.min(window.devicePixelRatio, 2)
  }
}
