import planetTypes from '../constants/planets/_types'
import moon from './moon.ts'

export interface Planet {
  
}

const generateType = () => {
  const type = []

  type[0] = planetTypes[Math.floor(Math.random() * planetTypes.length)]

  // eslint-disable-next-line import/no-dynamic-require, global-require
  const planet = require(`../constants/planets/${type}`).default

  type[1] = Math.floor(Math.random() * (planet.numberOfTextures - 1))

  return type
}

export default function (radius: number): Planet[] {
  const planets: Planet[] = []
  
  const numPlanets = Math.floor((radius - 300) / 110)

  for (let index = 0; index < numPlanets; index++) {
    const planet: Planet = {
      multiplier: Math.floor((Math.random() * 5) + 1),
      width: Math.floor((Math.random() * 60) + 40),
      posInCycle: Math.floor(Math.random() * 360),
      distanceFromSun: 300 + 110 * index,
      type: generateType(),
      name: 'Something',
      moon: moon()
    }

    planets.push(planet)
  }

  return planets
}
