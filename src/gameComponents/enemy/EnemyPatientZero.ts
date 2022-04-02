import GamePlay from "../../scenes/GamePlay";
import BasicEnemyProjectile from "../EnemyProjectiles/BasicEnemyProjectile";
import PZBomb from "../EnemyProjectiles/PZBomb";
import Player from "../player/Player";
import Enemy from "./Enemy";
import PatientZeroEye from "./PatientZeroEye";

export default class EnemyPatientZero extends Enemy {

  //private _vel: number = 50;
  public IFrame:boolean = true;
  public HP:integer = 1000000;
  private Eye:PatientZeroEye;

  constructor(params: genericConfig) {
    super(params);
    this.setName("PZ")
    this.create();
  }
  create() {


    this._body
      .setCollideWorldBounds(false, 0.5)
      .setImmovable(true)
      .setAllowGravity(false)

    this.Eye = new PatientZeroEye({scene: this._scene, x: this.x, y:this.y, key:"Patient_Zero_Eye"})

  }



  private timer:integer = 0;
  private AttackMode:integer = 5;
  private player:Player;
  private HomeFactor:number = 5;
  private Unit:Phaser.Math.Vector2;
  private Aim:Phaser.Math.Vector2;

  private ProjParams:genericConfig;


  switchAttack(): void {
    this.AttackMode = Phaser.Math.Between(1,5)
  }
  move(): void {
    if(Math.round(this.player.x/10) > Math.round(this.x/10)){
      this._body.setVelocityX(120 + (Math.round(this.player.x*this.HomeFactor) - Math.round(this.x*this.HomeFactor)))
    }else if(Math.round(this.player.x/10) < Math.round(this.x/10)){
      this._body.setVelocityX(-120 + (Math.round(this.player.x*this.HomeFactor) - Math.round(this.x*this.HomeFactor)))
    }else{
      this._body.setVelocityX(0)
    }
    this.setRotation(this._body.velocity.x/2500)
    this._body.setVelocityY(-(this._body.y-(this.player.y-350))*this.HomeFactor)
  }
  update(time: number, delta: number) { 


    this.Eye.setPosition(this.x, this.y)

    this.timer++;
    this.player = this._scene._player;
    this.ProjParams = {
      scene: this._scene,
      x: this.x,
      y: this.y,
      key: "Patient_Zero_Eye",
    }

    if(this.AttackMode == 1){
      this.HomeFactor = 5;
      this.move()
      if(this.timer > 75){
        if(this.timer%5 == 0){
          new BasicEnemyProjectile(this.ProjParams, 0, 375, 25)
        }
      }
    } else if(this.AttackMode == 2){
      this.HomeFactor = 0.25;
      this.move()

      this.Aim = new Phaser.Math.Vector2(this.player.x, this.player.y)
      this.Unit = new Phaser.Math.Vector2(this.x, this.y)
      this.Unit.x -= this.Aim.x
      this.Unit.y -= this.Aim.y
      let radians = Math.atan2(this.Unit.y, this.Unit.x)+Phaser.Math.DegToRad(180 + ((this.timer-125)/3));
      if(this.timer%15 == 0){
        new BasicEnemyProjectile(this.ProjParams, Math.cos(radians)*250, Math.sin(radians)*250, 25)
      }

    } else if(this.AttackMode == 3){
      this.HomeFactor = -.1;
      this.move()
      //this._body.setVelocity(0,0)
      //this.setRotation(0)
      if(this.timer > 75){
        if(this.timer%4 == 0){
          new BasicEnemyProjectile(this.ProjParams, Math.cos(this.timer/15)*300, Math.sin(this.timer/15)*300, 25)
        }
      }
    }else if(this.AttackMode == 4){
      this.HomeFactor = 0.25;
      this.move()

      this.Aim = new Phaser.Math.Vector2(this.player.x, this.player.y)
      this.Unit = new Phaser.Math.Vector2(this.x, this.y)
      this.Unit.x -= this.Aim.x
      this.Unit.y -= this.Aim.y
      let radians = Math.atan2(this.Unit.y, this.Unit.x)+Phaser.Math.DegToRad(180 + (Math.sin(this.timer/10)*30));
      if(this.timer%15 == 0){
        new BasicEnemyProjectile(this.ProjParams, Math.cos(radians)*250, Math.sin(radians)*250, 25)
      }
    }else if(this.AttackMode == 5){
      this.HomeFactor = 0.5;
      this.move()

      this.Aim = new Phaser.Math.Vector2(this.player.x, this.player.y)
      this.Unit = new Phaser.Math.Vector2(this.x, this.y)
      this.Unit.x -= this.Aim.x
      this.Unit.y -= this.Aim.y
      let radians = Math.atan2(this.Unit.y, this.Unit.x)+Phaser.Math.DegToRad(180 + (Math.sin(this.timer/10)*60));
      if(this.timer%50 == 0){
        new PZBomb(this.ProjParams, Math.cos(radians)*100, Math.sin(radians)*100, 25)
      }
    }

    if(this.timer == 250){
      this.timer = 0;
      this.switchAttack()
    }
  }
}
