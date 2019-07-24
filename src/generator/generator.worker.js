import 'subworkers'
import BuildSolarSystem from './buildSolarSystem.worker'
import generateSolarSystem from './generateSolarSystem'
import SolarSystems from '../solarSystem/SolarSystems'

const worldSize = {
  width: 50000,
  height: 50000
}

const maxSolarSystemSize = 5000
const minSolarSystemSize = 1000
const solarSystemSpacing = 200

let planetIndex = 0

function getStartingPlanet(cosmos) {
  const cosmosSorted = new SolarSystems().pushCosmos(cosmos)
  const solarSystem = cosmosSorted.habitable[Math.floor(Math.random() * cosmosSorted.habitable.length)]
  const planet = solarSystem.habitablePlanets[Math.floor(Math.random() * solarSystem.habitablePlanets.length)]

  return {
    solarSystem,
    planet
  }
}

// eslint-disable-next-line no-unused-vars
onmessage = (_a) => {
  const solarSystem = generateSolarSystem(worldSize, maxSolarSystemSize, minSolarSystemSize, solarSystemSpacing)
  let SolarSystemWebWorkers = 0
  const cosmos = []

  solarSystem.forEach((system, index) => {
    SolarSystemWebWorkers++
    const worker = new BuildSolarSystem()
    worker.postMessage(system)
    worker.onmessage = (content) => {
      cosmos[index] = content.data

      cosmos[index].planets.forEach((planet, i) => {
        cosmos[index].planets[i].index = planetIndex++
      })

      SolarSystemWebWorkers--

      if (SolarSystemWebWorkers === 0) postMessage({
        starting: getStartingPlanet(cosmos),
        cosmos
      })
    }
  })
}
