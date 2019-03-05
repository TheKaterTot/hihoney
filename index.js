import * as PIXI from 'pixi.js'
import TWEEN from "@tweenjs/tween.js"
import {Tween} from "@tweenjs/tween.js"
import Flower from "./flower"
import StatusBar from "./statusBar"
const app = new PIXI.Application({width: 800, height: 600})
const graphics = new PIXI.Graphics()

const daisyTopURL = require('./images/daisy-head.png')
const daisyBottomURL = require('./images/daisy-bottom.png')
const beeURL = require('./images/bumblebee.png')

//make canvas the size of browser window
app.renderer.view.style.position = "absolute"
app.renderer.view.style.display = "block"
app.renderer.autoResize = true
app.renderer.resize(window.innerWidth, window.innerHeight)
app.renderer.backgroundColor = 0xCFE2F3

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view)

PIXI.loader
  .add([
    daisyTopURL,
    daisyBottomURL,
    beeURL
  ])
  .load( () => {

    let bee = PIXI.Sprite.fromImage(beeURL)
    let currentDaisy
    bee.interactive = true

    bee.x = app.screen.width - bee.width

    function onClick(sprite) { return () => {
      if (currentDaisy) {
        currentDaisy.animateLeaving()
      }
      new Tween(bee.position)
      .to({ x:sprite.x + 50, y: sprite.y - 30 }, 1000)
      .easing(TWEEN.Easing.Circular.Out)
      .onComplete( () => {
        currentDaisy = sprite
        sprite.animateLanding()
      })
      .start()
      }
    }

    let daisies = new PIXI.Container()
    daisies.interactive = true
    daisies.interactiveChildren = true

    for (var i = 0; i < 3; i++) {
      let daisy = new Flower((i % 5) * 300, app.screen.height)

      daisy.on('pointerdown', onClick(daisy))

      daisies.addChild(daisy)
    }


//status bar
    const statusBar = new StatusBar()

    app.stage.addChild(daisies)
    app.stage.addChild(bee)
    app.stage.addChild(statusBar)

    app.ticker.add(() => {
      TWEEN.update()
    })

    app.ticker.start()

  })
