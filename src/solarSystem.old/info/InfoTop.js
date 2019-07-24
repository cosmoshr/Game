import { Container } from 'pixi.js'
import Background from './background'
import { Name, BotomText, Population } from './text'
import { PlanetImage, ProjectImage } from './image'
// import PlanetInfo from '../../overlays/planetInfo'

// Type 1: Unclaimed object
// Type 2: Your claimed object
// Type 3: Other's claimed objects

// Todo: Write code to make this usable when we start adding project suport to planets later

export default class InfoTop extends Container {
  constructor(planet) {
    super()

    this.population = 100000000

    if (planet.owner === 'Cosmos') this.status = 2
    else if (planet.owner === 'Nobody') this.status = 1

    this.addChild(new Background(this.status))

    this.addChild(new PlanetImage(planet.texture))

    if (this.status === 1) this.unclaimed(planet)
    else if (this.status === 2) this.yours(planet)
    else this.others(planet)

    this.position.x = planet.size / 2 - this.width / 2
    this.position.y = -planet.size / 4 - 10

    // this.on('pointerdown', this.openInfoScreen)
  }

  set population(population) {
    this.popul = population
    if (this.populationObj) this.populationObj.population = population
  }

  get population() {
    return this.popul
  }

  // Todo: Finish sidebar info properly. Low priority
  // openInfoScreen() {
  //   if (!document.getElementById('info-sidebar')) this.info = new PlanetInfo(this)
  // }

  unclaimed(planet) {
    this.addChild(new Name(planet.name, 1))
  }

  yours(planet) {
    this.addChild(new Name(planet.name, 2))

    this.populationObj = new Population(this.population)
    this.addChild(this.populationObj)

    this.projectObj = new ProjectImage()
    this.addChild(this.projectObj)
  }

  others(planet) {
    this.addChild(new Name(planet.name, 3))
    this.addChild(new BotomText(planet.owner))
  }
}
