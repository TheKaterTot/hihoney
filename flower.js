import { Container, Sprite } from 'pixi.js'
import TWEEN from '@tweenjs/tween.js'
import Ladybug from './ladybug'
const { Tween } = TWEEN

const daisyTopURL = require('./images/daisy-head.png')
const daisyBottomURL = require('./images/daisy-bottom.png')

export default class Flower extends Container {
  constructor (x, y) {
    super()
    this.x = x
    this.interactive = true
    this.interactiveChildren = true
    this.topImage = Sprite.fromImage(daisyTopURL)
    this.bottomImage = Sprite.fromImage(daisyBottomURL)
    this.bottomImage.y = this.topImage.height
    this.addChild(this.topImage)
    this.addChild(this.bottomImage)
    this.y = y - this.height
    this.buttonMode = true
    this.ladybug = new Ladybug(0, this.topImage.height + this.bottomImage.height)
    this.ladybug.visible = false
    this.addChild(this.ladybug)
  }

  animateLanding () {
    new Tween(this.topImage.position)
      .to({ y: 2 }, 50)
      .easing(TWEEN.Easing.Exponential.InOut)
      .start()
  }

  animateLeaving () {
    new Tween(this.topImage.position)
      .to({ y: 0 }, 50)
      .easing(TWEEN.Easing.Exponential.InOut)
      .start()
  }

  infect () {
    this.ladybug.y = this.bottomImage.height + this.topImage.height
    new Tween(this.ladybug.position)
      .to({ y: 0 }, 5000)
      .chain(new Tween(this.ladybug.position)
        .to({ y: this.bottomImage.height + this.topImage.height }, 5000)
        .onStart(() => {
          this.ladybug.scale.y = -1
        })
        .onComplete(() => {
          this.ladybug.scale.y = 1
          this.emit('infectionComplete')
        })
        .delay(2000)
      )
      .start()
    this.ladybug.visible = true
  }

  isInfected () {
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy
    hit = false
    let daisy = this.topImage.getBounds()
    let ladybug = this.ladybug.getBounds()
    // center points for each sprite
    daisy.centerX = daisy.x + daisy.width / 2
    daisy.centerY = daisy.y + daisy.height / 2

    ladybug.centerX = ladybug.x + ladybug.width / 2
    ladybug.centerY = ladybug.y + ladybug.height / 2

    // half widths and heights of each sprite
    daisy.halfWidth = daisy.width / 2
    daisy.halfHeight = daisy.height / 2
    ladybug.halfWidth = ladybug.width / 2
    ladybug.halfHeight = ladybug.height / 2
    // calculate distance vector
    vx = daisy.centerX - ladybug.centerX
    vy = daisy.centerY - ladybug.centerY

    combinedHalfWidths = daisy.halfWidth + ladybug.halfWidth
    combinedHalfHeights = daisy.halfHeight + ladybug.halfHeight

    if (Math.abs(vx) < combinedHalfWidths) {
      // A collision might be occuring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
        // There's definitely a collision happening
        hit = true
        this.emit('infected')
      } else {
        // There's no collision on the y axis
        hit = false
      }
    } else {
      // There's no collision on the x axis
      hit = false
    }
    // `hit` will be either `true` or `false`
    return hit
  }

  update () {
    this.isInfected()
  }
}
