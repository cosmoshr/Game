import { onDragStart, onDragMove, onDragEnd } from './handlers/movement'

import Generator from './generator'

export default class {
  constructor(app) {
    this.app = app

    // eslint-disable-next-line no-unused-vars
    console.log('Gen')
    this.generator = new Generator(app)

    this.initMovment()
  }

  initMovment() {
    // Make events triggure
    this.app.stage.interactive = true

    // Desktop events
    this.app.stage.mousedown = onDragStart
    this.app.stage.mouseup = onDragEnd
    this.app.stage.mouseupoutside = onDragEnd
    this.app.stage.mousemove = onDragMove

    // Mobile events
    this.app.stage.touchstart = onDragStart
    this.app.stage.touchend = onDragEnd
    this.app.stage.touchendoutside = onDragEnd
    this.app.stage.touchmove = onDragMove
  }
}
