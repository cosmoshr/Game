export default class Enum {
  constructor(keys) {
    this.keys = keys

    keys.forEach((key, i) => {
      this[key] = i
    })
  }
}
