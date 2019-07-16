import { Application, Graphics, Loader as PixiLoader } from 'pixi.js'
import { Simple as Cull } from 'pixi-cull'
import Viewport from 'pixi-viewport'
import Dexie from 'dexie'
import SolarSystem from './classes/solarSystem'
import textureLoader from './loaders/texture'
import Generator from './generator/generator.worker'
import Planets from './classes/planets'
import SolarSystems from './classes/SolarSystems'

export default class extends Application {
  planets = new Planets()

  solarSystems = new SolarSystems()

  playerObervations = []

  constructor() {
    super({
      width: innerWidth,
      height: innerHeight,
      resolution: 1
    })

    this.db = new Dexie('CosmosHR')
    this.db.version(1).stores({
      cosmos: '++id,cosmos,starting',
      cosmosList: ''
    })

    this.view.id = 'app'
    document.body.appendChild(this.view)
    window.game = this.view

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
    this.ticker.add(this.loop.bind(this))

    const background = new Graphics()
    background.beginFill(0x000010)
    background.drawRect(-100000, -100000, 200000, 200000)
    background.endFill()
    background.alpha = 1
    this.viewport.addChild(background)

    this.cull = new Cull()
    this.cull.addList(this.viewport.children)
    this.cull.cull(this.viewport.getVisibleBounds())
  }

  loop() {
    if (this.viewport.dirty) {
      this.cull.cull(this.viewport.getVisibleBounds())
      this.viewport.dirty = false
    }
  }

  async init() {
    this.id = 1
    return new Promise(resolve => {
      PixiLoader.shared.add(textureLoader()).load(() => resolve('Done'))
    })
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

    this.playerObervations.push({
      x: cosmos.starting.planet.x + cosmos.starting.solarSystem.x,
      y: cosmos.starting.planet.x + cosmos.starting.solarSystem.x,
      r: 500
    })
  }

  async generateCosmos(description) {
    return new Promise(resolve => {
      const generator = new Generator()
      generator.postMessage({ size: 'auto', description })

      generator.onmessage = async newCosmos => {
        const id = await this.db.cosmos.add({
          starting: newCosmos.data.starting,
          cosmos: newCosmos.data.cosmos
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

  getStartingPosiotion() {
    const solarSystem = this.solarSystems.habitable[Math.floor(Math.random() * this.solarSystems.habitable.length)]
    const planet = solarSystem.habitablePlanets[Math.floor(Math.random() * solarSystem.habitablePlanets.length)]

    this.viewport.moveCenter(planet.x + solarSystem.x, planet.y + solarSystem.y)
    this.viewport.fitWidth(window.innerWidth)

    this.playerObervations.push({
      x: planet.x + solarSystem.x,
      y: planet.x + solarSystem.x,
      r: 500
    })
  }

  resize() {
    this.renderer.resize(innerWidth, innerHeight)
  }
}
