export default class SolarSystems {
  solarSystems = []

  dirty = true

  pushCosmos(cosmos) {
    cosmos.forEach(ss => {
      this.push(ss)
    })

    return this
  }

  push(solarSystem) {
    this.solarSystems.push(solarSystem)
    this.dirty = true

    return this
  }

  calculate() {
    if (this.dirty) {
      this.habitableSS = []

      this.solarSystems.forEach(ss => {
        let isHabitable = false

        ss.planets.forEach(planet => {
          if (planet.isHabitable) isHabitable = true
        })

        if (isHabitable) this.habitableSS.push(ss)
      })

      this.dirty = false
    }
  }

  get habitable() {
    this.calculate()

    return this.habitableSS
  }
}
