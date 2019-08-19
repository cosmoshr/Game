import {
  Sprite, Loader, Container, Text
} from 'pixi.js'
import Moon from '../moon'
import bus from '../../bus'
import sleep from '../../lib/sleep'
import PlanetInfo from './planetInfo'
import { projectActions } from './project'
import origin from '../../constants/origin'

class PlanetCenter extends Sprite {
  constructor(planet) {
    const textureName = `Planets_${planet.type[0]}_${planet.type[1]}`

    super(Loader.shared.resources[textureName].texture)

    this.self = planet

    this.x = -this.self.width / 2
    this.y = -this.self.width / 2

    this.width = this.self.width
    this.height = this.self.width
  }
}

class PlanetBody extends Container {
  constructor(planet, index) {
    super()
    this.self = planet
    this.index = index

    this.angle = this.self.posInCycle

    this.moons = []
    this.self.moons.forEach(moon => this.moons.push(new Moon(moon, this.self.width, this.self.multiplier)))
    this.moons.forEach(moon => this.addChild(moon))

    this.planet = new PlanetCenter(this.self)
    this.addChild(this.planet)
  }
}

export default class Planet extends Container {
  currentProject = ''

  projectTurns = 0

  constructor(planet, index) {
    super()
    this.self = planet

    // eslint-disable-next-line prefer-destructuring
    this.type = this.self.type[0]
    this.isHabitable = this.type === 'Habitital_Planet'
    this.habitated = false

    this.index = index

    this.x = this.self.distanceFromSun * Math.cos(Math.radians(this.self.posInCycle * this.self.multiplier))
    this.y = this.self.distanceFromSun * Math.sin(Math.radians(this.self.posInCycle * this.self.multiplier))

    this.planet = new PlanetBody(this.self, index)
    this.addChild(this.planet)
    this.info = new PlanetInfo(this.self, this.index)
    this.addChild(this.info)

    // TODO: Dectect development enviroments and display debug systems
    //* Uncomment this code to display planet IDs on top of planet
    // this.text = new Text(index, {
    //   fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center'
    // })
    // this.addChild(this.text)

    bus.on('next-turn', this.nextTurn.bind(this))
    bus.on('start', this.nextTurn.bind(this))

    this.interactive = true

    this.on('mouseover', () => {
      bus.emit('SettleShow')
    })

    this.on('mouseout', () => {
      bus.emit('SettleHide')
    })

    if (this.self.habited) {
      this.textx = new Text(this.self.name, {
        fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center'
      })
      this.textx.angle = -this.self.posInCycle
      this.addChild(this.textx)
    }
  }

  async nextTurn(begin = 0) {
    // Project
    if (!this.project && this.currentProject !== '') this.project = projectActions[this.currentProject]

    let projectDone = false
    if (this.project) {
      this.projectTurns += 1
      if (this.projectTurns === this.project.time) projectDone = true
    }

    // Movement
    let index = 1
    if (begin !== 0) this.self.posInCycle += begin * 10
    const next = async () => {
      this.self.posInCycle += 0.5
      this.x = this.self.distanceFromSun * Math.cos(Math.radians(this.self.posInCycle * this.self.multiplier))
      this.y = this.self.distanceFromSun * Math.sin(Math.radians(this.self.posInCycle * this.self.multiplier))
      this.planet.angle = this.self.posInCycle

      await sleep(10)
      if (index++ < 20) await next()
    }

    await next()

    const actions = this.project
    if (projectDone && actions) {
      if (actions.summonEntity) {
        const { x, y } = this.toGlobal(origin)

        // eslint-disable-next-line new-cap
        const entity = new actions.summonEntity()
        entity.setPos(x + 25, y + 25)
        bus.emit('summonEntity', entity)
      }
      delete this.project
    }
  }
}
