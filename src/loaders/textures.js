import planetTypes from '../constants/planets/_types'

const textures = [
  {
    name: 'sun',
    url: '/assets/img/Stars/Sun1.png'
  },
  {
    name: 'planet',
    url: '/assets/img/Planets/Rocky/0.png'
  }
]

/**
 * Genterate the texture loader array
 */
export function init() {
  planetTypes.forEach(planetName => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const planet = require(`../constants/planets/${planetName}.js`).default
    for (let i = 0; i < planet.numberOfTextures; i++) textures[textures.length] = {
      name: `Planets_${planetName}_${i}`,
      url: `/assets/img/Planets/${planetName}/${i}.png`
    }
  })
}

export default textures
