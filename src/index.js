import './sass/styles.scss'
import { onDragStart, onDragEnd, onDragMove } from './handlers/movement'
import Game from './game'

const game = new Game()

game.gameLoop = () => {}

game.stage.interactive = true
game.stage.mousedown = onDragStart
game.stage.touchstart = onDragStart

game.stage.mouseup = onDragEnd
game.stage.mouseupoutside = onDragEnd
game.stage.touchend = onDragEnd
game.stage.touchendoutside = onDragEnd

game.stage.touchmove = onDragMove
game.stage.mousemove = onDragMove

const afterInit = () => {
  const loadtype = confirm('Load or Generate')
  if (loadtype) {
    const world = Number(prompt(`Choose a world between 1-${Object.keys(game.cosmos).length}`))
    if (world < Object.keys(game.cosmos).length)
      game.loadComos(world - 1)
    else
      console.log('Err please reload')
  } else
    game.generateCosmos('A Galaxy Far Far Away').then(() => { game.loadComos(Object.keys(game.cosmos).length - 1) })
}

game.init().then(() => { afterInit() })
