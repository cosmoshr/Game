export class Player {
  constructor(name, isHuman) {
    this.name = name
    this.isHuman = isHuman
  }
}

const Players = []

/**
 * Get the user with the name of your choice
 * @param {String} name The name of the user (case sensitive)
 */
Players.getPlayer = name => {
  let user

  Players.forEach(rawUser => {
    if (rawUser.name === name) user = rawUser
  })

  if (user) return user

  return false
}

/**
 * Get ownership status based on the owner
 * @param {String} owner The name of the owner
 * @return {Number} The status of the planet (1: User does not exist / uninhabited, 2: Inhabited by player / your planet, 3: Inhabited by a non-player)
 */
Players.getPlanetOwnershipStatus = (owner) => {
  const player = Players.getPlayer(owner)

  if (player) {
    if (player.isHuman) return 2

    return 3
  }

  return 1
}

export default Players
