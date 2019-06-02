import './sass/styles.scss'
import Game from './game'
import { LinearLoader, LoadingScreen } from './screens/loader/loader'

customElements.define('linear-loader', LinearLoader)

let loadingScreen = new LoadingScreen()
const game = new Game()

document.body.appendChild(loadingScreen.dom())

game.gameLoop = () => {}

const afterInit = () => {
  loadingScreen.kill()


  const loadtype = confirm('Load or Generate')
  if (loadtype) {
    const world = Number(prompt(`Choose a world between 1-${Object.keys(game.cosmos).length}`))
    if (world < Object.keys(game.cosmos).length) game.loadComos(world - 1)
    else console.log('Err please reload')
  } else game.generateCosmos('A Galaxy Far Far Away').then(() => { game.loadComos(Object.keys(game.cosmos).length - 1) })
}

game.init().then(() => { afterInit() })
