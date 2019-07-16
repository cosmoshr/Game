import pixiViewport from 'pixi-viewport'

export default class Viewport extends pixiViewport {
  constructor(renderer) {
    super({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      interaction: renderer.plugins.interaction
    })

    this.drag()
    this.pinch()
    this.wheel()
  }
}
