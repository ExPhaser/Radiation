import { Vector } from "matter";
import GamePlay from "../../scenes/GamePlay";
import IProjectile from "./IProjectile";

export default class Projectile extends Phaser.GameObjects.Sprite implements IProjectile {
  protected _config: genericConfig;
  protected _scene: GamePlay;
  protected _body: Phaser.Physics.Arcade.Body;

  constructor(params: genericConfig) {

    super(params.scene, params.x, params.y, params.key);
    this._config = params;
    this._scene = <GamePlay>params.scene;
    this._config.scene.physics.world.enable(this);
    this.setOrigin(0.5);
    this._body = <Phaser.Physics.Arcade.Body>this.body;
    this._scene.addProjectile(this);
    this._scene.add.existing(this);
  }

  update(time: number, delta: number) { 
  }
}
