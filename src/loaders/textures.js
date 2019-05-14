import { Texture } from 'pixi.js'

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
    num: 1,
    type: 'png'
  }
]

const textures = {}

planetTypes.forEach(planetType => {
  for (let i = 1; i !== planetType.num; i++) {
    textures[planetType.name + i] = Texture.from(`${prefix}/${planetType.url}/${planetType.name}${i}.${planetType.prefix}`)
  }
})

export default textures
