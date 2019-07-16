/* eslint-disable no-use-before-define */
import './sass/styles.scss'
import Game from './game'
import LoadingOverlay from './overlays/loading'
import Splash from './overlays/splash'
import Overlay from './overlays/overlay'
import initComponents from './components'
import newError from './overlays/error'

const game = new Game()

initComponents()

const loadingOverlay = new LoadingOverlay()

document.addEventListener('keydown', key => {
  window.currentTarget.pressed(key)
})

game.gameLoop = () => {}
const gameInProgress = async () => {
  game.soundManager.trigger('Whenever', false, true)

  const overlay = new Overlay()
  window.currentTarget = overlay

  overlay.open = () => game.soundManager.trigger('Main Menu', true)
  overlay.close = () => game.soundManager.endTemp()

  overlay.quitGame = () => {
    game.reset()
    window.game.style.display = 'none'
    mainMenu()
  }

  window.game.style.display = 'block'
  loadingOverlay.hide()
}

const mainMenu = async () => {
  game.soundManager.trigger('Main Menu')
  const splash = new Splash()
  window.currentTarget = splash

  splash.games = game.cosmosList
  document.body.appendChild(splash.el)

  splash.onGameCreated = async name => {
    game.soundManager.trigger('Game Starts')
    splash.kill()

    loadingOverlay.message = 'Loading World'
    const id = await game.generateCosmos(name)
    game.launchGame(id)
    gameInProgress()
  }
  splash.onLoadGame = async id => {
    game.soundManager.trigger('Game Starts')
    splash.kill()
    loadingOverlay.message = 'Loading World'

    if (localStorage.getItem('cosmosList').length > id - 1) {
      await game.launchGame(id)
      gameInProgress()
    } else {
      loadingOverlay.hide()
      newError(new Error('Failed to load the world'))
    }
  }
}

(async () => {
  await game.init()
  loadingOverlay.hide()

  mainMenu()
})()
