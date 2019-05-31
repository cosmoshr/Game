import moonTypes from '../constants/moons/_types'
import ObjectShell from './ObjectShell'

export default class MoonShell extends ObjectShell {
  resources = {}

  constructor(path) {
    super(path)
    this.degrees = Math.random() * 360

    this.genType()
    this.genResources()

    this.size = Math.random() * (this.type.default.size[1] - this.type.default.size[0]) + this.type.default.size[0]
  }

  genType() {
    const types = []
    let type

    // eslint-disable-next-line func-names, prefer-arrow-callback
    moonTypes.forEach(function (name) {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const moon = require(`../constants/moons/${name}`)

      if (moon.default.zone[0] < this.path && moon.default.zone[1] > this.path) {
        const id = types.length

        types[id] = moon
        types[id].name = name
      }
    }.bind(this))

    if (types.length !== 1) {
      const rand = Math.floor(Math.random() * types.length)
      type = types[rand]
    } else
      // eslint-disable-next-line prefer-destructuring
      type = types[0]

    this.type = type || {
      default: {
        resources: { H3: [500, 3000] },
        size: [2, 3],
        zone: [4, 20],
        chance: 80
      },
      name: '1'
    }
  }
}
