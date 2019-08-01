import { Container } from 'pixi.js'
import { Enum } from '../lib'

import bus from '../bus'

export const enumValues = [
  'NONE', 'SLEEP', 'MOVE', 'SKIP', 'DELETE'
]

export const Actions = new Enum(enumValues)

export default class Entity extends Container {
  usedMovements = 0

  currentAction = Actions.NONE

  ActionProperties = {}

  actionDisplay = [
    {
      name: 'Move',
      description: 'Move this entity',
      action: Actions.MOVE,
      icon: '/assets/ui/icons/move.svg',
      passCords: true
    }
  ]

  constructor(name, movements) {
    super()

    this.name = name
    this.movements = movements
    this.usedMovements = this.movements

    bus.on('next-turn', () => this.turn())
  }

  turn() {
    this.handleAction()

    this.usedMovements = this.movements
  }

  setAction(action, options = {}) {
    this.currentAction = action

    if (this.currentAction === Actions.MOVE) this.moveTo(options.x, options.y)
  }

  handleAction() {
    switch (this.currentAction) {
      case Actions.NONE:
        break

      case Actions.SLEEP:
        break

      case Actions.SKIP:
        this.currentAction = Actions.NONE
        break

      case Actions.MOVE:
        this.move()
        break

      case Actions.DELETE:
        this.destroy()
        break

      default:
        throw new Error(`${this.currentAction} is not a valid Actions`)
    }
  }

  setPos(x, y) {
    this.position.x = x
    this.position.y = y
  }

  moveTo(movex, movey) {
    this.currentAction = Actions.MOVE

    this.ActionProperties = {
      movex,
      movey
    }

    this.move()
  }

  move() {
    if (this.usedMovements !== 0) {
      const { movex, movey } = this.ActionProperties
      const { x, y } = this.position

      if (x === movex - 1 && movey - 1 === y) {
        this.currentAction = Actions.NONE
        this.ActionProperties = {}

        return
      }

      // const length = Math.lineLength(x, y, movex, movey)

      // let nextx,
      //   nexty

      // if (length <= this.usedMovements) { // If you have enough movements
      const nextx = movex
      const nexty = movey

      this.currentAction = Actions.NONE
      this.ActionProperties = {}
      // } else { // If you don't have enough movements
      //   const maxPos = Math.getPosAfterDistanceOnLine(x, y, movex, movey, this.usedMovements)
      //   console.log(maxPos)

      //   nextx = maxPos.x
      //   nexty = maxPos.y
      // }

      // const nextLength = Math.lineLength(x, y, nextx, nexty)

      // for (let i = 0; i < nextLength; i++) {
      //   const newPos = Math.getPosAfterDistanceOnLine(x, y, nextx, nexty, i)

      //   this.setPos(newPos.x, newPos.y)
      // }

      this.setPos(nextx, nexty)

      console.log(`Move to ${nextx} ${nexty}`)
    }
  }
}
