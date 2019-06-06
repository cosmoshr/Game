class Settings {
  quality = 1

  constructor(object) {
    if (object.quality) this.quality = object.quality
  }

  set(setting, value) {
    if (setting && value) this[setting] = value
  }

  save() {
    window.localStorage.setItem('settings', JSON.stringify({
      quality: this.quality
    }))
  }
}

export default new Settings(JSON.parse(window.localStorage.getItem('settings') || '{}'))
