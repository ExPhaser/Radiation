import GamePlay from "../../scenes/GamePlay";
import BasicEnemyProjectile from "./BasicEnemyProjectile";
import EnemyProjectile from "./EnemyProjectile";

export default class PZBomb extends EnemyProjectile {

  public Damage:integer = 25;

  private VelocityX:number;
  private VelocityY:number;

  constructor(params: genericConfig, speedX:number, speedY:number, damage:integer) {
    super(params);
    this.setName("proj")
    this.VelocityX = speedX;
    this.VelocityY = speedY;
    this.Damage = damage;
    this.create();
  }
  create() {


    this._body
      .setImmovable(true);

    this._body.setVelocityX(this.VelocityX);
    this._body.setVelocityY(this.VelocityY);
    this.setScale(1.5,1.5)

  }


  private ProjParams:genericConfig;
  private timer:integer = 0;
  private speed:integer = 250;
  update(time: number, delta: number) { 
    this.timer++;
    if(this.timer == 100){
      this.ProjParams = {
        scene: this._scene,
        x: this.x,
        y: this.y,
        key: "Patient_Zero_Eye",
      }
      new BasicEnemyProjectile(this.ProjParams, 0, this.speed, 25)
      new BasicEnemyProjectile(this.ProjParams, 0, -this.speed, 25)
      new BasicEnemyProjectile(this.ProjParams, this.speed, 0, 25)
      new BasicEnemyProjectile(this.ProjParams, -this.speed, 0, 25)
      new BasicEnemyProjectile(this.ProjParams, this.speed*0.7, this.speed*0.7, 25)
      new BasicEnemyProjectile(this.ProjParams, this.speed*0.7, -this.speed*0.7, 25)
      new BasicEnemyProjectile(this.ProjParams, -this.speed*0.7, this.speed*0.7, 25)
      new BasicEnemyProjectile(this.ProjParams, -this.speed*0.7, -this.speed*0.7, 25)
      this.destroy()
    }
  }
}
