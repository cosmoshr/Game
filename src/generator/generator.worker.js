// eslint-disable-next-line import/no-unresolved
import 'subworkers'
import BuildSolarSystem from './buildSolarSystem.worker'
import generateSolarSystem from './generateSolarSystem'
import SolarSystems from '../classes/SolarSystems'

const worldSize = {
  width: 50000,
  height: 50000
}

const maxSolarSystemSize = 5000
const minSolarSystemSize = 1000
const solarSystemSpacing = 200

function getStartingPosition(cosmos) {
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
      SolarSystemWebWorkers--
      if (SolarSystemWebWorkers === 0) postMessage({
        starting: getStartingPosition(cosmos),
        cosmos
      })
    }
  })
}
