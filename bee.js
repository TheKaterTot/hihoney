import { Container, Sprite } from "pixi.js"
import StatusBar from "./statusBar"

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
    this.statusBar = new StatusBar(0, this.image.height / 2, 0xf7ad31, 100, 10)
    this.statusBar.visible = false
    this.addChild(this.statusBar)
    this.percent = 0
  }

  toggleStatusBar() {
    if(this.landed == true) {
      this.statusBar.visible = true
    } else {
      this.statusBar.visible = false
      this.percent = 0
      this.statusBar.clear()
    }
  }

  gatherPollen() {
    if (this.landed && this.percent < 1) {
      this.statusBar.updateWidth(this.percent)
      this.percent += 0.005
    } else if (this.percent >= 1 && this.landed) {
      this.emit('gather')
      this.landed = false
      this.toggleStatusBar()
    }
  }

  update() {
    this.gatherPollen()
  }
}
