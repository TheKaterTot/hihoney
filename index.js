import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js'
import StartScreen from './startScreen'
import GameScreen from './gameScreen'
import socket from './socket'

const app = new PIXI.Application({ width: 800, height: 600 })

const daisyTopURL = require('./images/daisy-head.png')
const daisyBottomURL = require('./images/daisy-bottom.png')
const beeURL = require('./images/bumblebee.png')
const queenURL = require('./images/queen.png')
const textOneURL = require('./images/text-1.png')
const textTwoURL = require('./images/text-2.png')
const textThreeURL = require('./images/text-3.png')
const ladybugURL = require('./images/ladybug.png')
const titleURL = require('./images/title.png')
const daisyBunchURL = require('./images/daisy-bunch.png')
const clickStartURL = require('./images/click-start.png')
const titleBeeURL = require('./images/title-bee.png')
setInterval(() => {
  socket.emit('fps', PIXI.ticker.shared.FPS)
}, 10000)

// make canvas the size of browser window
app.renderer.view.style.position = 'absolute'
app.renderer.view.style.display = 'block'
app.renderer.autoResize = true
app.renderer.resize(window.innerWidth, window.innerHeight)
app.renderer.backgroundColor = 0xCFE2F3

// Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view)
const beginLoad = Date.now()
PIXI.loader
  .add([
    daisyTopURL,
    daisyBottomURL,
    beeURL,
    queenURL,
    titleURL,
    daisyBunchURL,
    clickStartURL,
    textOneURL,
    textTwoURL,
    textThreeURL,
    ladybugURL,
    titleBeeURL

  ])
  .load(() => {
    const endLoad = Date.now()
    socket.emit('loadTime', endLoad - beginLoad)
    let startScreen = new StartScreen(app.screen.width, app.screen.height)
    let gameScreen = new GameScreen(app.screen.width, app.screen.height)

    app.stage.addChild(startScreen)

    startScreen.on('start', () => {
      app.stage.removeChildren()
      app.stage.addChild(gameScreen)
      gameScreen.infectNext()
    })

    app.ticker.add(() => {
      TWEEN.update()
      gameScreen.update()
    })

    app.ticker.start()
  })
