import bus from '../bus'

export default class EntityRegister {
  constructor(entities = []) {
    this.entities = entities

    bus.on('getActiveEntity', () => bus.emit('activeEntity', this.active))
  }

  pushMultiple(entities) {
    this.entities = [
      ...this.entities,
      ...entities
    ]

    // eslint-disable-next-line prefer-destructuring
    if (!this.a) this.active = this.entities[0]
  }

  push(entity) {
    this.entities.push(entity)

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
