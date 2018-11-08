import Phaser from "phaser";
import PlatformerScene from "./platformer-scene.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: false,
  parent: "game-container",
  backgroundColor: "#1d212d",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 }
    }
  },
  scene: PlatformerScene
};

const game = new Phaser.Game(config);