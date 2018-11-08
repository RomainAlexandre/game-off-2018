import Phaser from "phaser";

export default class GodsHand {
  constructor(scene) {
    this.scene = scene;

    this.shiftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

    // Create a simple graphic that can be used to show which tile the mouse is over
    this.marker = scene.add.graphics();
    this.marker.lineStyle(5, 0xffffff, 1);
    this.marker.strokeRect(0, 0, scene.map.tileWidth, scene.map.tileHeight);
    this.marker.lineStyle(3, 0xff4f78, 1);
    this.marker.strokeRect(0, 0, scene.map.tileWidth, scene.map.tileHeight);
  }

  update(time, delta) {
    // Convert the mouse position to world position within the camera
    const worldPoint = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main);

    // Place the marker in world space, but snap it to the tile grid. If we convert world -> tile and
    // then tile -> world, we end up with the position of the tile under the pointer
    const pointerTileXY = this.scene.groundLayer.worldToTileXY(worldPoint.x, worldPoint.y);
    const snappedWorldPoint = this.scene.groundLayer.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);
    this.marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);

    // Draw or erase tiles (only within the groundLayer)
    if (this.scene.input.manager.activePointer.isDown) {
      if (this.shiftKey.isDown) {
        this.scene.groundLayer.removeTileAtWorldXY(worldPoint.x, worldPoint.y);
      } else {
        const tile = this.scene.groundLayer.putTileAtWorldXY(353, worldPoint.x, worldPoint.y);
        tile.setCollision(true);
      }
    }
  }

  destroy() {
    this.marker.destroy();
  }
}
