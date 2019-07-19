import PlanetShell from './PlanetShell'

const minPlanetSpacing = 100
const maxPlanetSpacing = 200

onmessage = (e) => {
  const sunSize = Math.floor(Math.random() * 500) + 100
  const planets = []
  const solarSystem = {
    sunSize, ...e.data
  }

  let usedSpace = sunSize
  while (usedSpace < e.data.r) {
    planets.push(new PlanetShell(usedSpace))
    usedSpace = Math.floor(Math.random() * (maxPlanetSpacing - minPlanetSpacing)) + minPlanetSpacing + usedSpace
  }
  solarSystem.planets = planets
  postMessage(solarSystem)
}
