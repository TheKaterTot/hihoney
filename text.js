import { Container, Sprite } from 'pixi.js'

export default class ScreenText extends Container {
  constructor (x, y, imageURL) {
    super()
    this.y = y
    this.image = Sprite.fromImage(imageURL)
    this.addChild(this.image)
    this.x = x - this.image.width
  }
}
