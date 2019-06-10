import { Graphics } from 'pixi.js'

function rotateXY(x, y, angle) {
  const rad = Math.PI * angle / 180
  const cosVal = Math.cos(rad)
  const sinVal = Math.sin(rad)
  return {
    x: cosVal * x - sinVal * y,
    y: sinVal * x + cosVal * y
  }
}

function computeMaskPolygon(x, y, radius, a) {
  let angle = a

  while (angle < 0) angle += 360

  angle %= 360

  const delta = rotateXY(0, -2 * radius, angle)

  const pts = [
    { x, y: y - 2 * radius },
    { x, y },
    { x: x + delta.x, y: y + delta.y }
  ]

  if (angle > 270) pts.push({ x: x - 2 * radius, y })
  if (angle > 180) pts.push({ x, y: y + 2 * radius })
  if (angle > 90) pts.push({ x: x + 2 * radius, y })

  return pts
}

export default class PieMask extends Graphics {
  /**
   * Create the mask
   * @param {Number} angle The angle of the slice
   * @param {Number} x The x of the mask
   * @param {Number} y The y of the mask
   * @param {Number} r The radius of the mask
   */
  constructor(x, y, r, angle = 90) {
    super()

    this.angle = angle
    this.xPoint = x
    this.yPoint = y
    this.r = r
  }

  /** Updates the mask */
  update() {
    this.clear()

    const pts = computeMaskPolygon(this.xPoint, this.yPoint, this.radius, this.angle)
    this.beginFill(0xFFFFFF)
    this.moveTo(pts[0].x, pts[0].y)

    for (let i = 1; i < pts.length; ++i) this.lineTo(pts[i].x, pts[i].y)

    this.lineTo(pts[0].x, pts[0].y)
    this.endFill()
  }

  /**
   * Set xPoint variable and call the update function
   * @param {Number} x The new x position
   */
  set x(x) {
    this.xPoint = x
    this.update()
  }

  /**
   * Set the yPoint variable and call the update function
   * @param {Number} y The new y position
   */
  set y(y) {
    this.yPoint = y
    this.update()
  }

  /**
   * Set the radius variable and call the update function
   * @param {Number} r The new radius
   */
  set r(r) {
    this.radius = r
    this.update()
  }

  /**
   * Set the angle variable and call the update function
   * @param {Number} a The angle
   */
  set a(a) {
    this.angle = a
    this.update()
  }
}
