export default class Planets {
  planets = []

  dirty = false

  addPlanet(planet) {
    this.planets.push(planet)
    this.dirty = true
  }

  addPlanets(planets) {
    this.planets = this.planets.concat(planets)
    this.dirty = true
  }

  push(planet) {
    this.addPlanet(planet)
  }

  get habitablePlanets() {
    if (this.dirty) {
      this.hPlanets = []

      this.planets.forEach(planet => {
        if (planet.type === 'Habitital_Planet') this.hPlanets.push(planet)
      })

      this.dirty = false
    }

    return this.hPlanets
  }
}
