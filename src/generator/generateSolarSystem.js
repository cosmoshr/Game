import '../functions'

const solarSystems = []

export default (worldSize, maxSolarSystemSize, minSolarSystemSize, solarSystemSpacing) => {
  const maxSolarSystems = Math.floor((worldSize.width * worldSize.height) / ((maxSolarSystemSize + solarSystemSpacing) ** 2))
  const maxSSSqu = maxSolarSystems ** 1.5

  for (let i = 0; i < maxSSSqu; i++) {
    const solarSystem = Math.floor(Math.random() * (maxSolarSystemSize - minSolarSystemSize)) + minSolarSystemSize
    const solarSystemPos = { x: Math.floor(Math.random() * worldSize.width), y: Math.floor(worldSize.height * Math.random()) }
    let isSutible = true
    for (let o = 0; o < solarSystems.length; o++) if (Math.circleIntersect(solarSystemPos, solarSystem, solarSystems[o], solarSystemSpacing)) {
        isSutible = false
        break
      }

    if (isSutible) solarSystems[solarSystems.length] = {
        x: solarSystemPos.x,
        y: solarSystemPos.y,
        r: solarSystem
      }
  }
  return (solarSystems)
}
