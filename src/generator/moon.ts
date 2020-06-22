export interface Moon {
  type: number
  posInCycle: number
  width: number
}

export default function (): Moon[] {
  const moons: Moon[] = []

  let pos = 0
  while (pos < 320) {
    const moon: Moon = {
      posInCycle: Math.floor((Math.random() * 320) + pos),
      width: Math.floor((Math.random() * 17) + 10),
      type: Math.floor((Math.random() * 4) + 1),
    }

    pos = moon.posInCycle + 40

    moons.push(moon)
  }

  return moons
}
