/* eslint-disable */
import { onDragStart, onDragMove, onDragEnd } from './handlers/movement'

import Generator from './generator/generator.worker'
import Star from './classes/star'
import Planet from './classes/planet'

import Renderer from "renderer"

export default class {
  constructor() {
    this.app = new Renderer()
    this.app.gameLoop = this.update

    const generator = new Generator()
    generator.postMessage(0)
    generator.onmessage = (cosmos) => this.app.addCosmos(cosmos.data)

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
