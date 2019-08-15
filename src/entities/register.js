import { Container } from 'pixi.js'

import bus from '../bus'
import types from './types'

export default class EntityRegister extends Container {
  constructor() {
    super()

    this.entities = []

    bus.on('getActiveEntity', () => bus.emit('activeEntity', this.active))
    bus.on('getSaveEntities', () => bus.emit('saveEntities', this.save()))
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

  save() {
    const entitySaves = []

    this.entities.forEach(entity => {
      const entitySave = {
        entityType: entity.entityType
      }

      entity.entitySaveProperties.forEach(prop => {
        entitySave[prop] = entity[prop]
      })

      entitySaves.push(entitySave)
    })

    return entitySaves
  }

  loadSave(save) {
    save.forEach(entity => {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const EntityBase = types[entity.entityType]

      const newEntity = new EntityBase()
      newEntity.loadSave(entity)

      this.push(newEntity)
    })
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
