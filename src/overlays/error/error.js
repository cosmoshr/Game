const errorHTML = require('./error.html').default

const errorStyle = require('./style.css')

export default class ErrorScreen {
  constructor(error) {
    document.getElementById('app').style.display = 'none'

    this.el = document.createElement('div')
    this.el.setAttribute('id', 'errorScreen')
    this.el.innerHTML = errorHTML

    this.error = error

    const style = document.createElement('style')
    style.textContent = errorStyle
    this.el.append(style)

    document.body.appendChild(this.el)

    throw error
  }

  set error(error) {
    this.err = error

    this.el.getElementsByClassName('error')[0].innerHTML = this.err
  }
}
