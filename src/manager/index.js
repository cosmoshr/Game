import bus from '../bus'
import { DB } from '../lib'

export default class Manager {
  constructor(viewport) {
    this.viewport = viewport
    this.db = new DB()

    bus.on('next-turn-clicked', this.nextTurn.bind(this))

    this.playerList = { 1: { name: 'Cosmos', isMe: true } }

    bus.on('WhoIs', (playerId, cbk) => {
      bus.emit(`WhoIsCBK-${cbk}`, this.playerList[playerId])
    })

    bus.on('SettleShow', () => {
      this.cosmos.cosmos.forEach((solarSystem, index) => {
        const habitable = []
        solarSystem.planets.forEach((planet, _index) => {
          if (planet.habitated) habitable.push(_index)
        })
        bus.emit(`SettleShow-${index}`, habitable)
      })
    })

    bus.on('SettleHide', () => {
      this.cosmos.cosmos.forEach((solarSystem, index) => {
        bus.emit(`SettleHide-${index}`)
      })
    })


    bus.on('Settle', (id, name) => {
      let okay = true
      this.cosmos.cosmos[id[0]].planets.forEach((planet, index) => {
        if (planet.habitated) if (id[1] + 3 < index || id[1] - 3 > index);
        else okay = false
      })
      if (okay) {
        this.cosmos.cosmos[id[0]].planets[id[1]].habitated = true
        this.cosmos.cosmos[id[0]].planets[id[1]].name = name
        this.cosmos.cosmos[id[0]].planets[id[1]].owner = 1
        bus.emit('InHabit', id, name, 1)
        this.db.cosmos.update(this.id, { cosmos: this.cosmos.cosmos })
      }
    })
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

  start() {
    bus.emit('start', this.cosmos.state.currentTurn)
  }
}
