import Phaser from 'phaser'
import config from './config'
import HelloScene from './scenes/HelloScene'


class Game extends Phaser.Game {
  constructor() {
    super(config)
    this.scene.add('helloScene', HelloScene)
    this.scene.start('helloScene')
  }
}

window.onload = () => {
  window.game = new Game()
}
