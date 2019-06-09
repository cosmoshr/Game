import {
  Application,
  Graphics,
  Loader as PixiLoader
} from 'pixi.js'
import Viewport from 'pixi-viewport'
import Dexie from 'dexie'
import SolarSystem from './classes/solarSystem'
import textureLoader from './loaders/texture'
import Generator from './generator/generator.worker'

export default class extends Application {
  constructor() {
    super({
      width: innerWidth,
      height: innerHeight,
      resolution: 1
    })

    this.db = new Dexie('CosmosHR')
    this.db.version(1).stores({
      cosmos: '++id,cosmos',
      cosmosList: ''
    })

    this.view.id = 'app'
    document.body.appendChild(this.view)

    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,

      interaction: this.renderer.plugins.interaction // the interaction module is important for wheel() to work properly when renderer.view is placed or scaled
    })

    this.stage.addChild(this.viewport)
    this.viewport
      .drag()
      .pinch()
      .wheel()

    document.onresize = this.resize

    this.gameLoop = this.ticker.add

    const background = new Graphics()
    background.beginFill(0x000010)
    background.drawRect(-100000, -100000, 200000, 200000)
    background.endFill()
    background.alpha = 1
    this.viewport.addChild(background)
  }

  async init() {
    this.id = 1
    return new Promise(resolve => {
      PixiLoader.shared.add(textureLoader()).load(() => resolve('Done'))
    })
  }

  async launchGame(id) {
    const cosmos = await this.db.cosmos.get(id)
    cosmos.cosmos.forEach(solarSystem => {
      this.viewport.addChild(new SolarSystem(solarSystem))
    })
    this.renderer.resolution = window.localStorage.getItem('quality') || window.devicePixelRatio || 1
  }

  async generateCosmos(description) {
    return new Promise(resolve => {
      const generator = new Generator()
      generator.postMessage({ size: 'auto', description })
      generator.onmessage = async newCosmos => {
        const id = await this.db.cosmos.add({
          cosmos: newCosmos.data
        })
        const cosmosList = JSON.parse(window.localStorage.getItem('cosmosList')) || []
        cosmosList.push({
          description, id, dateCreated: Date.now(), lastModified: Date.now()
        })
        window.localStorage.setItem('cosmosList', JSON.stringify(cosmosList))
        resolve(id)
      }
    })
  }

  resize() {
    this.renderer.resize(innerWidth, innerHeight)
  }
}
