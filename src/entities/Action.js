export default class DefaultAction {
  done = false

  constructor(type) {
    this.type = type
  }

  pushOptions(options) {
    Object.assign(this, options)

    return this
  }
}

export class Action extends DefaultAction {}
