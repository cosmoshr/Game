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
      if (id - 1 < JSON.parse(localStorage.getItem('cosmosList')).length) game.launchGame(id).then(() => loadingScreen.kill())
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
