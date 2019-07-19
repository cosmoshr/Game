import { Container } from 'pixi.js'
import Planet from './planet'
import Star from './star'
import generator from '../generator'

class Galaxy extends Container {
  constructor(galaxy) {
    super()
    this.x = galaxy.offsetX
    this.y = galaxy.offsetY

    this.sun = new Star(galaxy.sunSize)
    this.addChild(this.sun)

    this.planets = []
    galaxy.planets.forEach(planet => this.planets.push(new Planet(planet)))
    this.planets.forEach(planet => this.addChild(planet))
  }
}


export default class SolarSystem extends Container {
  constructor() {
    super()
    this.x = 0
    this.y = 0

    const solarSystem = generator(1000, 1000, 10000)

    this.galaxys = []
    solarSystem.forEach(galaxy => this.galaxys.push(new Galaxy(galaxy)))
    this.galaxys.forEach(galaxy => this.addChild(galaxy))
  }
}
