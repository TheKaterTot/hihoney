import { Container, Sprite } from "pixi.js"
const ladybugURL = require('./images/ladybug.png')

 export default class Ladybug extends Container {
   constructor(x, y) {
     super()
     this.y = y
     this.image = Sprite.fromImage(ladybugURL)
     this.addChild(this.image)
     this.x = x
   }
 }
