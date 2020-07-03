import insertCSS from 'insert-css'

import globalCSS from './index.css'
import Game from './game'
import initComponents from './components'

import './math'

insertCSS(globalCSS)

initComponents()

// eslint-disable-next-line no-unused-vars
const game = new Game()
