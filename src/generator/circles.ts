/**
 * Getting the distance between two points
 * @param x1 The x value for the first object
 * @param y1 The y value for the first object
 * @param x2 The x value for the second object
 * @param y2 The y value for the second object
 */
const distance = (locOne: CirclePos, locTwo: CirclePos): number => {
  const vx = locOne.x - locTwo.x
  const vy = locOne.y - locTwo.y
  return Math.sqrt(vx * vx + vy * vy)
}

export interface CirclePos {
  x: number
  y: number
  r: number
}

export default function circles(height: number): CirclePos[] {
  const circles: CirclePos[] = []
  const protection = height

  let circle: CirclePos | null
  let overlapping = false
  let counter = 0

  // Generate a bunch of circles using brute force
  while (circles.length < height / 10 && counter < protection) {
    // Generate random data for each
    circle = {
      x: Math.floor(Math.random() * height),
      y: Math.floor(Math.random() * height),
      r: Math.floor((Math.random() * 4000) + 2000)
    }

    // Reset overlapping to false
    overlapping = false

    // Checking for overlapping using brute force
    circles.forEach(existing => {
      // Using the distance function to create a distance
      const circleDistance = distance(circle, existing)
      // Check if the circles are overlapping
      if (circleDistance < circle.r + existing.r) {
        // They are overlapping
        overlapping = true
      }
    })

    // Add valid circles to array
    if (!overlapping) circles.push(circle)

    counter++
  }

  const final: CirclePos[] = []

  circles.forEach(_circle => {
    const newCircle = _circle
    newCircle.x -= height / 2
    newCircle.y -= height / 2
    final.push(newCircle)
  })

  // Send out the final data
  return final
}
