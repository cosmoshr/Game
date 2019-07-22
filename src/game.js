import {
  Application, Loader as PixiLoader
} from 'pixi.js'
import SolarSystem from './solarSystem'
import loader from './loader'
import SoundManager from './sound'
import { DB, Cull, Viewport } from './lib'
import Background from './background'
import { LoadingOverlay, Splash, Overlay } from './overlays'
import Manager from './manager'
import bus from './bus'

export default class Game extends Application {
  ready = false

  hasLoaded = false

  constructor() {
    super({
      width: innerWidth,
      height: innerHeight,
      resolution: 1
    })

    this.view.id = 'app'
    this.viewport = new Viewport(this.renderer)
    this.stage.addChild(this.viewport)
    document.body.appendChild(this.view)

    const background = new Background()
    this.viewport.addChild(background)

    this.db = new DB()
    this.soundManager = new SoundManager()

    const loaderOverlay = new LoadingOverlay(true)

    this.manager = new Manager(this.viewport)

    PixiLoader.shared.add(loader(1))
    PixiLoader.shared.onProgress.add(percent => { loaderOverlay.value = percent.progress })

    PixiLoader.shared.load(() => {
      loaderOverlay.kill()
      this.splashScreen()
    })

    this.cull = new Cull(this.viewport)

    this.keyTarget = x => x
    this.keyDown = key => this.keyTarget(key)
    document.addEventListener('keydown', this.keyDown)

    window.onresize = () => this.renderer.resize(innerWidth, innerHeight)
    this.ticker.add(this.loop.bind(this))
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

    if (!this.hasLoaded) {
      PixiLoader.shared.add(loader(2))
      PixiLoader.shared.load(() => {
        this.hasLoaded = true
        PixiLoader.shared.add(loader(3))
      })
    }

    splash.games = this.cosmosList
    document.body.appendChild(splash.el)

    this.keyTarget = splash.pressed.bind(splash)

    splash.launchGame = async id => {
      const loading = new LoadingOverlay()
      loading.message = 'Loading World'
      this.soundManager.trigger('Game Starts')
      splash.kill()

      const load = async () => {
        loading.kill()
        this.soundManager.trigger('Whenever', false, true)
        await this.launchGame(id)
        this.gameInProgress()
      }

      if (!this.hasLoaded) PixiLoader.shared.load(load)
      else load()
    }
  }

  gameInProgress() {
    const overlay = new Overlay()

    overlay.open = () => this.soundManager.trigger('Main Menu', true)
    overlay.close = () => this.soundManager.endTemp()

    this.keyTarget = overlay.pressed.bind(overlay)

    overlay.quitGame = () => {
      this.reset()
      this.view.style.display = 'none'
      this.splashScreen()
    }

    this.view.style.display = 'block'
  }

  reset() {
    for (let i = this.viewport.children.length - 1; i >= 0; i--) this.viewport.removeChild(this.viewport.children[i])
    const background = new Background()
    this.viewport.addChild(background)
    this.cull = new Cull(this.viewport)
  }

  async launchGame(id) {
    this.id = id
    this.renderer.resolution = window.localStorage.getItem('quality') || window.devicePixelRatio || 1
    const { cosmos, state } = await this.manager.launchGame(id)
    this.solarSystem = new SolarSystem(cosmos)
    this.viewport.addChild(this.solarSystem)
    this.cull.add(this.solarSystem)

    const h1 = document.createElement('h1')
    h1.innerHTML = state.currentTurn
    h1.onclick = () => {
      bus.emit('next-turn-clicked')
      h1.innerHTML = Number(h1.innerHTML) + 1
    }
    document.body.prepend(h1)
  }
}
