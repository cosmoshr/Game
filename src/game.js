import {
  Application, Loader as PixiLoader
} from 'pixi.js'
import SolarSystem from './solarSystem'
import loader from './loader'
import Generator from './generator/generator.worker'
import SoundManager from './sound'
import Viewport from './viewport'
import DB from './db'
import Cull from './cull'
import LoadingOverlay from './overlays/loading'
import Splash from './overlays/splash'
import Overlay from './overlays/overlay'
import Background from './background'

export default class Game extends Application {
  ready = false

  constructor() {
    super({
      width: innerWidth,
      height: innerHeight,
      resolution: 1
    })

    this.db = new DB()

    this.view.id = 'app'
    document.body.appendChild(this.view)

    this.viewport = new Viewport(this.renderer)
    this.stage.addChild(this.viewport)

    window.onresize = () => this.renderer.resize(innerWidth, innerHeight)

    const background = new Background()
    this.viewport.addChild(background)
    this.cull = new Cull(this.viewport)

    this.soundManager = new SoundManager()

    const loaderOverlay = new LoadingOverlay(true)

    PixiLoader.shared.add(loader(true))
    PixiLoader.shared.onProgress.add(percent => {
      loaderOverlay.value = percent.progress
    })

    PixiLoader.shared.load(() => {
      this.ticker.add(this.loop.bind(this))
      loaderOverlay.kill()
      this.splashScreen()
    })
  }

  loop() {
    if (this.viewport.dirty) {
      this.cull.cull(this.viewport.getVisibleBounds())
      this.viewport.dirty = false
    }
  }

  splashScreen() {
    this.soundManager.trigger('Main Menu')
    const splash = new Splash()
    PixiLoader.shared.add(loader().filter(item => !loader(true).some(item2 => item.name === item2.name)))

    splash.games = this.cosmosList
    document.body.appendChild(splash.el)

    splash.generator = async name => this.generateCosmos(name)

    splash.launchGame = async id => {
      const loading = new LoadingOverlay()
      loading.message = 'Loading World'
      this.soundManager.trigger('Game Starts')
      splash.kill()

      PixiLoader.shared.load(async () => {
        loading.kill()
        this.soundManager.trigger('Whenever', false, true)
        await this.launchGame(id)
        this.gameInProgress()
      })
    }
  }

  gameInProgress() {
    const overlay = new Overlay()

    overlay.open = () => this.soundManager.trigger('Main Menu', true)
    overlay.close = () => this.soundManager.endTemp()

    overlay.quitGame = () => {
      this.reset()
      window.game.style.display = 'none'
      this.splashScreen()
    }

    this.view.style.display = 'block'
  }

  reset() {
    for (let i = this.viewport.children.length - 1; i >= 0; i--) this.viewport.removeChild(this.viewport.children[i])
    const background = new Background()
    this.viewport.addChild(background)
  }

  async launchGame(id) {
    const cosmos = await this.db.cosmos.get(id)
    cosmos.cosmos.forEach(solarSystem => {
      const solorSystemObj = new SolarSystem(solarSystem)
      this.viewport.addChild(solorSystemObj)
      this.cull.add(solorSystemObj)
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
        localStorage.setItem('cosmosList', JSON.stringify(cosmosList))
        resolve(id)
      }
    })
  }
}
