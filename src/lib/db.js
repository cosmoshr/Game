import Dexie from 'dexie'

export default class DB extends Dexie {
  constructor() {
    super('CosmosHR')

    this.version(1).stores({
      cosmos: '++id,cosmos,state,entities',
      cosmosList: ''
    })
  }
}
