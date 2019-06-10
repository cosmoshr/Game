import './sass/styles.scss'
import Game from './game'
import Players, { Player } from './data/players'

Players.push(new Player('Nobody', false))

const game = new Game()

game.gameLoop = () => {}

const afterInit = () => {
  // game.generateCosmos('testing')
  game.loadComos(1)
}

game.init().then(() => { afterInit() })
