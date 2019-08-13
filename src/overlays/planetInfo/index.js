const overlayHtml = require('./overlay.html').default
const overlayStyle = require('./style.css')

export default class PlanetInfo {
  constructor() {
    this.el = document.createElement('div')

    this.el.setAttribute('id', 'info-sidebar')
    this.el.innerHTML = overlayHtml
    const style = document.createElement('style')
    style.textContent = overlayStyle
    this.el.append(style)

    document.body.append(this.el)

    this.planetName = document.getElementById('planet-name')
    this.planetPopulation = document.getElementById('planet-population')

    this.projectName = document.getElementById('project-name')
    this.projectProgress = document.getElementById('project-progress')
  }

  update() {
    this.planetName.innerText = this.planet.info.self.name
    if (this.planet.population) this.planetPopulation.innerText = this.planet.population

    if (this.planet.project) {
      this.projectName.innerText = this.planet.project.name
      this.projectProgress.setAttribute('value', this.planet.project.progress)
    } else {
      this.projectProgress.setAttribute('value', -1)
      this.projectProgress.removeAttribute('value')
      this.projectName.innerText = 'None'
    }
  }

  setPlanet(planet) {
    this.planet = planet

    this.update()

    this.show()
  }

  hide() {
    this.i = 1
    document.getElementById('info-sidebar').style.visibility = 'hidden'
  }

  show() {
    this.i = 1
    document.getElementById('info-sidebar').style.visibility = 'visible'
  }
}
