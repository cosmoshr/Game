import 'subworkers'
import BuildSolarSystem from './buildSolarSystem.worker'
import generateSolarSystem from './generateSolarSystem'

const worldSize = {
  width: 50000,
  height: 50000
}

const maxSolarSystemSize = 5000
const minSolarSystemSize = 1000
const solarSystemSpacing = 200

// eslint-disable-next-line no-unused-vars
onmessage = (_a) => {
  const solarSystem = generateSolarSystem(worldSize, maxSolarSystemSize, minSolarSystemSize, solarSystemSpacing)
  let SolarSystemWebWorkers = 0
  const generatedSolarSystem = []

  solarSystem.forEach((system, index) => {
    SolarSystemWebWorkers++
    const worker = new BuildSolarSystem()
    worker.postMessage(system)
    worker.onmessage = (content) => {
      generatedSolarSystem[index] = content.data
      SolarSystemWebWorkers--
      if (SolarSystemWebWorkers === 0) postMessage(generatedSolarSystem)
    }
  })
}
