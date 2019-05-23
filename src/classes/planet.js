import { Sprite, Loader } from 'pixi.js'
import '../functions'

export default class extends Sprite {
  constructor(planet) {
    const rand = Math.floor(Math.random() * planet.type.default.numberOfTextures)
    const textureName = `Planets_${planet.type.name}_${rand}`

    super(Loader.shared.resources[textureName].texture)

    this.r = planet.path
    this.d = planet.degrees

    this.width = planet.size
    this.height = planet.size

    const pos = Math.genPosOnCircle(0, 0, this.r, this.d)

    this.position.x = pos.x
    this.position.y = pos.y
  }
}
