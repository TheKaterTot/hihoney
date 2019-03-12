import { Container, Sprite } from 'pixi.js'
const titleURL = require('./images/hi-honey.png')

export default class startScreen extends Container {
  constructor (width, height) {
    super()
    this.image = Sprite.fromImage(titleURL)
    this.image.width = width
    this.image.height = height
    this.addChild(this.image)
    this.image.interactive = true
    this.image.on('pointerup', () => {
      this.emit('start')
    })
  }
}
