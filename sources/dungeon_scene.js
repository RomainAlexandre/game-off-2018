import characters_sprite from '../assets/spritesheets/character.png';
import tile_assets from '../assets/tilesets/dungeon_tiles_3.png';
import tile_map from '../assets/tilemaps/dungeon_3.json';

import Player from "./player.js";

export default class DungeonScene extends Phaser.Scene {
//	constructor() {
//    super();
//    this.level = 0;
//  }

	preload() {
		this.load.image("tiles", tile_assets);
		this.load.tilemapTiledJSON("map", tile_map);
		this.load.spritesheet(
			"characters",
			characters_sprite,
			{
				frameWidth: 32,
				frameHeight: 32,
				margin: 0,
				spacing: 0
			}
		);
	}

	create() {
/*		this.dungeon = new Dungeon({
			width: 50,
			height: 50,
			doorPadding: 2,
			rooms: {
				width: { min: 7, max: 15, onlyOdd: true },
				height: { min: 7, max: 15, onlyOdd: true }
			}
		});

		this.dungeon.drawToConsole();

		// Creating a blank tilemap with dimensions matching the dungeon
		const map = this.make.tilemap({
			tileWidth: 48,
			tileHeight: 48,
			width: this.dungeon.width,
			height: this.dungeon.height
		});*/

		const map = this.make.tilemap({ key: "map" });
		const tileset = map.addTilesetImage("dungeon_tiles_3", "tiles");

		const belowLayer = map.createStaticLayer("floor", tileset, 0, 0);
		worldLayer = map.createStaticLayer("wall", tileset, 0, 0);

		worldLayer.setCollisionByProperty({ collides: true });

		const spawnPoint = map.findObject("Player", obj => obj.name === "spawn_point");

		this.player = new Player(this, 5, 5);

		this.physics.add.collider(player, worldLayer);

	}
}