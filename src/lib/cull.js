import Simple from 'pixi-cull/code/simple'

export default class Cull extends Simple {
  constructor(viewport) {
    super()

    this.addList(viewport.children)
    this.cull(viewport.getVisibleBounds())
  }
}
