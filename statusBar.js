import { Container } from "pixi.js"
const graphics = new PIXI.Graphics()

export default class statusBar extends Container {
  constructor() {
    super()
    this.x = 10
    this.y = 10
    this.maxWidth = 400
    this.height = 20
    this.drawGraphic()
    this.addChild(graphics)
  }

  drawGraphic() {
    graphics.lineStyle(2, 0xffe446)
    graphics.beginFill(0xffe446, 0.30)
    graphics.drawRoundedRect(10, 10, 400, 20, 10)
    graphics.endFill()
  }
}
