import { Container } from 'pixi.js'
import bus from '../bus'

export default class EntityRegister extends Container {
  constructor(entities = []) {
    super()
    this.entities = entities

    bus.on('getActiveEntity', () => bus.emit('activeEntity', this.active))
  }

  pushMultiple(entities) {
    this.entities = [
      ...this.entities,
      ...entities
    ]

    entities.forEach(entity => this.addChild(entity))

    // eslint-disable-next-line prefer-destructuring
    if (!this.a) this.active = this.entities[0]
  }

  push(entity) {
    this.entities.push(entity)
    this.addChild(entity)

    // eslint-disable-next-line prefer-destructuring
    if (!this.a) this.active = this.entities[0]
  }

  set active(active) {
    this.a = active
    this.updateActive()
  }

  get active() {
    // eslint-disable-next-line prefer-destructuring
    if (!this.a) this.a = this.entities[0]

    return this.a
  }
}
