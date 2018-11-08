import tileset from '../../../assets/dynamic_platformer/tilesets/0x72-industrial-tileset-32px-extruded.png';
import tilemap from '../../../assets/dynamic_platformer/tilemaps/my_platformer.json';
import player from '../../../assets/dynamic_platformer/spritesheets/0x72-industrial-player-32px-extruded.png';
import spikeAsset from '../../../assets/dynamic_platformer/images/0x72-industrial-spike.png';

import Phaser from "phaser";
import Player from "./player.js";
import GodsHand from "./gods_hand.js";
import CollisionDebugger from './collision_debugger.js'

/**
 * A class that extends Phaser.Scene and wraps up the core logic for the platformer level.
 */
export default class PlatformerScene extends Phaser.Scene {
  preload() {
    this.load.image("spike", spikeAsset);
    this.load.image("tiles", tileset);
    this.load.tilemapTiledJSON("map", tilemap);
    this.load.spritesheet(
      "player",
      player,
      {
        frameWidth: 32,
        frameHeight: 32,
        margin: 1,
        spacing: 2
      }
    );
  }

  create() {
    this.isPlayerDead = false;

    this.map = this.make.tilemap({ key: "map" });
    this.tiles = this.map.addTilesetImage(
      "0x72-industrial-tileset-32px-extruded",
      "tiles"
    );

    this.map.createDynamicLayer("Background", this.tiles);
    this.groundLayer = this.map.createDynamicLayer("Ground", this.tiles);
    this.map.createDynamicLayer("Foreground", this.tiles);

    // Instantiate a player instance at the location of the "Spawn Point" object in the Tiled map.
    // Note: instead of storing the player in a global variable, it's stored as a property of the
    // scene.
    const spawnPoint = this.map.findObject(
      "Objects",
      obj => obj.name === "Spawn Point"
    );
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);

    this.collision_debugger = new CollisionDebugger(this)

    // Collide the player against the ground layer - here we are grabbing the sprite property from
    // the player (since the Player class is not a Phaser.Sprite).
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.physics.world.addCollider(this.player.sprite, this.groundLayer);

    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    // Create a physics group - useful for colliding the player against all the spikes
    this.spikeGroup = this.physics.add.staticGroup();

    // Loop over each Tile and replace spikes (tile index 77) with custom sprites
    this.groundLayer.forEachTile(tile => {
      if (tile.index === 77) {
        // A sprite has its origin at the center, so place the sprite at the center of the tile
        const x = tile.getCenterX();
        const y = tile.getCenterY();
        const spike = this.spikeGroup.create(x, y, "spike");

        // The map has spike tiles that have been rotated in Tiled ("z" key), so parse out that angle
        // to the correct body placement
        spike.rotation = tile.rotation;
        if (spike.angle === 0) spike.body.setSize(32, 6).setOffset(0, 26);
        else if (spike.angle === -90) spike.body.setSize(6, 32).setOffset(26, 0);
        else if (spike.angle === 90) spike.body.setSize(6, 32).setOffset(0, 0);

        // And lastly, remove the spike tile from the layer
        this.groundLayer.removeTileAt(tile.x, tile.y);
      }
    });

    // Help text that has a "fixed" position on the screen
    this.add
      .text(16, 16, "Arrow keys or WASD to move & jump", {
        font: "18px monospace",
        fill: "#000000",
        padding: { x: 20, y: 10 },
        backgroundColor: "#ffffff"
      })
      .setScrollFactor(0);
  }

  update(time, delta) {
    if (this.isPlayerDead) return;
    // Allow the player to respond to key presses and move itself
    this.player.update(time, delta);

    this.collision_debugger.update(time, delta);

    if (
      this.player.sprite.y > this.groundLayer.height ||
      this.physics.world.overlap(this.player.sprite, this.spikeGroup)
    ) {

      // Flag that the player is dead so that we can stop update from running in the future
      this.isPlayerDead = true;

      const cam = this.cameras.main;
      cam.shake(100, 0.05);
      cam.fade(250, 0, 0, 0);

      // Freeze the player to leave them on screen while fading but remove the marker immediately
      this.player.freeze();
      this.collision_debugger.destroy();

      cam.once("camerafadeoutcomplete", () => {
        this.player.destroy();
        this.scene.restart();
      });
    }
  }
}