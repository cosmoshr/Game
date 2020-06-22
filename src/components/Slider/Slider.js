import { Component, html } from 'stera'

const style = require('./style.css')

export default class Slider extends Component {
  constructor() {
    super({
      value: 1
    })
  }

  get value() {
    return this.state.value
  }

  set value(value) {
    this.setState({
      value
    })
  }

  render() {
    return html`
      <form>
        <input type="range" value="${this.state.value}" min="1" max="10" step="0.1">

        <style>${style}</style>
      </form>
    `
  }
}
