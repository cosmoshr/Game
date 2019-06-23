export default class SolarSystems {
  solarSystems = []

  dirty = true

  push(solarSystem) {
    this.solarSystems.push(solarSystem)
  }

  calculate() {
    if (this.dirty) {
      this.habitableSS = []

      this.solarSystems.forEach(ss => {
        let isHabitable = false

        ss.planets.forEach(planet => {
          if (planet.type === 'Habitital_Planet') isHabitable = true
        })

        if (isHabitable) this.habitableSS.push(ss)
      })
    }
  }

  get habitable() {
    this.calculate()

    return this.habitableSS
  }
}
