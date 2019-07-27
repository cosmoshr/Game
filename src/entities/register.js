export default class EntityRegiter {
  entities = []

  push(entity) {
    this.entities.push(entity)
  }

  calcTurn() {
    const promises = []

    this.entities.forEach(entity => {
      promises.push(entity.turn())
    })

    return promises
  }
}
