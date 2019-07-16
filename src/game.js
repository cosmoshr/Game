import {
  Application, Graphics, Loader as PixiLoader
} from 'pixi.js'
import SolarSystem from './classes/solarSystem'
import loader from './loader'
import Generator from './generator/generator.worker'
import SoundManager from './sound'
import Viewport from './viewport'
import DB from './db'
import Cull from './cull'
import LoadingOverlay from './overlays/loading'
import Splash from './overlays/splash'
import newError from './overlays/error'
import Overlay from './overlays/overlay'

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
    this.cull = new Cull(this.viewport)

    document.onresize = this.resize

    this.gameLoop = this.ticker.add

    const background = new Graphics()
    background.beginFill(0x000010)
    background.drawRect(-100000, -100000, 200000, 200000)
    background.endFill()
    background.alpha = 1
    this.viewport.addChild(background)

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
    this.id = 1
  }

  splashScreen() {
    this.soundManager.trigger('Main Menu')
    const splash = new Splash()
    PixiLoader.shared.add(loader().filter(item => !loader(true).some(item2 => item.name === item2.name)))

    splash.games = this.cosmosList
    document.body.appendChild(splash.el)

    splash.onGameCreated = async name => {
      const loaderOverlay = new LoadingOverlay()
      this.soundManager.trigger('Game Starts')
      splash.kill()

      loaderOverlay.message = 'Loading World'
      const id = await this.generateCosmos(name)
      this.launchGame(id)
      this.gameInProgress()
      loaderOverlay.kill()
    }
    splash.onLoadGame = async id => {
      const loaderOverlay = new LoadingOverlay()
      this.soundManager.trigger('Game Starts')
      splash.kill()
      loaderOverlay.message = 'Loading World'

      if (localStorage.getItem('cosmosList').length > id - 1) {
        await this.launchGame(id)
        this.gameInProgress()
        loaderOverlay.kill()
      } else {
        loaderOverlay.kill()
        newError(new Error('Failed to load the world'))
      }
    }
  }

  gameInProgress() {
    const loading = new LoadingOverlay(true)
    PixiLoader.shared.onProgress.add(percent => {
      loading.value = percent / 1.05
    })

    PixiLoader.shared.load(() => {
      loading.kill()
    })

    console.log(PixiLoader.shared.progress)
    this.soundManager.trigger('Whenever', false, true)

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
    const background = new Graphics()
    background.beginFill(0x000010)
    background.drawRect(-100000, -100000, 200000, 200000)
    background.endFill()
    background.alpha = 1
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
        window.localStorage.setItem('cosmosList', JSON.stringify(cosmosList))
        resolve(id)
      }
    })
  }

  resize() {
    this.renderer.resize(innerWidth, innerHeight)
  }
}
