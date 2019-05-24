import SolarSystemShell from './SolarSystemShell'

function start(solarSystem) {
  // ! x, y, z
  const newSolarSystem = new SolarSystemShell(solarSystem.x, solarSystem.y, solarSystem.r)
  postMessage(newSolarSystem)
}

onmessage = (e) => {
  start(e.data)
}
