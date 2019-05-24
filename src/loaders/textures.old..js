import { Texture } from 'pixi.js'
import planets from '../constants/planets/_types'

const texturePrefix = 'assets/img'


const prefix = 'assets/img'
const planetTypes = [
  {
    name: 'sun',
    url: 'stars',
    num: 1,
    type: 'png'
  },
  {
    name: 'Habitital_Planet',
    url: 'planets',
    num: 3,
    type: 'png'
  },
  {
    name: 'Rocky',
    url: 'planets',
    num: 1,
    type: 'png'
  },
  {
    name: 'Gas',
    url: 'planets',
    num: 1,
    type: 'png'
  }
]


export function init() {
  planetTypes.forEach(planetType => {
    for (let i = 0; i !== planetType.num; i++) {
      if (!textures[planetType.name])
        textures[planetType.name] = []

      textures[planetType.name][i] = Texture.from(`${prefix}/${planetType.url}/${planetType.name}${i}.${planetType.type}`)
    }
  })

  console.log(textures)
}

export default textures

export function randomTexture(name) {
  const num = textures[name].length
  const rand = Math.floor(Math.random() * num)

  const texture = textures[name][rand]
  console.log(texture)
  // throw new Error(texture)

  return texture
}
