import { Container, Sprite } from 'pixi.js'

const hiveURL = require('./images/hive.png')

export default class Hive extends Container {
  constructor (x, y) {
    super()
    this.y = y
    this.image = Sprite.fromImage(hiveURL)
    this.addChild(this.image)
    this.x = x
    this.interactive = true
    this.buttonMode = true
  }
}
