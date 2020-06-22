import initComponents from './components'
import style from './styles/styles.css'
import { headStyle } from './lib'
import Game from './game'
import './math'

headStyle(style)

initComponents()

// eslint-disable-next-line no-unused-vars
const game = new Game()
