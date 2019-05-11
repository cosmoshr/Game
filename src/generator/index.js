import planets from '../constants/planets/_types'
import Planet from '../classes/planet'
import Star from '../classes/star'
import unique from '../unique'

export default class {
  constructor(app) {
    this.app = app
    const id = unique()

    const newStar = new Star(-200, -200, 'Sun', 500, id)
    this.app.stage.addChild(newStar)

    const matrix = []

    Array.from(Array(5).keys()).forEach(x => {
      Array.from(Array(5).keys()).forEach(y => {
        if (x !== 0 && y !== 0) {
          matrix.push([y * 250, x * 250])
          matrix.push([y * 250, x * -250])
          matrix.push([y * -250, x * 250])
          matrix.push([y * -250, x * -250])
        }
      })
    })

    matrix.forEach(coordinates => {
      this.createNewPlanet(coordinates[0], coordinates[1])
    })
  }
  createNewPlanet(x, y) {
    const id = unique()
    const type = planets[Math.floor(Math.random() * planets.length)]

    // eslint-disable-next-line import/no-dynamic-require, global-require
    const planet = require(`../constants/planets/${type}`).default

    const size = Math.floor(Math.random() * ((planet.size[1] - planet.size[0]) + 1)) + planet.size[0]
    const newPlanet = new Planet(x, y, type, size, id)
    this.app.stage.addChild(newPlanet)
  }
}
