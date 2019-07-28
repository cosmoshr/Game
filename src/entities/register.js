import { Container } from 'pixi.js'

export default class EntityRegister extends Container {
  constructor(entities = []) {
    super()
    this.entities = entities
  }

  pushMultiple(entities) {
    this.entities = [
      ...this.entities,
      ...entities
    ]
  }

  push(entity) {
    this.entities.push(entity)
  }
}
