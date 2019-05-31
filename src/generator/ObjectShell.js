export default class ObjectShell {
  constructor(path) {
    this.path = path
  }

  genResources() {
    // eslint-disable-next-line func-names, prefer-arrow-callback
    Object.keys(this.type.default.resources).forEach(function (item) {
      const object = this.type.default.resources[item]

      this.resources[item] = Math.random() * (object[1] - object[0]) + object[0]
    }.bind(this))
  }
}
