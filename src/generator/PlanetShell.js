import planetTypes from '../constants/planets/_types'
import MoonShell from './MoonShell'
import ObjectShell from './ObjectShell'

const minMoonSpacing = 5
const maxMoonSpacing = 10

export default class PlanetShell extends ObjectShell {
  resources = {}
  moons = []

  constructor(path) {
    super(path)
    this.degrees = Math.random() * 360

    this.genType()
    this.genResources()

    this.size = Math.random() * (this.type.default.size[1] - this.type.default.size[0]) + this.type.default.size[0]
    this.r = this.size + (Math.random() * (40 - 5) + 5)

    this.genMoon()
  }

  genMoon() {
    let usedSpace = this.size
    let overflow = false

    while (!overflow) {
      const planetPathSize = Math.floor(Math.random() * (maxMoonSpacing - minMoonSpacing)) + minMoonSpacing + usedSpace

      if (planetPathSize < this.r) {
        this.moons.push({
          path: planetPathSize
        })

        usedSpace = planetPathSize
      } else overflow = true
    }

    // eslint-disable-next-line func-names, prefer-arrow-callback
    this.moons.forEach(function (e, i) {
      this.moons[i] = new MoonShell(e.path)
    }.bind(this))
  }

  genType() {
    const types = []
    let type

    planetTypes.forEach(name => {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const planet = require(`../constants/planets/${name}`)

      if (planet.default.zone[0] < this.path && planet.default.zone[1] > this.path) {
        const id = types.length

        types[id] = planet
        types[id].name = name
      }
    })

    if (types.length !== 1) {
      const rand = Math.floor(Math.random() * types.length)
      type = types[rand]
    } else
      // eslint-disable-next-line prefer-destructuring
      type = types[0]

    this.type = type
  }
}
