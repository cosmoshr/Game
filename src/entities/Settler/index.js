import { Graphics } from 'pixi.js'
import { Entity, EntityActions } from '..'
import { Action } from '../Action'

export const SellerActions = Object.freeze({
  ...EntityActions,
  SETTLE: 4
})

class Internals extends Graphics {
  constructor() {
    super()

    this.beginFill(0x66FF33)

    this.drawPolygon([
      -32, 64, // First point
      32, 64, // Second point
      0, 0 // Third point
    ])

    this.endFill()
  }
}

export default class Settler extends Entity {
  constructor() {
    super('Settler', 100)

    this.push(new Internals())
  }

  calcAction() {
    super.calcAction()
  }

  prepareAction(action, options) {
    this.currentActions.push(new Action(action).pushOptions(options))
  }
}
