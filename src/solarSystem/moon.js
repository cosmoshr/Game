import { Sprite, Loader } from 'pixi.js'
import bus from '../bus'
import sleep from '../lib/sleep'

export default class Moon extends Sprite {
  constructor(moon, distanceFromPlanet) {
    const textureName = `Moon_${moon.type}`
    super(Loader.shared.resources[textureName].texture)

    this.self = moon
    this.self.distanceFromPlanet = distanceFromPlanet / 1.9

    this.x = this.self.distanceFromPlanet * Math.cos(Math.radians(this.self.posInCycle))
    this.y = this.self.distanceFromPlanet * Math.sin(Math.radians(this.self.posInCycle))
    this.angle = this.self.posInCycle

    this.width = this.self.width
    this.height = this.self.width
    bus.on('next-turn', this.nextTurn.bind(this))
  }

  nextTurn() {
    let index = 1
    const next = async () => {
      this.self.posInCycle += 2
      this.x = this.self.distanceFromPlanet * Math.cos(Math.radians(this.self.posInCycle))
      this.y = this.self.distanceFromPlanet * Math.sin(Math.radians(this.self.posInCycle))
      this.angle = this.self.posInCycle
      await sleep(10)
      if (index++ < 20) next()
    }
    next()
  }
}
