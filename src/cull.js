import Simple from 'pixi-cull/code/simple'

export default class Cull extends Simple {
  constructor(viewport) {
    super()
    this.viewport = viewport

    this.addList(this.viewport.children)
    this.cull(this.viewport.getVisibleBounds())
  }
}
