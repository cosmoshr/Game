import planet from './planet'
import cicles from './cicles'
import { DB } from '../lib'

const db = new DB()

export default async function generator(height, description) {
  const solarSystem = []
  const galaxys = cicles(height)
  galaxys.forEach((_galaxy, index) => {
    const galaxy = {
      offsetX: _galaxy.x,
      offsetY: _galaxy.y,
      radius: _galaxy.r,
      id: index
    }

    galaxy.sunSize = Math.floor((Math.random() * 200) + 80)

    galaxy.planets = planet(_galaxy.r)

    solarSystem.push(galaxy)
  })

  const state = {
    currentTurn: 1
  }

  const id = await db.cosmos.add({
    cosmos: solarSystem,
    state
  })

  const cosmosList = JSON.parse(window.localStorage.getItem('cosmosList')) || []
  cosmosList.push({
    description, id, dateCreated: Date.now(), lastModified: Date.now()
  })
  localStorage.setItem('cosmosList', JSON.stringify(cosmosList))
  return (id)
}
