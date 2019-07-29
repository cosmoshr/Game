import { Graphics } from 'pixi.js'

import Entity, { enumValues } from '..'
import { Enum } from '../../lib'
import bus from '../../bus'

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
    super('Settler', 110)

    this.addChild(new Internals())
  }

  async handleAction() {
    if (this.currentAction === Actions.SETTLE) {
      bus.emit('getClosestPlanet', this.position.x, this.position.y)

      const planet = await new Promise(r => {
        bus.on('closestPlanet', rplanet => {
          bus.removeAllListeners('closestPlanet')
          r(rplanet)
        })
      })

      bus.emit('settlePlanet', planet)

      this.currentAction = Actions.NONE
    }

    super.handleAction()
  }
}
