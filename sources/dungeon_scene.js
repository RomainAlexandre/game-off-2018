import characters_sprite from '../assets/spritesheets/character.png';
import tile_assets from '../assets/tilesets/dungeon_tiles_2.png';
import tile_map from '../assets/tilemaps/dungeon_2.json';

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
				frameWidth: 64,
				frameHeight: 64,
				margin: 1,
				spacing: 2
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

		

	}
}