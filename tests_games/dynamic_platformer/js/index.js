import tileset from '../../../assets/dynamic_platformer/tilesets/0x72-industrial-tileset-32px-extruded.png';
import tilemap from '../../../assets/dynamic_platformer/tilemaps/platformer.json';

import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true, // Force the game to scale images up crisply
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let groundLayer;

function preload() {
  this.load.image("tiles", tileset);
  this.load.tilemapTiledJSON("map", tilemap);
}

function create() {
  const map = this.make.tilemap({ key: "map" });
  const tiles = map.addTilesetImage("0x72-industrial-tileset-32px-extruded", "tiles");

  map.createDynamicLayer("Background", tiles);
  groundLayer = map.createDynamicLayer("Ground", tiles);
  map.createDynamicLayer("Foreground", tiles);
}

function update(time, delta) {
  // Convert the mouse position to world position within the camera
  const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

  // Draw tiles (only within the groundLayer)
  if (this.input.manager.activePointer.isDown) {
    groundLayer.putTileAtWorldXY(353, worldPoint.x, worldPoint.y);
  }
}