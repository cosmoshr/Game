import './sass/styles.scss'
import Game from './game'

const game = new Game()

game.gameLoop = () => {}

const afterInit = () => {
  game.loadComos(1)
}

game.init().then(() => { afterInit() })
