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

    bus.on('settlePlanet', planet => {
      let okay = true
      if (planet.habitated) okay = false

      if (okay) {
        const name = this.planetNames[Math.floor(Math.random() * this.planetNames.length)]

        planet.setSettleProperties(true, name, 1)

        bus.emit('InHabit', planet.index, name, 1)

        this.db.cosmos.update(this.id, { cosmos: this.cosmos.cosmos })
      }
    })

    bus.on('Settle', async id => {
      let okay = true
      this.cosmos.cosmos[id[0]].planets.forEach((planet, index) => {
        if (planet.habitated) if (!(id[1] + 3 < index || id[1] - 3 > index)) okay = false
      })
      if (okay) {
        const name = this.planetNames[Math.floor(Math.random() * this.planetNames.length)]

        this.cosmos.cosmos[id[0]].planets[id[1]].habitated = true
        this.cosmos.cosmos[id[0]].planets[id[1]].name = name
        this.cosmos.cosmos[id[0]].planets[id[1]].owner = 1

        bus.emit('InHabit', id, name, 1)

        this.db.cosmos.update(this.id, { cosmos: this.cosmos.cosmos })
      }
    })

    bus.on('getClosestPlanet', (x, y) => {
      let closestCordDiff = Math.lineLenght(x, y, x + 10000, y + 10000)
      let closestPlanet

      this.cosmos.cosmos.forEach(ss => {
        ss.planets.forEach(planet => {
          const cordDiff = Math.lineLenght(x, y, planet.position.x, planet.position.y)
          if (closestCordDiff > cordDiff) {
            closestPlanet = planet
            closestCordDiff = cordDiff
          }
        })
      })

      bus.emit('closestPlanet', closestPlanet)
    })
  }

  async launchGame(id) {
    this.id = id
    this.cosmos = await this.db.cosmos.get(id)

    return this.cosmos.cosmos
  }

  async nextTurn() {
    const { state } = this.cosmos
    state.currentTurn += 1
    await this.db.cosmos.update(this.id, { state })
    bus.emit('next-turn')
  }

  async start() {
    if (!this.planetNames) this.planetNames = await import(/* webpackChunkName: "planetNames" */ '../constants/planetNames.js')
    this.planetNames = this.planetNames.default

    bus.emit('start', this.cosmos.state.currentTurn)
  }
}
