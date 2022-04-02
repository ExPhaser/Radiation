import GamePlay from "../../scenes/GamePlay";
import EnemyProjectile from "./EnemyProjectile";

export default class BasicEnemyProjectile extends EnemyProjectile {

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

  }


  private timer:integer = 0;
  update(time: number, delta: number) { 
    this.timer++;
    if(this.timer == 750){
      this.destroy()
    }
  }
}
