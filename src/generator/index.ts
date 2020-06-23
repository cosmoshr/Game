import planet, { Planet } from './planet.ts'
import circles, { CirclePos } from './circles.ts'
import { DB } from '../lib/index'

const db = new DB()

export interface SolarSystem {
  offsetX: number
  offsetY: number
  radius: number
  sunSize: number
  planets: Planet[]
}

export interface CosmosList {
  description: string
  id: number
  dateCreated: number
  lastModified: number
}

export default async function generator(height: number, description: string){
  const solarSystems: SolarSystem[] | CirclePos[] = circles(height)
  solarSystems.map((_ss, index) => ({
      offsetX: _ss.x,
      offsetY: _ss.y,
      radius: _ss.r,
      sunSize: Math.floor((Math.random() * 200) + 80),
      planets: planet(_ss.r),
      id: index
    }))

  const id = await db.cosmos.add({
    cosmos: solarSystems,
    state: {
      currentTurn: 1
    }
  })

  const cosmosList: CosmosList[] = JSON.parse(window.localStorage.getItem('cosmosList')) || []
  cosmosList.push({
    description, 
    id, 
    dateCreated: Date.now(), 
    lastModified: Date.now()
  })
  localStorage.setItem('cosmosList', JSON.stringify(cosmosList))
  
  return (id)
}
