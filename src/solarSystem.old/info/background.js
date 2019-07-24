import { Loader, Sprite } from 'pixi.js'

export default class Background extends Sprite {
  constructor(status) {
    let textureName

    if (status === 1) textureName = 'unclaimed'
    else if (status === 2) textureName = 'your'
    else textureName = 'other'
    // textureName += '_planet_background'

    super(Loader.shared.resources[`${textureName}_planet_background`].texture)

    if (status === 1) this.width = 36
    else if (status === 2) this.width = 60
    else this.width = 45

    this.height = 15
  }
}
