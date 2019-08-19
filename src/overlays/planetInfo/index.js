import { projects, projectActions } from '../../solarSystem/planets/project'
import bus from '../../bus'

const overlayHtml = require('./overlay.html').default
const overlayStyle = require('./style.css')

export default class PlanetInfo {
  constructor() {
    bus.on('next-turn', this.update.bind(this))

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
    this.projectIcon = document.getElementById('project-image')

    document.getElementById('display-project-options').onclick = () => {
      const projectOptions = document.getElementById('project-options')

      if (projectOptions.hasAttribute('style')) projectOptions.removeAttribute('style')
      else projectOptions.setAttribute('style', 'diplay: none; visibility: hidden;height: 0;')
    }
  }

  update() {
    if (this.planet) {
      this.planetName.innerText = this.planet.info.self.name
      if (this.planet.population) this.planetPopulation.innerText = this.planet.population

      if (this.planet.project) {
        this.projectName.innerText = this.planet.project.name
        this.projectProgress.setAttribute('value', this.planet.projectTurns / this.planet.project.time * 100)
        this.projectIcon.setAttribute('src', this.planet.project.icon)
      } else {
        this.projectProgress.setAttribute('value', -1)
        this.projectProgress.removeAttribute('value')
        this.projectName.innerText = 'None'
        this.projectIcon.setAttribute('src', '')
      }
    }

    this.genertateProjects()
  }

  genertateProjects() {
    this.projectOptions = document.getElementById('project-options')
    this.projectOptions.innerHTML = ''

    projects.forEach(projectName => {
      const project = projectActions[projectName]

      const el = document.createElement('div')
      el.setAttribute('class', 'action-option action-image')
      el.setAttribute('project-name', projectName)

      el.onclick = e => {
        const clickEl = e.srcElement
        this.planet.currentProject = clickEl.getAttribute('project-name')
        this.planet.project = project
        this.update()
      }

      const img = document.createElement('img')
      img.setAttribute('src', project.icon)
      img.setAttribute('alt', project.name)

      const imgContainer = document.createElement('div')
      imgContainer.appendChild(img)

      const actionName = document.createElement('h2')
      actionName.setAttribute('class', 'planet-h2 action-name')
      actionName.innerText = project.name

      const actionNameContainer = document.createElement('div')
      actionNameContainer.setAttribute('class', 'action-info')
      actionNameContainer.appendChild(actionName)

      el.appendChild(imgContainer)
      el.appendChild(actionNameContainer)

      this.projectOptions.appendChild(el)
    })
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
