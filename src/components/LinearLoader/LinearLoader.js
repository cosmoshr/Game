import { html, MutationComponent } from 'stera'

const loaderStyle = require('./style.css')

export default class LinearLoader extends MutationComponent {
  render() {
    let loaderValue = ''

    if (this.hasAttribute('value')) loaderValue = `value="${this.getAttribute('value')}"`

    return html`
      <div>
        <progress max="100" class="pure-material-progress-linear" ${loaderValue}></progress>

        <style>${loaderStyle}</style>
      </div>
    `
  }
}
