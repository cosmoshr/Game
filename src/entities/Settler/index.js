import { Graphics } from 'pixi.js'

import Entity, { enumValues } from '..'
import { Enum } from '../../lib'

export const settlerEnumValues = [
  ...enumValues,
  'SETTLE'
]

export const Actions = new Enum(settlerEnumValues)

class Internals extends Graphics {
  constructor() {
    super()

    this.beginFill(0x66FF33)

    this.drawPolygon([
      -32, 64,
      32, 64,
      0, 0
    ])

    this.endFill()
  }
}

export default class Settler extends Entity {
  constructor() {
    super('settler', 110)

    this.addChild(new Internals())
  }
}
