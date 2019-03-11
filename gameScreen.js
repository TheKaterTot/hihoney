import {Container, Sprite} from "pixi.js"
import TWEEN from "@tweenjs/tween.js"
import {Tween} from "@tweenjs/tween.js"
import Bee from "./bee"
import Queen from "./queen"
import StatusBar from "./statusBar"
import Hive from "./hive"
import Flower from "./flower"

export default class gameScreen extends Container {
  constructor(width, height) {
    super()
    this.screenHeight = height
    this.screenWidth = width
    this.bee = new Bee(width, 0)
    this.queen = new Queen(-200, 100)
    this.currentDaisy = null
    this.currentPercent = 0
    this.daisies = new PIXI.Container()
    this.daisies.interactive = true
    this.daisies.interactiveChildren = true

    for (var i = 0; i < 3; i++) {
      let daisy = new Flower((i % 5) * 300, height)

      daisy.on('pointerdown', this.onClick(daisy))

      this.daisies.addChild(daisy)
    }

    this.statusBar = new StatusBar(10, 10, 0xffe446, 400, 20)
    this.bee.on('gather', this.onGather())

    this.hive = new Hive(0, 40)
    this.hive.on('pointerdown', this.onHiveClick(this.hive))

    this.addChild(this.daisies)
    this.addChild(this.bee)
    this.addChild(this.statusBar)
    this.addChild(this.hive)
    this.addChild(this.queen)

  }

  onClick(sprite) { return () => {
    if (sprite == this.currentDaisy) {
      return
    }
    if (this.currentDaisy) {
      this.currentDaisy.animateLeaving()
      this.bee.stopGather()
    }
    new Tween(this.bee.position)
    .to({ x:sprite.x + 50, y: sprite.y - 30 }, 1000)
    .easing(TWEEN.Easing.Circular.Out)
    .onComplete( () => {
      this.currentDaisy = sprite
      sprite.animateLanding()
      if (this.currentPercent < 1) {
        this.bee.startGather()
      }
    })
    .start()
    }
  }

  onGather () {
    return () => {
      if (this.currentPercent >= 1) {
        this.statusBar.clear()
        this.currentPercent = 0.25
        this.statusBar.updateWidth(this.currentPercent)
        return
      }
      this.currentPercent += 0.25
      this.statusBar.updateWidth(this.currentPercent)
    }
  }

  onHiveClick(sprite) { return () => {
    const newBeePos = this.screenWidth - this.bee.width
    this.daisies.interactiveChildren = false


    if (this.currentPercent >= 1) {
      const original = new Tween(this.bee.position)
      .to({x: sprite.x+50, y: sprite.y + 100}, 1000)
      .easing(TWEEN.Easing.Circular.Out)
      .onComplete( () => {
        this.currentPercent = 0
        this.statusBar.clear()
      })

      const tweens = [
        new Tween(this.bee.position)
        .to({x: newBeePos, y: 200})
        .delay(2000),
        new Tween(this.queen.position)
        .to({x: newBeePos - this.queen.width - 50}, 1000),
        new Tween(this.queen.scale)
        .to({x: -1}, 0)
        .delay(5000),
        new Tween(this.queen.position)
        .to({x: -200}, 1000)
        .onComplete( () => {
          this.bee.reset()
          this.daisies.interactiveChildren = true
        })
      ]

      tweens.reduce((result, tween) => {
        result.chain(tween)
        return tween
      }, original)

      original.start()
    }
  }
}

  update() {
    this.bee.update()
  }

}