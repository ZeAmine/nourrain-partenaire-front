import { Pane } from 'tweakpane'

export default class {
  active: boolean
  ui: Pane

  constructor() {
    this.active = window.location.hash === '#debug'

    if (this.active) {
      this.ui = new Pane()
    }
  }
}
