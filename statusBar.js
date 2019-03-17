import { Container, Graphics } from 'pixi.js'
export default class statusBar extends Container {
  constructor (x, y, color, maxWidth, height) {
    super()
    this.x = x
    this.y = y
    this.color = color
    this.maxWidth = maxWidth
    this.barHeight = height
    this.graphics = new Graphics()
    this.drawGraphic()
    this.addChild(this.graphics)
  }

  drawGraphic () {
    this.graphics.lineStyle(2, this.color)
    this.graphics.beginFill(this.color, 0.30)
    this.graphics.drawRoundedRect(this.x, this.y, this.maxWidth, this.barHeight, 10)
    this.graphics.endFill()
  }

  updateWidth (percent) {
    this.graphics.lineStyle(2, this.color)
    this.graphics.beginFill(this.color, 1)
    this.graphics.drawRoundedRect(this.x, this.y, this.maxWidth * percent, this.barHeight, 10)
    this.graphics.endFill()
  }

  clear () {
    this.graphics.clear()
    this.drawGraphic()
  }
}
