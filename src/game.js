import { Application, Graphics, Loader as PixiLoader } from 'pixi.js'
import SolarSystem from './classes/solarSystem'

import Loader from './loaders/loader.worker'

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
  }

  async init() {
    const textureLoader = new Promise((resolve, reject) => {
      const loader = new Loader()
      loader.postMessage({ action: 'Load', data: { item: 'Texture', which: 'all' } })
      loader.onmessage = (texture, err) => {
        if (err) reject(err)
        else PixiLoader.shared.add(texture.data).load(() => resolve('Done'))
      }
    })
    const settingsLoader = new Promise((resolve, reject) => {
      const loader = new Loader()
      loader.postMessage({ action: 'Load', data: { item: 'Settings' } })
      loader.onmessage = (settings, err) => {
        if (err) reject(err)
        else {
          this.settings = settings.data
          resolve('Done')
        }
      }
    })
    const cosmosLoader = new Promise((resolve, reject) => {
      const loader = new Loader()
      loader.postMessage({
        action: 'Load',
        data: { item: 'Cosmos', which: 'List' }
      })
      loader.onmessage = (cosmos, err) => {
        if (err) reject(err)
        else {
          this.cosmos = cosmos.data
          resolve('Done')
        }
      }
    })

    await Promise.all([textureLoader, settingsLoader, cosmosLoader])
    return ('Done')
  }

  async generateCosmos(description) {
    const generateCosmos = new Promise((resolve, reject) => {
      const loader = new Loader()
      loader.postMessage({
        action: 'Generate',
        data: { size: 'auto', description }
      })
      loader.onmessage = (newCosmos, err) => {
        if (err) reject(err)
        else {
          this.cosmos = newCosmos.data
          resolve('Done')
        }
      }
    })

    await generateCosmos
  }

  loadComos(whichCosmos) {
    this.cosmos[whichCosmos].cosmos.forEach(solarSystem => {
      this.stage.addChild(new SolarSystem(solarSystem))
    })
  }

  /**
   * updateCosmos(1, {description: 'Test'})
   * @param {Number} whichCosmos The index number of the cosmos
   * @param {Object} newCosmos 1 and only 1 property of the newCosmos
  */
  async updateCosmos(whichCosmos, newCosmos) {
    const updateCosmos = await new Promise((resolve, reject) => {
      const loader = new Loader()
      loader.postMessage({
        action: 'Update',
        data: { item: 'Cosmos', data: { whichCosmos, newCosmos } }
      })
      loader.onmessage = (callback, err) => {
        if (err) reject(err)
        else {
          this.cosmos = callback.data
          resolve('Done')
        }
      }
    })
    return updateCosmos
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
}
