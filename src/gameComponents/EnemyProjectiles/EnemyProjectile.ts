import { Vector } from "matter";
import GamePlay from "../../scenes/GamePlay";
import IEnemyProjectile from "./IEnemyProjectile";

export default class EnemyProjectile extends Phaser.GameObjects.Sprite implements IEnemyProjectile {
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
    this._scene.addEnemyProjectile(this);
    this._scene.add.existing(this);
  }

  update(time: number, delta: number) { 
  }
}
