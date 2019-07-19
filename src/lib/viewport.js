import pixiViewport from 'pixi-viewport'

export default class Viewport extends pixiViewport {
  constructor(renderer) {
    super({
      screenWidth: renderer.screenWidth,
      screenHeight: renderer.screenHeight,
      interaction: renderer.plugins.interaction
    })

    this.drag()
    this.pinch()
    this.wheel()
    this.decelerate()
  }
}
