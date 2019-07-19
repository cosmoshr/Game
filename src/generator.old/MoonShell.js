import moonTypes from '../constants/moons/_types'
import ObjectShell from './ObjectShell'

export default class MoonShell extends ObjectShell {
  resources = {}

  constructor(path) {
    super(path)
    this.degrees = Math.random() * 360

    this.genType()
    this.genResources()

    this.size = Math.random() * (this.type.size[1] - this.type.size[0]) + this.type.size[0]
  }

  genType() {
    const types = []

    moonTypes.forEach(name => {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const moon = require(`../constants/moons/${name}`).default
      if (moon.zone[0] < this.path && moon.zone[1] > this.path) types.push(moon)
    })

    this.type = types[Math.floor(Math.random() * types.length)] || {
      resources: { H3: [500, 3000] },
      size: [2, 3],
      zone: [4, 20],
      chance: 80,
      name: '1'
    }
  }
}
