import bus from '../bus'
import { DB } from '../lib'

export default class Manager {
  constructor(viewport) {
    this.viewport = viewport
    this.db = new DB()

    bus.on('next-turn-clicked', this.nextTurn.bind(this))
  }

  async launchGame(id) {
    this.id = id
    this.cosmos = await this.db.cosmos.get(id)

    return { cosmos: this.cosmos.cosmos, state: this.cosmos.state }
  }

  async nextTurn() {
    const { state } = this.cosmos
    state.currentTurn += 1
    await this.db.cosmos.update(this.id, { state })
    bus.emit('next-turn')
  }
}
