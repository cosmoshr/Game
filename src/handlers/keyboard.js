class Key {
  isDown = false
  isUp = true
  press
  release

  constructor(value) {
    this.value = value
  }

  downHandler(event) {
    if (event.key === this.value) {
      if (this.isUp && this.press) this.press()
      this.isDown = true
      this.isUp = false
      event.preventDefault()
    }
  }

  upHandler(event) {
    if (event.key === this.value) {
      if (this.isDown && this.release) this.release()
      this.isDown = false
      this.isUp = true
      event.preventDefault()
    }
  }

  unsubscribe() {
    window.removeEventListener('keydown', this.downListener)
    window.removeEventListener('keyup', this.upListener)
  }
}

export default function keyboard(value) {
  const key = new Key(value)

  window.addEventListener('keydown', key.downListener, false)
  window.addEventListener('keyup', key.upListener, false)

  return key
}
