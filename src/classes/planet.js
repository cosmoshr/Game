import { Sprite, Texture } from 'pixi.js'
import textures from '../loaders/textures'

import '../functions'

export default class extends Sprite {
  constructor(planet) {
    const rand = Math.floor(Math.random() * planet.type.default.numberOfTextures)
    let texture
    textures().forEach(element => {
      if (element.name === `Planets_${planet.type.name}_${rand}`)
        texture = Texture.from(element.url)
    })

    super(texture)

    this.r = planet.path
    this.d = planet.degrees

    this.width = planet.size
    this.height = planet.size

    // const pos = Math.genPosOnCircle(0, 0, this.r, this.degrees)

    // this.position.x = pos.x
    // this.position.y = pos.y

    this.position.x = planet.path
    this.position.y = planet.path
  }
}
