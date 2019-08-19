import { Point } from 'pixi.js'

// eslint-disable-next-line import/no-mutable-exports
let pos = new Point()

export function setPos(newPos) {
  pos = newPos
}

export default pos
