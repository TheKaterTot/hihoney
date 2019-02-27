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
    let bee = PIXI.Sprite.fromImage(beeURL)

    bee.scale.x = 0.125
    bee.scale.y = 0.125


    bee.x = app.screen.width - bee.width



    function onClick(sprite) { return () => {
      new Tween(bee.position)
      .to({ x:sprite.x, y: sprite.y - 50 }, 10000)
      .yoyo(true)
      .easing(TWEEN.Easing.Quadratic.Out)
      .repeat(Infinity)
      .start()
      }
    }

    // for (var i = 0; i < 25; i++) {
    // var bunny = new PIXI.Sprite(texture);
    // bunny.anchor.set(0.5);
    // bunny.x = (i % 5) * 40;
    // bunny.y = Math.floor(i / 5) * 40;
    let daisies = new PIXI.Container()
    daisies.interactive = true
    daisies.interactiveChildren = true

    for (var i = 0; i < 3; i++) {
      let daisy = PIXI.Sprite.fromImage(daisyURL)

      daisy.scale.x = 0.25
      daisy.scale.y = 0.25

      daisy.y = app.screen.height - daisy.height
      daisy.interactive = true
      daisy.buttonMode = true
      daisy.on('pointerdown', onClick(daisy))

      daisy.x = (i % 5) * 150
      daisy.y = app.screen.height - daisy.height
      daisies.addChild(daisy)
    }

    app.stage.addChild(daisies)
    app.stage.addChild(bee)

    app.ticker.add(() => {
      TWEEN.update()
    })

    app.ticker.start()

  })
