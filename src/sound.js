import Sound from 'pixi-sound'
import { Loader as PixiLoader } from 'pixi.js'
import Soundtrack from '../public/assets/soundtrack'

export default class SoundManager {
    currentTrigger = 'Loading'

    constructor() {
      Sound.add('Loading', 'assets/soundtrack/The Mysterious Veil.mp3')
      Sound.play('Loading', () => {
        this.songFinished()
      })
      this.hasFullyLoaded = false
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
      const songsValid = []
      let songList = []

      // Find all songs that have a trigger that is the same as the requested trigger.
      Soundtrack.forEach(song => {
        song.trigger.forEach(triggerName => {
          if (trigger === triggerName) songList.push(song)
        })
      })

      // Check weather all songs have been loaded.
      if (!this.hasFullyLoaded) {
        const { resources } = PixiLoader.shared
        Object.keys(resources).forEach(resource => { if (resource.match(/Song_[\w ]+/)) songsValid.push(resource.replace('Song_', '')) })
        if (songsValid.length === Soundtrack.length) this.hasFullyLoaded = true
      }

      // If some songs havn't been loaded remove them from the possible songs list.
      if (!this.hasFullyLoaded) songList = songList.filter(song => songsValid.some(song2 => song2 === song.name))

      // If there are no songs try playing the loading song.
      if (songList.length === 0) {
        Sound.play('Loading', () => {
          this.songFinished()
        })
        return
      }
      const rand = songList[Math.floor((Math.random() * songList.length))]
      Sound.play(`Song_${rand.name}`, () => {
        this.songFinished()
      })
    }
}
