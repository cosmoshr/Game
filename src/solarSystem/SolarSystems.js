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

  calcTurn() {
    let allTurnPromises = []

    this.solarSystems.forEach(ss => {
      allTurnPromises = [...allTurnPromises, ...ss.turn()]
    })

    return allTurnPromises
  }

  findSolarSystemWithPlanet(index) {
    let ssArrIndex
    let planetArrIndex

    this.solarSystems.some((ss, ssi) => {
      const hasPlanet = ss.planets.some((planet, pi) => {
        if (planet.index === index) planetArrIndex = pi

        return planet.index === index
      })

      if (hasPlanet) ssArrIndex = ssi

      return hasPlanet
    })

    return {
      ssArrIndex,
      planetArrIndex
    }
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
