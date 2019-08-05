import planetTypes from '../constants/planets/_types'
import moonTypes from '../constants/moons/_types'
import essential from './essential'

export default function required() {
  const array = [
    {
      name: 'sun',
      url: 'assets/textures/stars/1.svg'
    },
    {
      name: 'unclaimed_planet_background',
      url: 'assets/textures/ui/unclaimedPlanetBackground.svg'
    },
    {
      name: 'your_planet_background',
      url: 'assets/textures/ui/yourPlanetBackground.svg'
    },
    {
      name: 'other_planet_background',
      url: 'assets/textures/ui/otherPlanetBackground.svg'
    },
    {
      name: 'blank',
      url: 'assets/textures/blank.svg'
    },
    {
      name: 'settler',
      url: 'assets/textures/entities/settler.svg'
    },
    {
      name: 'settler_throttle',
      url: 'assets/textures/entities/settlerThrottle.svg'
    }
  ]

  planetTypes.forEach(planetName => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const planet = require(`../constants/planets/${planetName}.js`).default
    for (let i = 0; i < planet.numberOfTextures; i++) array.push({
      name: `Planets_${planetName}_${i}`,
      url: `assets/textures/planets/${planetName.toLowerCase()}/${i}.svg`
    })
  })

  moonTypes.forEach(moonName => array.push({
    name: `Moon_${moonName}`,
    url: `assets/textures/moons/${moonName}.svg`
  }))

  return array.filter(item => !essential.some(item2 => item.name === item2.name))
}
