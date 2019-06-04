import { Sprite, Loader } from 'pixi.js'

export default class Moon extends Sprite {
  constructor(moon) {
    const textureName = `Moon_${moon.type.name}`
    super(Loader.shared.resources[textureName].texture)

    this.p = moon.path
    this.d = moon.degrees
    this.size = moon.size

    const pos = Math.genPosOnCircle(0, 0, this.p, this.d)
    this.position.x = pos.x
    this.position.y = pos.y

    this.width = this.size
    this.height = this.size
  }
}
