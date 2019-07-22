export default class Overlay {
  constructor(html, css, id, appendEl) {
    this.el = document.createElement('div')
    this.el.setAttribute('id', id)
    this.el.innerHTML = html
    const style = document.createElement('style')
    style.textContent = css

    this.el.prepend(style)

    appendEl.appendChild(this.el)
  }
}
