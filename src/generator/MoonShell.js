import moonTypes from '../constants/moons/_types'

export default class MoonShell {
  resources = {}

  constructor(path) {
    this.path = path
    this.degrees = Math.random() * 360

    this.genType()
    this.genResources()

    this.size = Math.random() * (this.type.default.size[1] - this.type.default.size[0]) + this.type.default.size[0]
  }

  genResources() {
    Object.keys(this.type.default.resources).forEach(item => {
      const object = this.type.default.resources[item]

      this.resources[item] = Math.random() * (object[1] - object[0]) + object[0]
    })
  }

  genType() {
    const types = []
    let type

    moonTypes.forEach(name => {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const moon = require(`../constants/moons/${name}`)

      if (moon.default.zone[0] < this.path && moon.default.zone[1] > this.path) {
        const id = types.length

        types[id] = moon
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
