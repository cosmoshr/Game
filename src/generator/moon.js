export default function () {
  const moons = Math.floor(Math.random() * 10)
  if (moons === 0) return []
  const array = []

  let pos = 0
  while (pos < 320) {
    const moon = {}
    moon.type = Math.floor((Math.random() * 4) + 1)
    moon.posInCycle = Math.floor((Math.random() * 360) + pos)
    pos = moon.posInCycle + 40
    moon.width = Math.floor((Math.random() * 17) + 10)
    array.push(moon)
  }

  return array
}
