import Settings from '../../Settings'

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

    const backs = this.el.getElementsByClassName('back')
    const backsleng = backs.length

    for (let i = 0; i < backsleng; i++) backs[i].onclick = this.back.bind(this)

    this.el.getElementsByClassName('newGame')[0].onclick = this.newGame.bind(this)
    this.el.getElementsByClassName('loadGame')[0].onclick = this.loadGameMenu.bind(this)
    this.el.getElementsByClassName('openSettings')[0].onclick = this.settingsMenu.bind(this)

    this.el.getElementsByClassName('saveSettings')[0].onclick = this.saveSettings.bind(this)
  }

  // --------------------------------------------
  // SETTINGS
  // --------------------------------------------

  settingsMenu() {
    this.el.getElementsByClassName('home')[0].style.display = 'none'
    this.el.getElementsByClassName('settings')[0].style.display = 'block'

    this.el.getElementsByClassName('quality')[0].max = 10
    this.el.getElementsByClassName('quality')[0].value = Settings.quality
  }

  saveSettings() {
    Settings.quality = Number(this.el.getElementsByClassName('quality')[0].value)
    Settings.save()
    this.back()
  }

  // --------------------------------------------
  // LOAD GAME MENU
  // --------------------------------------------

  loadGameMenu() {
    this.el.getElementsByClassName('home')[0].style.display = 'none'
    this.el.getElementsByClassName('load')[0].style.display = 'block'

    const games = this.el.getElementsByClassName('games')[0]

    this.games.forEach(game => {
      const button = document.createElement('custom-button')
      button.setAttribute('class', game.id)
      button.innerText = game.description
      button.onclick = this.loadGame.bind(this)
      games.append(button)
    })
  }

  loadGame(e) {
    this.onLoadGame(Number(e.srcElement.className))
  }

  // --------------------------------------------
  // NEW GAME MENU
  // --------------------------------------------
  newGame() {
    this.el.getElementsByClassName('home')[0].style.display = 'none'
    this.el.getElementsByClassName('new')[0].style.display = 'block'

    this.el.getElementsByClassName('createGame')[0].onclick = this.createGame.bind(this)
  }

  createGame() {
    if (this.el.getElementsByClassName('gameName')[0].value !== '') if (this.onGameCreated) this.onGameCreated(this.el.getElementsByClassName('gameName')[0].value)
  }

  back() {
    const els = this.el.getElementsByClassName('page')

    for (let i = 0; i < els.length; i++) els[i].style.display = 'none'

    this.el.getElementsByClassName('home')[0].style.display = 'block'
  }

  get dom() {
    document.getElementById('app').style.display = 'none'
    return this.el
  }

  kill() {
    document.getElementById('app').style.display = 'block'
    this.el.remove()
    delete this
  }
}
