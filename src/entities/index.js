import { Container } from 'pixi.js'
import { Enum } from '../lib'

import bus from '../bus'

export const enumValues = [
  'NONE', 'SLEEP', 'MOVE', 'SKIP'
]

export const Actions = new Enum(enumValues)

export default class Entity extends Container {
  usedMovements = 0

  currentAction = Actions.NONE

  ActionProperties = {}

  constructor(name, movements) {
    super()

    this.name = name
    this.movements = movements

    bus.on('next-turn', () => this.turn())
  }

  turn() {
    this.handleAction()
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

      const length = Math.lineLength(x, y, movex, movey)

      let nextx,
        nexty

      if (length <= this.usedMovements) { // If you have enough movements
        nextx = movex
        nextx = movey

        this.currentAction = Actions.NONE
        this.ActionProperties = {}
      } else { // If you don't have enough movements
        const maxPos = Math.getPisAfterDistanceOnLine(x, y, movex, movey, this.usedMovements)

        nextx = maxPos.x
        nexty = maxPos.y
      }

      const nextLength = Math.lineLength(x, y, nextx, nexty)

      for (let i = 0; i < nextLength; i++) {
        const newPos = Math.getPisAfterDistanceOnLine(x, y, nextx, nexty, i)

        this.setPos(newPos.x, newPos.y)
      }

      this.setPos(nextx, nexty)
    }
  }
}
