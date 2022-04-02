import GamePlay from "../../scenes/GamePlay";
import BasicEnemyProjectile from "../EnemyProjectiles/BasicEnemyProjectile";
import Player from "../player/Player";
import Enemy from "./Enemy";

export default class PatientZeroEye extends Enemy {

  //private _vel: number = 50;
  constructor(params: genericConfig) {
    super(params);
    this.setName("PZEye")
    this.create();
  }
  create() {


    this._body
      .setCollideWorldBounds(false, 0.5)
      .setImmovable(true)
      .setAllowGravity(false)

  }


  update(time: number, delta: number) { 
  }
}
