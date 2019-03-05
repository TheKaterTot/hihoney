import { Container, Sprite } from "pixi.js"

const beeURL = require('./images/bumblebee.png')

export default class Bee extends Container {
  constructor(x, y) {
    super()
    this.y = y
    this.interactive = true
    this.image = Sprite.fromImage(beeURL)
    this.addChild(this.image)
    this.x = x - this.width
  }
}
