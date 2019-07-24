import { Loader, Sprite } from 'pixi.js'

class Image extends Sprite {
  constructor(textureName) {
    super(Loader.shared.resources[textureName].texture)

    this.width = 12
    this.height = 12
  }
}

export class ProjectImage extends Image {
  constructor() {
    super('sun')

    this.position.x = 46.5
    this.position.y = 1.5
  }
}

export class PlanetImage extends Image {
  constructor(textureName) {
    super(textureName)

    this.position.x = 1.5
    this.position.y = 1.5
  }
}
