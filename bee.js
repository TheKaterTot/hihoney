import { Container, Sprite } from "pixi.js"
const graphics = new PIXI.Graphics()

const beeURL = require('./images/bumblebee.png')

export default class Bee extends Container {
  constructor(x, y) {
    super()
    this.y = y
    this.interactive = true
    this.image = Sprite.fromImage(beeURL)
    this.addChild(this.image)
    this.x = x - this.width
    this.landed = false
  }

  showStatusBar() {
    if(this.landed == true) {
      this.drawGraphic(0, this.image.height)
      this.addChild(graphics)
    } else {
      this.removeChild(graphics)
    }
  }
  drawGraphic(x, y) {
    graphics.lineStyle(2, 0xffe446)
    graphics.beginFill(0xffffff, 0.50)
    graphics.drawRoundedRect(x, y, 100, 10, 10)
    graphics.endFill()
  }
}
