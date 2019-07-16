import Sound from 'pixi-sound'
import Soundtrack from '../public/assets/soundtrack'

export default class SoundManager {
    currentTrigger = 'Loading'

    constructor() {
      Sound.add('Loading', 'assets/soundtrack/The Mysterious Veil.mp3')
      Sound.play('Loading', () => {
        this.songFinished()
      })
    }

    songFinished() {
      if (this.currentTrigger === 'Loading') Sound.play('Loading', () => {
        this.songFinished()
      })

      else this.playSong(this.currentTrigger)
    }

    /**
     * @param {String} trigger Trigger Name
     * @param {boolean} [noChange=false] Set to true if it sould revert to current Trigger after playing
     * @param {boolean} [noKill=false] Set to true if it should play once the current song is finished
     * @memberof SoundManager
     */
    trigger(trigger, noChange = false, noKill = false) {
      if (trigger !== this.currentTrigger) {
        if (!noChange) this.currentTrigger = trigger
        if (!noKill) {
          Sound.stopAll()
          this.playSong(trigger)
        }
      }
    }

    /**
     * Call if a tempory song should end and revert to what it was.
     *
     * @memberof SoundManager
     */
    endTemp() {
      Sound.stopAll()
      this.playSong(this.currentTrigger)
    }

    playSong(trigger) {
      const songList = []
      Soundtrack.forEach(song => {
        song.trigger.forEach(triggerName => {
          if (trigger === triggerName) songList.push(song)
        })
      })
      const rand = songList[Math.floor((Math.random() * songList.length))]
      Sound.play(`Song_${rand.name}`, () => {
        this.songFinished()
      })
    }
}
