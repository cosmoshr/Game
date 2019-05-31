import planetTypes from '../constants/planets/_types'
import moonTypes from '../constants/moons/_types'

let hasInit = false

const textures = [
  {
    name: 'sun',
    url: 'assets/img/Stars/Sun1.png'
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
      url: `assets/img/Planets/${planetName}/${i}.png`
    })
  })

  moonTypes.forEach(planetName => textures.push({
      name: `moon_${planetName}`,
      url: `assets/img/Moons/${planetName}.png`
    }))
}

export default function () {
  if (!hasInit) init()
  console.log(textures)
  return textures
}
