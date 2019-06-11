import {
  Application, Graphics, Loader as PixiLoader
} from 'pixi.js'
import Sound from 'pixi-sound'
import { Simple as Cull } from 'pixi-cull'
import Viewport from 'pixi-viewport'
import Dexie from 'dexie'
import SolarSystem from './classes/solarSystem'
import loader from './loader'
import Generator from './generator/generator.worker'
import Soundtrack from '../subgit/soundtrack'

let loaded = false

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
    Sound.add('Loading', 'assets/soundtrack/Main Menu.mp3')
    Sound.play('Loading', () => {
      this.playNewSong()
    })
    return new Promise(resolve => {
      PixiLoader.shared.add(loader()).load(() => {
        loaded = true
        resolve('Done')
      })
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

  playNewSong(trigger = 'Whenever') {
    if (loaded) {
      const songList = []
      Soundtrack.forEach(song => {
        song.trigger.forEach(triggerName => {
          if (trigger === triggerName) songList.push(song)
        })
      })
      const rand = songList[Math.floor((Math.random() * songList.length))]
      Sound.play(rand.name, () => {
        this.playNewSong()
      })
    } else Sound.play('Loading', () => {
      this.playNewSong()
    })
  }
}
