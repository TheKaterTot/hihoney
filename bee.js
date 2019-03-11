import { Container, Sprite } from "pixi.js"
import StatusBar from "./statusBar"

const beeURL = require('./images/bumblebee.png')

export default class Bee extends Container {
  constructor(x, y) {
    super()
    this.initial = {x, y}
    this.y = y
    this.interactive = true
    this.image = Sprite.fromImage(beeURL)
    this.addChild(this.image)
    this.x = x - this.width
    this.gathering = false
    this.statusBar = new StatusBar(0, this.image.height / 2, 0xf7ad31, 100, 10)
    this.statusBar.visible = false
    this.addChild(this.statusBar)
    this.percent = 0
  }

  startGather() {
    this.gathering = true
    this.statusBar.visible = true
  }

  stopGather() {
    this.gathering = false
    this.statusBar.visible = false
    this.percent = 0
    this.statusBar.clear()
  }

  gatherPollen() {
    if (this.gathering && this.percent < 1) {
      this.statusBar.updateWidth(this.percent)
      this.percent += 0.005
    } else if (this.percent >= 1 && this.gathering) {
      this.emit('gather')
      this.stopGather()
    }
  }

  reset() {
    this.x = this.initial.x - this.width
    this.y = this.initial.y
  }

  update() {
    this.gatherPollen()
  }
}
