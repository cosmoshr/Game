import { Sprite, Loader, Container } from 'pixi.js'
import Moon from './moon'
import bus from '../bus'
import sleep from '../lib/sleep'

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

export default class Planet extends Container {
  constructor(planet) {
    super()
    this.self = planet

    this.x = this.self.distanceFromSun * Math.cos(Math.radians(this.self.posInCycle))
    this.y = this.self.distanceFromSun * Math.sin(Math.radians(this.self.posInCycle))
    this.angle = this.self.posInCycle

    this.planet = new PlanetCenter(this.self)
    this.addChild(this.planet)

    this.moons = []
    this.self.moons.forEach(moon => this.moons.push(new Moon(moon, this.self.width)))
    this.moons.forEach(moon => this.addChild(moon))

    bus.on('next-turn', this.nextTurn.bind(this))
  }

  nextTurn() {
    let index = 1
    const next = async () => {
      this.self.posInCycle += 0.5
      this.x = this.self.distanceFromSun * Math.cos(Math.radians(this.self.posInCycle))
      this.y = this.self.distanceFromSun * Math.sin(Math.radians(this.self.posInCycle))
      this.angle = this.self.posInCycle
      await sleep(10)
      if (index++ < 20) next()
    }
    next()
  }
}
