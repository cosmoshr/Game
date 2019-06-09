import './sass/styles.scss'
import Game from './game'
import LoadingScreen from './screens/loader'
import Splash from './screens/splash'
import initComponents from './components'
import newError from './screens/error'

initComponents()

const game = new Game()

let splash
let loadingScreen = new LoadingScreen('Loading game')

game.gameLoop = () => {}

const afterInit = () => {
  loadingScreen.kill()

  splash = new Splash()
  splash.games = game.cosmosList
  document.body.appendChild(splash.el)

  splash.onGameCreated = name => {
    splash.kill()

    loadingScreen = new LoadingScreen('Generating world')

    game.generateCosmos(name)
      .then(id => {
        game.launchGame(id)
        loadingScreen.kill()
      })
  }

  splash.onLoadGame = id => {
    splash.kill()

    loadingScreen = new LoadingScreen('Loading world')

    setTimeout(() => {
      if (localStorage.getItem('cosmosList').length > id - 1) game.launchGame(id).then(() => loadingScreen.kill())
      else {
        loadingScreen.kill()
        newError(new Error('Failed to load the world'))
      }
    }, 100)
  }
}

game.init().then(() => { afterInit() })
