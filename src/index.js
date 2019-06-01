import './sass/styles.scss'
import Game from './game'

const game = new Game()

game.gameLoop = () => {}

const afterInit = () => {
  const loadtype = confirm('Load or Generate')
  if (loadtype) {
    const world = Number(prompt(`Choose a world between 1-${Object.keys(game.cosmos).length}`))
    if (world < Object.keys(game.cosmos).length) game.loadComos(world - 1)
    else console.log('Err please reload')
  } else game.generateCosmos('A Galaxy Far Far Away').then(() => { game.loadComos(Object.keys(game.cosmos).length - 1) })
}

game.init().then(() => { afterInit() })
