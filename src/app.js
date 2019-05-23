/* eslint-disable */
import { onDragStart, onDragMove, onDragEnd } from './handlers/movement'

import Renderer from 'renderer'
// import { init as initTextures } from './loaders/textures';

export default class {
  constructor() {
    this.app = new Renderer()
    this.app.gameLoop = this.update

    this.initMovment()
  }

  update() {}

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
