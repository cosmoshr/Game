import {
  Container, Loader, Sprite, Text, TextStyle
} from 'pixi.js'
import Line from '../graphics/Line'
import Players from '../../data/players'
import PieCircle from '../graphics/Pie/circle'
import '../../functions'

// Type 1: Unclaimed object
// Type 2: Your claimed object
// Type 3: Other's claimed objects

class Background extends Sprite {
  constructor(status) {
    let textureName

    if (status === 1) textureName = 'unclaimed_planet_background'
    else if (status === 2) textureName = 'your_planet_background'
    else textureName = 'other_planet_background'

    super(Loader.shared.resources[textureName].texture)

    if (status === 1) this.width = 36
    else if (status === 2) this.width = 60
    else this.width = 45

    this.height = 15
  }
}

// Todo: Write code to make this usable when we start adding project suport to planets later
// Todo: Make a pie graph type thing that can go behind this
class ProjectImage extends Sprite {
  constructor() {
    super(Loader.shared.resources.sun.texture)

    this.width = 12
    this.height = 12

    this.position.x = 46.5
    this.position.y = 1.5
  }
}

// Todo: Make a pie graph type thing that can go behind this
class PlanetImage extends Sprite {
  constructor(textureName) {
    super(Loader.shared.resources[textureName].texture)

    this.width = 12
    this.height = 12

    this.position.x = 1.5
    this.position.y = 1.5
  }
}

class Name extends Text {
  constructor(name, status) {
    const style = new TextStyle({
      fontFamily: 'Overpass',
      fontSize: 2.5
    })

    super(name, style)

    if (status === 1) {
      this.position.x = 18
      this.position.y = 6.5
    } else {
      this.position.x = 16.5
      this.position.y = 3.75
    }

    this.resolution = 25
  }
}

class BotomText extends Text {
  constructor(text) {
    const style = new TextStyle({
      fontFamily: 'Overpass',
      fill: 0x606060,
      fontWeight: 300,
      fontSize: 2
    })

    super(text, style)

    this.position.x = 16.5
    this.position.y = 9

    this.resolution = 25
  }
}

class Population extends BotomText {
  constructor(population) {
    super(Math.humanize(population))

    this.population = population
  }

  set population(population) {
    if (this.text !== Math.humanize(population)) this.text = Math.humanize(population)
  }
}

export default class InfoTop extends Container {
  constructor(planet) {
    super()

    this.population = 100000000

    this.status = Players.getPlanetOwnershipStatus(planet.owner)

    this.addChild(new Background(this.status))

    if (this.status === 1) this.unclaimed(planet)
    else if (this.status === 2) this.yours(planet)
    else this.others(planet)

    this.position.x = planet.size / 2 - this.width / 2
    this.position.y = -planet.size / 4 - 10
  }

  set population(population) {
    this.popul = population
    if (this.populationObj) this.populationObj.population = population
  }

  get population() {
    return this.popul
  }

  unclaimed(planet) {
    this.addChild(new PlanetImage(planet.texture))
    this.addChild(new Line(0.0375, 0xCECECE, 1, 15.75, 3.75, 15.75, 11.25))
    this.addChild(new Name(planet.name, 1))
  }

  yours(planet) {
    this.addChild(new PlanetImage(planet.texture))
    this.addChild(new Name(planet.name, 2))

    this.populationObj = new Population(this.population)
    this.addChild(this.populationObj)

    this.projectObj = new ProjectImage()
    this.addChild(this.projectObj)
  }

  others() {
    this.test = new PieCircle(0, 0, 7.5, 110, 0x808080)
    this.test.position.x = 7.5
    this.test.position.y = 7.5
    this.addChild(this.test)

    // this.addChild(new PlanetImage(planet.texture))
    // this.addChild(new Name(planet.name, 3))
    // this.addChild(new BotomText(planet.owner))
  }
}