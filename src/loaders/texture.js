import planetTypes from '../constants/planets/_types'

let hasInit = false

const textures = [
  {
    name: 'sun',
    url: 'assets/img/Stars/Sun1.png'
  },
  {
    name: 'planet',
    url: 'assets/img/Planets/Rocky/0.png'
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
    for (let i = 0; i < planet.numberOfTextures; i++) textures[textures.length] = {
      name: `Planets_${planetName}_${i}`,
      url: `assets/img/Planets/${planetName}/${i}.png`
    }
  })
}

export default function () {
  if (!hasInit) init()
  console.log(textures)
  return textures
}
