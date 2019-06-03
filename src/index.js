import './sass/styles.scss'

import Game from './game'
import LoadingScreen from './screens/loader/loader'
import Splash from './screens/splash/splash'
import initComponents from './components'

initComponents()

let splash,
  loadingScreen
const game = new Game()

loadingScreen = new LoadingScreen('Loading game')
document.body.appendChild(loadingScreen.dom)

game.gameLoop = () => {}

const afterInit = () => {
  loadingScreen.kill()

  splash = new Splash()
  splash.games = game.cosmos
  document.body.appendChild(splash.dom)

  splash.onGameCreated = name => {
    splash.kill()

    loadingScreen = new LoadingScreen('Generating world')
    document.body.appendChild(loadingScreen.dom)

    game.generateCosmos(name)
      .then(() => {
        game.loadComos(Object.keys(game.cosmos).length - 1)
        loadingScreen.kill()
      })
  }

  splash.onLoadGame = id => {
    splash.kill()

    loadingScreen = new LoadingScreen('Loading world')
    document.body.appendChild(loadingScreen.dom)

    setTimeout(() => {
      if (id - 1 < game.cosmos.length) game.loadComos(id - 1).then(() => loadingScreen.kill())
      else {
        // eslint-disable-next-line no-alert
        alert('Failed to load the world')
        loadingScreen.kill()
        throw new Error('Failed to load the world')
      }
    }, 100)
  }


  // const loadtype = confirm('Load or Generate')
  // if (loadtype) {
  //   const world = Number(prompt(`Choose a world between 1-${Object.keys(game.cosmos).length}`))
  //   if (world < Object.keys(game.cosmos).length) game.loadComos(world - 1)
  //   else console.log('Err please reload')
  // } else game.generateCosmos('A Galaxy Far Far Away').then(() => { game.loadComos(Object.keys(game.cosmos).length - 1) })
}

game.init().then(() => { afterInit() })
