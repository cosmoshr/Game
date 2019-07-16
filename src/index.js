/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-spaced-func */
/* eslint-disable func-call-spacing */
/* eslint-disable no-use-before-define */
import './sass/styles.scss'
import LoadingOverlay from './overlays/loading'
import initComponents from './components'
import newError from './overlays/error'

initComponents()

let loadingOverlay = new LoadingOverlay()

document.addEventListener('keydown', key => {
  window.currentTarget.pressed(key)
})

let Game,
  Splash,
  Overlay,
  game

function gameloop() {}

async function gameInProgress() {
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

async function mainMenu() {
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
  Game = await import(/* webpackChunkName: "game" */ './game')
  Game = Game.default
  game = new Game()
  game.gameLoop = gameloop
  await game.init()

  Splash = await import(/* webpackChunkName: "splash" */ './overlays/splash')
  Splash = Splash.default

  Overlay = await import(/* webpackChunkName: "inGameOverlay" */ './overlays/overlay')
  Overlay = Overlay.default

  loadingOverlay.hide()
  mainMenu()

  if (module.hot) module.hot.accept('./game.js', () => {
    // eslint-disable-next-line no-console
    console.log('Reloading game core')
    loadingOverlay = new LoadingOverlay()

    (async () => {
      Game = await import(/* webpackChunkName: "game" */ './game')
      Game = Game.default
      game = new Game()
      game.gameLoop = gameloop
      await game.init()

      loadingOverlay.hide()
      mainMenu()
    })()
  })
})()
