import * as PIXI from 'pixi.js'
import TWEEN from "@tweenjs/tween.js"
import {Tween} from "@tweenjs/tween.js"
const app = new PIXI.Application({width: 800, height: 600})

const daisyURL = require('./images/daisy.png')
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
    daisyURL,
    beeURL
  ])
  .load( () => {
    let daisy = PIXI.Sprite.fromImage(daisyURL)
    let bee = PIXI.Sprite.fromImage(beeURL)

    daisy.scale.x = 0.25
    daisy.scale.y = 0.25
    bee.scale.x = 0.125
    bee.scale.y = 0.125

    daisy.y = app.screen.height - daisy.height
    bee.x = app.screen.width - bee.width

    bee.interactive = true
    bee.buttonMode = true
    bee.on('pointerdown', onClick)

    function onClick() {
      new Tween(bee.position)
      .to({ x:0, y: 400 }, 10000)
      .yoyo(true)
      .easing(TWEEN.Easing.Quadratic.Out)
      .repeat(Infinity)
      .start()
    }

    app.stage.addChild(daisy)
    app.stage.addChild(bee)

    app.ticker.add(() => {
      TWEEN.update()
    })

    app.ticker.start()

  })
