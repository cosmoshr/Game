import planet from './planet'
import cicles from './cicles'

// [
//   {
//     sunSize: 50,
//     planets: [
//       {
//         name: 'Something',
//         distanceFromSun: 150, // Increments by 100 starts at 150
//         width: 60, // 40 - 60
//         posInCycle: 180, // How far on the loop in degrees
//         type: ['Habitital_Planet', 1],
//         moons: [
//           {
//             width: 17, // 10 - 17
//             posInCycle: 0,
//             type: 1
//           }
//         ]
//       }
//     ],
//     offsetX: 0,
//     offsetY: 0
//   }
// ]

export default function generator(height, width, numGalaxys) {
  const solarSystem = []
  const galaxys = cicles(height, width, numGalaxys)
  galaxys.forEach(_galaxy => {
    const galaxy = {
      offsetX: _galaxy.x,
      offsetY: _galaxy.y,
      radius: _galaxy.r
    }

    galaxy.sunSize = Math.floor((Math.random() * 100) + 80)

    galaxy.planets = planet(_galaxy.r)

    solarSystem.push(galaxy)
  })

  return solarSystem
}
