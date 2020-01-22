import Phaser from 'phaser'
import logoImg from '../assets/phaser/logo.png'


export default class HelloScene extends Phaser.Scene {
  constructor() {
    super('helloScene')
  }

  init() {
    this.log = console.log('init')
  }

  preload() {
    this.load.image('logo', logoImg)
  }

  create() {
    // this.add.image(400, 200, 'logo')
    this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'logo')
    console.dir(this.scale)
  }

  // update() {
  //   this.log = console.log('update')
  // }
}
