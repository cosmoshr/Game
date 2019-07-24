import { Container, Graphics } from 'pixi.js'
import Planet from './planet'
import Star from './star'

export default class SolarSystem extends Container {
  planets = []

  constructor(solarSystem) {
    super()

    this.x = solarSystem.x
    this.y = solarSystem.y
    this.r = solarSystem.size

    this.position.x = this.x
    this.position.y = this.y

    solarSystem.planets.forEach(planet => {
      const planetObj = new Planet(planet)

      this.planets.push(planetObj)
      this.addChild(planetObj)
    })
    this.addChild(new Star(0, 0, solarSystem.sunSize))

    const circle = new Graphics()
    circle.beginFill(0xFFFFFF)
    circle.drawCircle(this.x, this.y, this.r)
    circle.endFill()
    this.addChild(circle)
  }

  turn() {
    const promisies = []

    promisies.push(new Promise(r => {
      // eslint-disable-next-line no-console
      console.log('Do a thing')
      r()
    }))

    this.planets.forEach(p => {
      promisies.push(p.turn())
    })

    return promisies
  }
}
