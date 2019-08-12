// follows this tutorial:
// https://www.youtube.com/watch?v=XATr_jdh-44


const distance = (x1, y1, x2, y2) => {
  const vx = x1 - x2
  const vy = y1 - y2
  return Math.sqrt(vx * vx + vy * vy)
}

// Uses P5.js for canvas creation and drawing
export default function cicles(height) {
  const circles = [],
    protection = height

  let circle = {},
    overlapping = false,
    counter = 0

  // populate circles array
  // brute force method continues until # of circles target is reached
  // or until the protection value is reached
  while (circles.length < height / 10 && counter < protection) {
    circle = {
      x: Math.floor(Math.random() * height),
      y: Math.floor(Math.random() * height),
      r: Math.floor((Math.random() * 4000) + 2000)
    }
    overlapping = false

    // check that it is not overlapping with any existing circle
    // another brute force approach
    for (let i = 0; i < circles.length; i++) {
      const existing = circles[i]
      const d = distance(circle.x, circle.y, existing.x, existing.y)
      if (d < circle.r + existing.r) {
        // They are overlapping
        overlapping = true
        // do not add to array
        break
      }
    }

    // add valid circles to array
    if (!overlapping) circles.push(circle)

    counter++
  }

  const finale = []

  circles.forEach(_circle => {
    const newCicle = _circle
    newCicle.x -= height / 2
    newCicle.y -= height / 2
    finale.push(newCicle)
  })

  // circles array is complete
  // draw canvas once
  return finale
}
