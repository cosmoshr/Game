/**
 * Converts from degrees to radians
 * @param degrees The degrees that you want converted to radians
 */
Math.radians = degrees => (degrees * Math.PI) / 180

/**
 * Converts from radians to degrees
 * @param radians The radians that you want converted to degrees
 */
Math.degrees = radians => (radians * 180) / Math.PI

Math.circleIntersect = (solarSystemPos, solarSystem, solarSystems, solarSystemSpacing) => {
  const radius1 = solarSystem + solarSystemSpacing,
    radius2 = solarSystems.r + solarSystemSpacing

  if (
    solarSystemPos.x - radius1 > solarSystems.x + radius2
          || solarSystems.x - radius2 > solarSystemPos.x + radius1
          || solarSystemPos.y + radius1 < solarSystems.y - radius2
          || solarSystems.y + radius2 < solarSystemPos.y - radius1) return false


  return true
}

/**
 * Converts degrees and radius of a circle to x and y coordernates
 * @param {Number} centerX The x coordernate at the center of the circle
 * @param {Number} centerY The y coordernate at the center of the circle
 * @param {Number} rad The radius of the circle
 * @param {Number} degrees The degrees to the point you are trying to get
 * @returns {Object} The x and y coordernates
 */
Math.genPosOnCircle = (centerX, centerY, rad, degrees) => {
  const x = centerX + rad * Math.sin(degrees)
  const y = centerY + rad * Math.cos(degrees)

  return {
    x,
    y
  }
}

/**
 * Humanize a number e.g. 10k
 * @param {Number} value The number you want to conbert
 * @returns {String} Humanized number
 * @author mischat
 */
Math.humanize = value => {
  const mag = Math.magnitude(value)

  if (mag <= 3) return value
  if (mag > 3 && mag <= 6) return `${value.toString().substr(0, mag - 3)}K`
  if (mag > 6 && mag <= 9) return `${value.toString().substr(0, mag - 6)}M`
  if (mag > 9 && mag <= 12) return `${value.toString().substr(0, mag - 9)}B`
  if (mag > 12 && mag <= 15) return `${value.toString().substr(0, mag - 12)}T`

  return value
}

Math.magnitude = value => {
  let v = value
  let mag = 0

  while (v > 1) {
    mag++
    v /= 10
  }

  return mag
}
