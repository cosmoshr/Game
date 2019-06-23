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

    this.size = Math.random() * (this.type.size[1] - this.type.size[0]) + this.type.size[0]
    this.r = this.size + (Math.random() * (40 - 5) + 5)

    let usedSpace = this.size
    while (usedSpace < this.r) {
      this.moons.push(new MoonShell(usedSpace))
      usedSpace = Math.floor(Math.random() * (maxMoonSpacing - minMoonSpacing)) + minMoonSpacing + usedSpace
    }
  }

  genType() {
    const types = []

    planetTypes.forEach(name => {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const planet = require(`../constants/planets/${name}`).default

      if (planet.zone[0] < this.path && planet.zone[1] > this.path) types.push(planet)
    })

    this.type = types[Math.floor(Math.random() * types.length)]

    this.texture = Math.floor(Math.random() * this.type.numberOfTextures)
  }
}
