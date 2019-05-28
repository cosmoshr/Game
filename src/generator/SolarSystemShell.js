import PlanetShell from './PlanetShell'

const minPlanetSpacing = 100
const maxPlanetSpacing = 200

export default class {
  sunSize = Math.floor(Math.random() * 500) + 100

  planets = []

  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.r = size

    this.generatePlanetPaths()
  }

  generatePlanetPaths() {
    let usedSpace = this.sunSize
    let overflow = false
    while (!overflow) {
      const planetPathSize = Math.floor(Math.random() * (maxPlanetSpacing - minPlanetSpacing)) + minPlanetSpacing + usedSpace

      if (planetPathSize < this.r) {
        this.planets[this.planets.length] = {
          path: planetPathSize
        }
        usedSpace = planetPathSize
      } else overflow = true
    }

    this.generatePlanets()
  }

  generatePlanets() {
    this.planets.forEach((planet, i) => {
      this.planets[i] = new PlanetShell(planet.path)
    })
  }
}
