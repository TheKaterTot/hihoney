import { Container, Sprite } from 'pixi.js'

const queenURL = require('./images/queen-bee.png')

export default class Queen extends Container {
  constructor (x, y) {
    super()
    this.y = y
    this.image = Sprite.fromImage(queenURL)
    this.addChild(this.image)
    this.x = x
  }
}
