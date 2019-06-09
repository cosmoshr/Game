import './sass/styles.scss'
import Game from './game'
import Players, { Player } from './data/players'

Players.push(new Player('Nobody', true))

const game = new Game()

game.gameLoop = () => {}

const afterInit = () => {
  game.loadComos(1)
}

game.init().then(() => { afterInit() })
