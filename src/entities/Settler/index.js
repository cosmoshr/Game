import { Container, Sprite, Loader } from 'pixi.js'

import Entity, { enumValues } from '..'
import { Enum } from '../../lib'
import bus from '../../bus'

export const settlerEnumValues = [
  ...enumValues,
  'SETTLE'
]

export const Actions = new Enum(settlerEnumValues)

class Ship extends Container {
  moving = false

  constructor() {
    super()

    this.body = new Sprite(Loader.shared.resources.settler.texture)
    this.body.width = 50
    this.body.height = 50
    this.addChild(this.body)

    this.throttle = new Sprite(Loader.shared.resources.settler_throttle.texture)
    this.throttle.alpha = 0
    this.throttle.width = 50
    this.throttle.height = 10
    this.throttle.position.y = 50
    this.addChild(this.throttle)
  }

  isMoving(moving) {
    this.moving = moving

    if (this.moving) this.throttle.alpha = 1
    else this.throttle.alpha = 0
  }
}

export default class Settler extends Entity {
  actionDisplay = [
    ...this.actionDisplay,
    {
      name: 'Settle',
      description: 'Claim a planet',
      action: Actions.SETTLE
    }
  ]

  constructor() {
    super('Settler', 110)

    this.internals = new Ship()
    this.addChild(this.internals)
  }

  changeMoveState(isMoving) {
    this.internals.isMoving(isMoving)
  }

  async handleAction() {
    if (this.currentAction === Actions.SETTLE) {
      bus.emit('getClosestPlanet', this.position.x, this.position.y)

      const planet = await new Promise(r => {
        bus.once('closestPlanet', rplanet => {
          r(rplanet)
        })
      })

      bus.emit('settlePlanet', planet)

      this.currentAction = Actions.DELETE
    }

    super.handleAction()
  }
}
