import './sass/styles.scss'
import Game from './game'
import LoadingScreen from './screens/loader'
import Splash from './screens/splash'
import initComponents from './components'

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
      if (id - 1 < localStorage.getItem('cosmosList').length) game.launchGame(id).then(() => loadingScreen.kill())
      else {
        // eslint-disable-next-line no-alert
        alert('Failed to load the world')
        loadingScreen.kill()
        throw new Error('Failed to load the world')
      }
    }, 100)
  }
}

game.init().then(() => { afterInit() })
