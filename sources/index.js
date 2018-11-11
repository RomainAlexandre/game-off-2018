import Phaser from "phaser";
import DungeonScene from "./dungeon_scene.js";

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: "#000",
  parent: "game-container",
  pixelArt: true,
  // TODO Create our own new Scene
  scene: DungeonScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  }
};

const game = new Phaser.Game(config);
