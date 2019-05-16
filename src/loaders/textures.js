import planets from '../constants/planets/_types'

const texturePrefix = '/assets/img'

const textures = []

export function init() {
  textures.push(
    {
      name: 'Stars_Sun',
      url: `${texturePrefix}/stars/Sun1.png`
    },
    {
      name: 'Atmosphere',
      url: `${texturePrefix}/Atmosphere1.svg`
    }
  )
  planets.forEach(element => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const planet = require(`../constants/planets/${element}`)
    for (let i = 0; i < planet.default.numberOfTextures; i++) {
      const texture = {
        name: `Planets_${element}_${i}`,
        url: `${texturePrefix}/Planets/${element}/${i}.png`
      }
      textures.push(texture)
    }
  })
}

export default function () {
  return textures
}
