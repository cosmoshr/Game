import { Application, Loader } from 'pixi.js'

import App from './app'

import './sass/styles.scss'

import textures from './loaders/textures'

import './functions'

let game

const app = new Application({ width: innerWidth, height: innerHeight })
app.renderer.autoResize = true
app.view.id = 'app'
document.body.appendChild(app.view)

function loader() {
  game = new App(app)
  app.ticker.add(game.update)
}

Loader.shared.add(textures).load(loader)

window.addEventListener('resize', () => {
  app.renderer.resize(innerWidth, innerHeight)
})

