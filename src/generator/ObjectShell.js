export default class ObjectShell {
  constructor(path) {
    this.path = path
  }

  genResources() {
    for (let index = 0; index < this.type.resources.length; index++) {
      const object = this.type.resources[index]

      this.resources.push(Math.random() * (object[1] - object[0]) + object[0])
    }
  }
}
