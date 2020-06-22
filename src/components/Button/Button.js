import { Component, html } from 'stera'

const sharedCSS = require('../shared.css')
const localCSS = require('./style.css')

export default class Button extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <div>
        <button><slot></slot></button>
        
        <style>${sharedCSS}${localCSS}</style>
      </div>
    `
  }
}
