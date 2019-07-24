import {
  Sprite, Loader, Container, Text
} from 'pixi.js'
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
  constructor(planet, index) {
    super()
    this.self = planet

    this.index = index

    this.x = this.self.distanceFromSun * Math.cos(Math.radians(this.self.posInCycle * this.self.multiplier))
    this.y = this.self.distanceFromSun * Math.sin(Math.radians(this.self.posInCycle * this.self.multiplier))
    this.angle = this.self.posInCycle

    this.planet = new PlanetCenter(this.self)
    this.addChild(this.planet)


    this.moons = []
    this.self.moons.forEach(moon => this.moons.push(new Moon(moon, this.self.width, this.self.multiplier)))
    this.moons.forEach(moon => this.addChild(moon))

    this.text = new Text(index, {
      fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center'
    })
    this.text.angle = -this.self.posInCycle
    this.addChild(this.text)

    bus.on('next-turn', this.nextTurn.bind(this))
    bus.on('start', this.nextTurn.bind(this))
    bus.on('InHabit', (id, name) => {
      if (id[0] === this.index[0] && id[1] === this.index[1]) {
        this.textx = new Text(name, {
          fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center'
        })
        this.textx.angle = -this.self.posInCycle
        this.addChild(this.textx)
      }
    })
    this.interactive = true

    this.on('mousedown', () => {
      console.log(this.index)
      bus.emit('Clicky', this.index)
    })

    if (this.self.habited) {
      this.textx = new Text(this.self.name, {
        fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center'
      })
      this.textx.angle = -this.self.posInCycle
      this.addChild(this.textx)
    }
  }

  nextTurn(begin = 0) {
    let index = 1
    if (begin !== 0) this.self.posInCycle += begin * 10
    const next = async () => {
      this.self.posInCycle += 0.5
      this.x = this.self.distanceFromSun * Math.cos(Math.radians(this.self.posInCycle * this.self.multiplier))
      this.y = this.self.distanceFromSun * Math.sin(Math.radians(this.self.posInCycle * this.self.multiplier))
      this.angle = this.self.posInCycle
      this.text.angle = -this.self.posInCycle
      await sleep(10)
      if (index++ < 20) next()
    }
    next()
  }
}
