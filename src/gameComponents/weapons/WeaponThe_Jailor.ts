import { Scene } from "phaser";
import GamePlay from "../../scenes/GamePlay";
import BasicProjectile from "../projectiles/BasicProjectile";
import Weapon from "./Weapon";

export default class WeaponThe_Jailor extends Weapon {

  static WeaponUseTime:number = 600;
  private Damage:integer = 10000;
  private ProjectileSpeed:number = 500;

  static _scene: Scene = this._scene;
  private ProjParams: genericConfig;

  shoot2(params:weaponConfig, useTime:number) {
    if(this.shoot(params, useTime)){
      this.ProjParams = {
        scene: params.scene,
        x: this.x+(Math.cos(this.rotation)*(this.displayWidth/2)),
        y: this.y+(Math.sin(this.rotation)*(this.displayHeight/2)),
        key: "robo2",
      }
      new BasicProjectile(this.ProjParams, Math.cos(this.rotation)*this.ProjectileSpeed, Math.sin(this.rotation)*this.ProjectileSpeed, this.Damage);
    }
  }

  constructor(params:weaponConfig) {
    super(params, WeaponThe_Jailor.WeaponUseTime);
    this.setName("Jailor")
    this.shoot2(params, WeaponThe_Jailor.WeaponUseTime)
    this.create();
  }
  create() {
  }
  update(time: number, delta: number) { }
}
