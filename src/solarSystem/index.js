import { Container } from 'pixi.js'
import Planet from './planet'
import Star from './star'

export default class SolarSystem extends Container {
  planets = []

  habitablePlanets = []

  constructor(solarSystem) {
    super()

    this.x = solarSystem.x
    this.y = solarSystem.y
    this.r = solarSystem.size

    this.position.x = this.x
    this.position.y = this.y

    solarSystem.planets.forEach(planet => {
      const planetObj = new Planet(planet)
      this.addChild(planetObj)
      this.planets.push(planetObj)

      if (planetObj.type === 'Habitital_Planet') this.habitablePlanets.push(planetObj)
    })

    this.addChild(new Star(0, 0, solarSystem.sunSize))
  }
}
