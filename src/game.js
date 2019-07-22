import {
  Application, Loader as PixiLoader
} from 'pixi.js'
import SolarSystem from './solarSystem'
import loader from './loader'
import SoundManager from './sound'
import { DB, Cull, Viewport } from './lib'
import Background from './background'
import { LoadingOverlay, Splash, Overlay } from './overlays'
import SolarSystems from './solarSystem/SolarSystems'
import Planets from './solarSystem/planets'

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
    this.solarSystems = new SolarSystems()
    this.planets = new Planets()

    const { cosmos } = await this.db.cosmos.get(id)

    const solarSystemPromises = []

    cosmos.cosmos.forEach((solarSystem, index) => {
      const solorSystemObj = new SolarSystem(solarSystem)

      solarSystemPromises.push(new Promise(r => setTimeout(() => {
        this.solarSystems.push(solorSystemObj)
        this.planets.addPlanets(solorSystemObj.planets)

        this.viewport.addChild(solorSystemObj)
        this.cull.add(solorSystemObj)

        r()
      }, 5 + index)))
    })

    this.renderer.resolution = window.localStorage.getItem('quality') || window.devicePixelRatio || 1

    await Promise.all(solarSystemPromises)

    this.viewport.moveCenter(cosmos.starting.planet.x + cosmos.starting.solarSystem.x, cosmos.starting.planet.y + cosmos.starting.solarSystem.y)
    this.viewport.fitWidth(window.innerWidth)

    this.playerObervations = [{
      x: cosmos.starting.planet.x + cosmos.starting.solarSystem.x,
      y: cosmos.starting.planet.x + cosmos.starting.solarSystem.x,
      r: 500
    }]
  }
}
