import { Container, Graphics } from 'pixi.js'
import Planet from './planet'
import Star from './star'

export default class extends Container {
  constructor(solarSystem) {
    super()

    this.x = solarSystem.x
    this.y = solarSystem.y
    this.r = solarSystem.size

    this.position.x = this.x
    this.position.y = this.y

    solarSystem.planets.forEach(planet => {
      console.log(planet)
      this.addChild(new Planet(planet))
    })
    this.addChild(new Star(0, 0, solarSystem.sunSize))

    const circle = new Graphics()
    circle.beginFill(0xFFFFFF)
    circle.drawCircle(this.x, this.y, this.r)
    circle.endFill()
    this.addChild(circle)
  }
}
