import planetTypes from '../constants/planets/_types'

const generateType = () => {
  const type = []

  type[0] = planetTypes[Math.floor(Math.random() * planetTypes.length)]

  // eslint-disable-next-line import/no-dynamic-require, global-require
  const planet = require(`../constants/planets/${type}`).default

  type[1] = Math.floor(Math.random() * (planet.numberOfTextures - 1))

  return type
}

export default function (radius) {
  const planets = []
  const numPlanets = Math.floor((radius - 300) / 110)

  for (let index = 0; index < numPlanets; index++) {
    const planet = {
      name: 'Something',
      distanceFromSun: 300 + 110 * index,
      moons: []
    }

    planet.width = Math.floor((Math.random() * 60) + 40)

    planet.posInCycle = Math.floor(Math.random() * 360)

    planet.type = generateType()

    planets.push(planet)
  }

  return planets
}
