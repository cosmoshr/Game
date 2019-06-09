/* eslint-disable no-use-before-define */
import './sass/styles.scss'
import Game from './game'
import LoadingOverlay from './overlays/loading'
import Splash from './overlays/splash'
import Overlay from './overlays/overlay'
import initComponents from './components'
import newError from './screens/error'

const game = new Game()

initComponents()

const loadingOverlay = new LoadingOverlay()

document.addEventListener('keydown', key => {
  window.currentTarget.pressed(key)
})

game.gameLoop = () => {}

const gameInProgress = async () => {
  const overlay = new Overlay()
  window.currentTarget = overlay

  overlay.quitGame = () => {
    game.reset()
    window.game.style.display = 'none'
    mainMenu()
  }

  window.game.style.display = 'block'
  loadingOverlay.hide()
}

const mainMenu = async () => {
  const splash = new Splash()
  window.currentTarget = splash

  splash.games = game.cosmosList
  document.body.appendChild(splash.el)

  splash.onGameCreated = async name => {
    splash.kill()

    loadingOverlay.message = 'Loading World'
    const id = await game.generateCosmos(name)
    game.launchGame(id)
    gameInProgress()
  }
  splash.onLoadGame = async id => {
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
