/* eslint-disable */
import { onDragStart, onDragMove, onDragEnd } from './handlers/movement'

import Generator from './generator/generator.worker'
import Star from './classes/star'
import Planet from './classes/planet';

export default class {
  constructor(app) {
    this.app = app

    // ! Test
    let test = new Star(100, 100, 50)
    let test2 = new Planet(100, 50, "Rocky", 50)
    console.log(test)
    this.app.stage.addChild(test)
    this.app.stage.addChild(test2)
    const generator = new Generator()
    generator.postMessage(0)
    generator.onmessage = (e) => {
      console.log(e.data)
      console.log("End")
    }

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
