import generateCosmos from '../../generator'

const splashHTML = require('./splash.html').default
const splashCSS = require('./splash.css')

export default class Splash {
  constructor() {
    this.el = document.createElement('div')
    this.el.setAttribute('id', 'splash')
    this.el.innerHTML = splashHTML

    const style = document.createElement('style')
    style.textContent = splashCSS

    this.el.prepend(style)

    this.back();

    ['back', 'newGame', 'loadGame', 'openSettings', 'saveSettings']
      .forEach(query => { this.el.querySelector(`#${query}`).onclick = this[query].bind(this) })

    this.el.querySelector('#quit').onclick = () => history.go(-1)
  }

  toggle(oldPage, newPage) {
    this.el.querySelector(`#${oldPage}`).className = 'page'
    this.el.querySelector(`#${newPage}`).className = 'fadein page'
    this.showBack()
  }

  openSettings() {
    this.toggle('home', 'settings')
    this.el.querySelector('#quality').value = window.localStorage.getItem('quality') || window.devicePixelRatio || 1
  }

  saveSettings() {
    this.back()
    window.localStorage.setItem('quality', this.el.querySelector('#quality').value)
  }

  // --------------------------------------------
  // LOAD GAME MENU
  // --------------------------------------------

  loadGame() {
    this.toggle('home', 'load')

    const games = this.el.querySelector('#games')

    if (!games.firstChild) {
      const cosmosList = JSON.parse(window.localStorage.getItem('cosmosList')) || [{ description: 'No saves Yet! Go generate one!', id: 'X' }]
      cosmosList.forEach(game => {
        const button = document.createElement('custom-button')
        button.setAttribute('class', game.id)
        button.innerText = game.description
        button.onclick = this.startSavedGame.bind(this)
        games.append(button)
      })
    }
  }

  startSavedGame(e) {
    if (e.srcElement.className !== 'X') this.launchGame(Number(e.srcElement.className))
    else {
      this.el.querySelector('#load').className = 'page'
      this.newGame()
    }
  }

  // --------------------------------------------
  // NEW GAME MENU
  // --------------------------------------------
  newGame() {
    this.toggle('home', 'new')
    this.el.querySelector('#createGame').onclick = this.createGame.bind(this)
  }

  async createGame() {
    if (this.el.querySelector('#gameName').value !== '') {
      const id = await generateCosmos(1000, 1000, 1000, this.el.querySelector('#gameName').value)
      this.launchGame(id)
    }
  }

  back() {
    const els = this.el.getElementsByClassName('page')
    for (let i = 0; i < els.length; i++) els[i].className = 'page'

    this.el.querySelector('#home').className = 'fadein page'
    this.el.querySelector('#back').className = 'slideout'
  }

  showBack() {
    this.el.querySelector('#back').className = 'slidein'
  }

  kill() {
    document.querySelector('#app').style.display = 'block'
    this.el.remove()
  }

  pressed(key) {
    if (key.key === 'Escape') { this.back(); return }
    switch (key.target.id) {
      case 'gameName':
        if (key.key === 'Enter') this.createGame()
        break

      case 'quality':
        if (key.key === 'Enter') this.saveSettings()
        break

      default:
        if (key.key === 'Escape' || key.key === 'ArrowLeft') this.back()
        if (key.key === 'Backspace') { key.preventDefault(); this.back() }
        break
    }
  }
}
