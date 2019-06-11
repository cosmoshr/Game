const splashHTML = require('./splash.html').default
const splashCSS = require('./splash.css')

export default class {
  constructor() {
    this.el = document.createElement('div')
    this.el.setAttribute('id', 'splash')
    this.el.innerHTML = splashHTML

    const style = document.createElement('style')
    style.textContent = splashCSS

    this.el.prepend(style)

    this.back()

    this.el.querySelector('#back').onclick = this.back.bind(this)

    this.el.querySelector('#newGame').onclick = this.newGame.bind(this)
    this.el.querySelector('#loadGame').onclick = this.loadGameMenu.bind(this)
    this.el.querySelector('#openSettings').onclick = this.settingsMenu.bind(this)
    this.el.querySelector('#saveSettings').onclick = this.saveSettings.bind(this)
    this.el.querySelector('#quit').onclick = () => history.go(-1)
  }

  settingsMenu() {
    this.showBack()

    this.el.querySelector('#home').className = 'page'
    this.el.querySelector('#settings').className = 'fadein page'
    this.el.querySelector('#quality').value = window.localStorage.getItem('quality') || window.devicePixelRatio || 1
  }

  saveSettings() {
    this.back()
    window.localStorage.setItem('quality', this.el.querySelector('#quality').value)
  }

  // --------------------------------------------
  // LOAD GAME MENU
  // --------------------------------------------

  loadGameMenu() {
    this.showBack()
    this.el.querySelector('#home').className = 'page'
    this.el.querySelector('#load').className = 'fadein page'

    const games = this.el.querySelector('#games')


    if (!games.firstChild) {
      const cosmosList = JSON.parse(window.localStorage.getItem('cosmosList')) || [{ description: 'No saves Yet! Go generate one!', id: 'X' }]
      cosmosList.forEach(game => {
        const button = document.createElement('custom-button')
        button.setAttribute('class', game.id)
        button.innerText = game.description
        button.onclick = this.loadGame.bind(this)
        games.append(button)
      })
    }
  }

  loadGame(e) {
    if (e.srcElement.className !== 'X') this.onLoadGame(Number(e.srcElement.className))
    else {
      this.el.querySelector('#load').className = 'page'
      this.newGame()
    }
  }

  // --------------------------------------------
  // NEW GAME MENU
  // --------------------------------------------
  newGame() {
    this.showBack()

    this.el.querySelector('#home').className = 'page'
    this.el.querySelector('#new').className = 'fadein page'
    this.el.querySelector('#createGame').onclick = this.createGame.bind(this)
  }

  createGame() {
    if (this.el.querySelector('#gameName').value !== '') if (this.onGameCreated) this.onGameCreated(this.el.querySelector('#gameName').value)
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
    if (key.key === 'Escape' || key.key === 'ArrowLeft') this.back()
  }
}
