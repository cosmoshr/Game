import planetTypes from '../constants/planets/_types'
import moonTypes from '../constants/moons/_types'

let hasInit = false

const textures = [
  {
    name: 'sun',
    url: 'assets/textures/stars/1.svg'
  },
  {
    name: 'unclaimed_planet_background',
    url: 'assets/textures/ui/unclaimedPlanetBackground.svg'
  }
]

/**
 * Genterate the texture loader array
 */
const init = () => {
  hasInit = true
  planetTypes.forEach(planetName => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const planet = require(`../constants/planets/${planetName}.js`).default
    for (let i = 0; i < planet.numberOfTextures; i++) textures.push({
      name: `Planets_${planetName}_${i}`,
      url: `assets/textures/planets/${planetName.toLowerCase()}/${i}.svg`
    })
  })

  moonTypes.forEach(moonName => textures.push({
    name: `Moon_${moonName}`,
    url: `assets/textures/moons/${moonName}.svg`
  }))
}

export default function () {
  if (!hasInit) init()
  return textures
}
