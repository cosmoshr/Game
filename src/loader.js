import planetTypes from './constants/planets/_types'
import moonTypes from './constants/moons/_types'
import Soundtrack from '../public/assets/soundtrack'

let hasInit = false

const loaderArray = [
  {
    name: 'sun',
    url: 'assets/textures/stars/1.svg'
  }
]

/**
 * Genterate the texture loader array
 */
const init = () => {
  hasInit = true
  planetTypes.forEach(planetName => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const planet = require(`./constants/planets/${planetName}.js`).default
    for (let i = 0; i < planet.numberOfTextures; i++) loaderArray.push({
      name: `Planets_${planetName}_${i}`,
      url: `assets/textures/planets/${planetName.toLowerCase()}/${i}.svg`
    })
  })

  moonTypes.forEach(moonName => loaderArray.push({
    name: `Moon_${moonName}`,
    url: `assets/textures/moons/${moonName}.svg`
  }))

  Soundtrack.forEach(soundtrack => loaderArray.push({
    name: `Song_${soundtrack.name}`,
    url: `assets/soundtrack/${soundtrack.name}.mp3`
  }))
}

export default function () {
  if (!hasInit) init()
  return loaderArray
}