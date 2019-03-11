import { Container, Sprite } from "pixi.js"
import TWEEN from "@tweenjs/tween.js"
import {Tween} from "@tweenjs/tween.js"
import Ladybug from "./ladybug"

const daisyTopURL = require('./images/daisy-head.png')
const daisyBottomURL = require('./images/daisy-bottom.png')

export default class Flower extends Container {
  constructor(x, y) {
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
    this.ladybug = new Ladybug(0, 0)
    this.ladybug.visible = false
    this.addChild(this.ladybug)
  }

  animateLanding() {
    new Tween(this.topImage.position)
    .to({y: 2}, 50)
    .easing(TWEEN.Easing.Exponential.InOut)
    .start()
  }

  animateLeaving() {
    new Tween(this.topImage.position)
    .to({y: 0}, 50)
    .easing(TWEEN.Easing.Exponential.InOut)
    .start()
  }

  infect() {
    this.ladybug.y = this.bottomImage.height + this.topImage.height
    new Tween(this.ladybug.position)
    .to({y: 0}, 5000)
    .chain(new Tween(this.ladybug.position)
      .to({y: this.bottomImage.height + this.topImage.height}, 5000)
      .onStart( () => {
        this.ladybug.scale.y = -1
      })
      .onComplete( () => {
        this.ladybug.scale.y = 1
        this.emit('infectionComplete')
      })
      .delay(2000)
    )
    .start()
    this.ladybug.visible = true
  }
}
