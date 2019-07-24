import { Text, TextStyle } from 'pixi.js'

export class Name extends Text {
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
export class BotomText extends Text {
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

export class Population extends BotomText {
  constructor(population) {
    super(Math.humanize(population))

    this.population = population
  }

  set population(population) {
    if (this.text !== Math.humanize(population)) this.text = Math.humanize(population)
  }
}
