import { Application, Graphics, Loader } from 'pixi.js'
import SolarSystem from './classes/solarSystem'

import textures, { init as initTextures } from './loaders/textures'
import Generator from './generator/generator.worker'

export default class extends Application {
  constructor() {
    super({ width: innerWidth, height: innerHeight, resolution: 2 })

    this.renderer.autoResize = true
    this.view.id = 'app'
    document.body.appendChild(this.view)

    document.onresize = this.resize

    this.gameLoop = this.ticker.add

    const background = new Graphics()
    background.beginFill(0x000010)
    background.drawRect(-100000, -100000, 200000, 200000)
    background.endFill()
    background.alpha = 1
    this.stage.addChild(background)

    document.onkeydown = this.keyManager.bind(this)

    initTextures()
    Loader.shared.add(textures).load(this.loaded.bind(this))
  }

  loaded() {
    const generator = new Generator()
    generator.postMessage(0)
    generator.onmessage = (cosmos) => this.addCosmos(cosmos.data)
  }

  keyManager(e) {
    if (e.code === 'Minus') {
      this.stage.width /= 2
      this.stage.height /= 2
    } else if (e.code === 'Equal') {
      this.stage.width *= 2
      this.stage.height *= 2
    }
  }

  resize() {
    this.renderer.resize(innerWidth, innerHeight)
  }

  addCosmos(cosmos) {
    cosmos.forEach(solarSystem => {
      this.stage.addChild(new SolarSystem(solarSystem))
    })
  }
}
