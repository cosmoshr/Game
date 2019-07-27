import { Container } from 'pixi.js'

export const EntityActions = Object.freeze({
  NONE: 0,
  SKIP: 1,
  SLEEP: 2,
  MOVE: 3
})

export default class Entity extends Container {
  movements = 0

  currentActions = []

  constructor(name, movements, owned) {
    super()

    this.name = name
    this.allowedMovements = movements
    this.owned = owned
  }

  moveTo(x, y) {
    this.position.x = x
    this.position.y = y
  }

  async doActions() {
    const promises = []

    this.currentActions.forEach((action, i) => {
      promises.push(new Promise(async r => {
        switch (action.type) {
          case EntityActions.SLEEP:
            this.movemtents = 0
            break

          case EntityActions.NONE:
            break

          case EntityActions.SKIP:
            this.movemtents = 0
            break

          case EntityActions.MOVE:
            await this.move(action)
            break

          default:
            throw new Error('Not a valid action')
        }

        this.currentActions[i].type = EntityActions.NONE
        r()
      }))
    })

    return Promise.all(promises)
  }

  async move(action) {
    const { x, y } = this.position

    const useMovements = Math.lineLength(x, y, action.x, action.y)

    let moveTo = { x: action.x, y: action.x }

    if (useMovements < this.movemtents) moveTo = Math.getPosAfterDistanceOnLine(x, y, action.x, action.y, this.movements)
    else this.done = true

    const neededMovements = Math.lineLength(x, y, moveTo.x, moveTo.y)

    for (let i = 0; i < neededMovements; i++) {
      const newCords = Math.getPosAfterDistanceOnLine(x, y, moveTo.x, moveTo.y, neededMovements)
      this.moveTo(newCords.x, newCords.y)
    }

    this.moveTo(moveTo.x, moveTo.y)
  }

  turn() {
    const promises = []

    if (this.currentActions.length === 0) promises.push(new Promise(async r => r(await this.doActions())))

    return promises
  }

  startTurn() {
    const promises = []

    promises.push(new Promise(r => {
      this.movemtents = this.allowedMovements
      r(this.movemtents)
    }))

    return promises
  }
}
