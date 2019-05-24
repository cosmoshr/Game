// TODO: Pinch to zoom

import { Point } from 'pixi.js'

export function onDragStart(event) {
  if (!this.dragging) this.oldPos = new Point(event.data.global.x, event.data.global.y)
  this.dragging = true
}

export function onDragEnd() {
  this.dragging = false
  this.oldPos = null
}

export function onDragMove(event) {
  if (this.dragging && this.oldPos) {
    this.x += event.data.global.x - this.oldPos.x
    this.y += event.data.global.y - this.oldPos.y

    if (!this.oldPos.equals(event.data.global))
      this.oldPos = new Point(event.data.global.x, event.data.global.y)
  }
}
