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
    solarSystemPos.x - radius1 > solarSystems.x + radius2 ||
          solarSystems.x - radius2 > solarSystemPos.x + radius1 ||
          solarSystemPos.y + radius1 < solarSystems.y - radius2 ||
          solarSystems.y + radius2 < solarSystemPos.y - radius1)
    return false


  return true
}

/**
 * Converts degrees and radius of a circle to x and y coordernates
 * @param {x} The x coordernate at the center of the circle
 * @param {y} The y coordernate at the center of the circle
 * @param {rad} The radius of the circle
 * @param {degrees} The degrees to the point you are trying to get
 * @returns {Object} The x and y coordernates
 */
Math.genPosOnCircle = (x, y, rad, degrees) => ({
  x: x + rad * Math.sin(degrees),
  y: y + rad * Math.cos(degrees)
})
