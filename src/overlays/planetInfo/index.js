const overlayHtml = require('./overlay.html').default
const overlayStyle = require('./style.css')

export default class PlanetInfo {
  constructor(planet) {
    this.planet = planet

    this.el = document.createElement('div')

    this.el.setAttribute('id', 'info-sidebar')
    this.el.innerHTML = overlayHtml
    const style = document.createElement('style')
    style.textContent = overlayStyle
    this.el.append(style)

    document.body.append(this.el)
  }

  set planet(planet) {
    this.p = planet

    if (this.el) this.update()
  }

  get planet() {
    return this.p
  }
}
