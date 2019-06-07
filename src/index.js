import './sass/styles.scss'
import Game from './game'

const game = new Game()

game.gameLoop = () => {}

const afterInit = () => {
  game.loadComos(14)
}

game.init().then(() => { afterInit() })
