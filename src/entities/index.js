import { Container } from 'pixi.js'
import { Enum } from '../lib'

import bus from '../bus'
import sleep from '../lib/sleep'

export const enumValues = [
  'NONE', 'SLEEP', 'MOVE', 'SKIP', 'DELETE'
]

export const Actions = new Enum(enumValues)

export default class Entity extends Container {
  usedMovements = 0

  currentAction = Actions.NONE

  ActionProperties = {}

  entitySaveProperties = [
    'currentAction',
    'usedMovements'
  ]

  actionDisplay = [
    {
      name: 'Move',
      description: 'Move this entity',
      action: Actions.MOVE,
      icon: 'assets/ui/icons/move.svg',
      passCords: true
    }
  ]

  entityType = ''

  constructor(name, movements) {
    super()

    this.name = name
    this.movements = movements
    this.usedMovements = this.movements

    this.interactive = true
    this.on('pointerdown', () => bus.emit('setActiveEntity', this))

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

  async move() {
    if (this.usedMovements !== 0) {
      const { movex, movey } = this.ActionProperties
      const { x, y } = this.position

      if (x === movex - 1 && movey - 1 === y) {
        this.currentAction = Actions.NONE
        this.ActionProperties = {}

        return
      }

      const nextx = movex
      const nexty = movey

      this.currentAction = Actions.NONE
      this.ActionProperties = {}

      const nextLength = Math.lineLength(x, y, nextx, nexty)
      let i = 0

      this.rotation = Math.getDirectionTo(x, y, nextx, nexty)

      if (this.changeMoveState) this.changeMoveState(true)

      const loop = async () => {
        const newPos = Math.getPosAfterDistanceOnLine(x, y, nextx, nexty, i)
        this.setPos(newPos.x, newPos.y)

        await sleep(1)
        i += 5
        if (i < nextLength) await loop()
      }

      await loop()

      this.setPos(nextx, nexty)

      if (this.changeMoveState) this.changeMoveState(false)
    }
  }

  loadSave(save) {
    this.x = save.x
    this.y = save.y
    this.currentAction = save.currentAction
    this.usedMovements = save.usedMovements
  }
}
