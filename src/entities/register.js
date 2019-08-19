import { Container } from 'pixi.js'

import bus from '../bus'
import types from './types'
import { Actions } from '.'
import origin from '../constants/origin'

export default class EntityRegister extends Container {
  constructor() {
    super()

    this.entities = []

    bus.on('getActiveEntity', () => bus.emit('activeEntity', this.active))
    bus.on('setActiveEntity', entity => { this.active = entity })
    bus.on('getSaveEntities', () => bus.emit('saveEntities', this.save()))
    bus.on('summonEntity', entity => this.push(entity))
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
      if (entity.action !== Actions.DELETE && entity.transform) {
        const { x, y } = entity.toGlobal(origin)

        const entitySave = {
          entityType: entity.entityType,
          x,
          y
        }

        entity.entitySaveProperties.forEach(prop => {
          if (entity[prop]) entitySave[prop] = entity[prop]
        })

        entitySaves.push(entitySave)
      }
    })

    return entitySaves
  }

  loadSave(save) {
    save.forEach(entity => {
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
