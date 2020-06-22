import { Component, html } from 'stera'

const localCSS = require('./style.css')

export default class ActionButton extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <div class="button-container">
        <button><slot></slot></button>

        <style>
          ${localCSS}
        </style>
      </div>
    `
  }
}
