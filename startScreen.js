import { Container, Sprite } from 'pixi.js'
import TWEEN from "@tweenjs/tween.js"
import {Tween} from "@tweenjs/tween.js"
const titleURL = require('./images/title.png')
const daisyBunchURL = require('./images/daisy-bunch.png')
const clickStartURL = require('./images/click-start.png')
const titleBeeURL = require('./images/title-bee.png')

export default class startScreen extends Container {
  constructor (width, height) {
    super()
    this.imageTitle = Sprite.fromImage(titleURL)
    this.imageDaisyBunch = Sprite.fromImage(daisyBunchURL)
    this.imageClickStart = Sprite.fromImage(clickStartURL)
    this.beeOne = Sprite.fromImage(titleBeeURL)
    this.beeTwo = Sprite.fromImage(titleBeeURL)
    this.beeThree = Sprite.fromImage(titleBeeURL)
    this.beeTwo.scale.x = -1
    this.beeThree.scale.x = -1

    this.imageDaisyBunch.x = width /4
    this.imageDaisyBunch.y = height - this.imageDaisyBunch.height
    this.imageTitle.x = this.imageTitle.width / 10
    this.imageTitle.y = height / 3 - this.imageTitle.height/2
    this.imageClickStart.x = width - this.imageClickStart.width
    this.imageClickStart.y = height /2
    this.beeOne.x = this.imageTitle.x + this.imageTitle.width / 2
    this.beeOne.y = this.imageTitle.y + this.imageTitle.height/2
    this.beeTwo.x = this.imageTitle.x
    this.beeTwo.y = this.imageTitle.y
    this.beeThree.x = this.imageDaisyBunch.x + 50
    this.beeThree.y = this.imageDaisyBunch.y


    this.addChild(this.imageTitle)
    this.addChild(this.imageDaisyBunch)
    this.addChild(this.imageClickStart)
    this.addChild(this.beeOne)
    this.addChild(this.beeTwo)
    this.addChild(this.beeThree)

    this.interactive = true
    // this.interactiveChildren = true
    this.on('pointerup', () => {
      this.emit('start')
    })

    new Tween(this.beeOne.position)
    .to({x: this.beeOne.x + 30, y: this.beeOne.y + 30}, 6000)
    .repeat(Infinity)
    .delay(1500)
    .yoyo(true)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start()

    new Tween(this.beeTwo.position)
    .to({x: this.beeTwo.x + 50, y: this.beeTwo.y - 20}, 6000)
    .repeat(Infinity)
    .yoyo(true)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .start()

    new Tween(this.beeThree.position)
    .to({x: this.beeThree.x + 20, y: this.beeThree.y + 30}, 10000)
    .repeat(Infinity)
    .yoyo(true)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()

  }
}
