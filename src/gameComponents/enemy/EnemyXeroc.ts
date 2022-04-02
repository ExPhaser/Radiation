import GamePlay from "../../scenes/GamePlay";
import BasicEnemyProjectile from "../EnemyProjectiles/BasicEnemyProjectile";
import PZBomb from "../EnemyProjectiles/PZBomb";
import XerocBeam from "../EnemyProjectiles/XerocBeam";
import Player from "../player/Player";
import Enemy from "./Enemy";

export default class EnemyXeroc extends Enemy {

  //private _vel: number = 50;
  public IFrame:boolean = true;
  public HP:integer = 1000000;
  private XerocEye:any;

  constructor(params: genericConfig) {
    super(params);
    this.setName("Xeroc")
    this.create();
  }
  create() {


    this._body
      .setCollideWorldBounds(false, 0.5)
      .setImmovable(true)
      .setAllowGravity(false);

      this.setScale(2,2);
      this.XerocEye = this.scene.add.graphics({
        x: this.x,
        y: this.y-75,
        
         lineStyle: {
             width: 5,
             color: 0xffffff,
             alpha: .7
         },
         fillStyle: {
             color: 0xffffff,
             alpha: 1
         },
    
    });



    // graphics.lineStyle(2, 0xffd900, 1);

   // this.XerocEye.beginFill(0xFF0000, 1);
    this.XerocEye.fillCircle(0, 0, 20);

  }



  private timer:integer = 0;
  private AttackMode:integer = 1;
  private player:Player;
  private HomeFactor:number = 0.05;
  private Unit:Phaser.Math.Vector2;
  private Aim:Phaser.Math.Vector2;

  private ProjParams:genericConfig;
  private BeamParams:genericConfig;

  private EyeOffsetX:number = 0;
  private EyeOffsetY:number = 0;

  private CurrentBeam:any;

  switchAttack(): void {
    this.AttackMode = Phaser.Math.Between(1,1)
  }
  move(): void {
    if(Math.round(this.player.x/10) > Math.round(this.x/10)){
      this._body.setVelocityX(30 + (Math.round(this.player.x) - Math.round(this.x))*this.HomeFactor)
    }else if(Math.round(this.player.x/10) < Math.round(this.x/10)){
      this._body.setVelocityX(-30 + (Math.round(this.player.x) - Math.round(this.x))*this.HomeFactor)
    }else{
      this._body.setVelocityX(0)
    }
    this.setRotation(this._body.velocity.x/5000)
    this._body.setVelocityY(-(this.y-(this.player.y-300)))
  }
  update(time: number, delta: number) { 

    this.timer++;
    this.player = this._scene._player;
    this.ProjParams = {
      scene: this._scene,
      x: this.x,
      y: this.y,
      key: "Patient_Zero_Eye",
    }
    this.BeamParams = {
      scene: this._scene,
      x: this.x,
      y: this.y,
      key: "XerocBeam",
    }


    this.EyeOffsetX = (this.player.x - this.x)/5;
    this.EyeOffsetY = (this.player.y - this.y)/5;
    if(this.EyeOffsetX>10){
      this.EyeOffsetX = 10
    }else if(this.EyeOffsetX<-10){
      this.EyeOffsetX = -10
    }
    if(this.EyeOffsetY>10){
      this.EyeOffsetY = 10
    }else if(this.EyeOffsetY<-10){
      this.EyeOffsetY = -10
    }

    this.XerocEye.y = this.y+13+this.EyeOffsetY
    this.XerocEye.x = this.x+10+this.EyeOffsetX

    if(this.AttackMode == 1){
      this.move()
      if(this.timer == 10){
        this.Aim = new Phaser.Math.Vector2(this.player.x, this.player.y)
        this.Unit = new Phaser.Math.Vector2(this.x, this.y)
        this.Unit.x -= this.Aim.x
        this.Unit.y -= this.Aim.y
        let radians = Math.atan2(this.Unit.y, this.Unit.x)+Phaser.Math.DegToRad(90 + (Math.sin((this.timer-200)/200)*60));

        console.log("Beam")
        this.CurrentBeam = new XerocBeam(this.BeamParams, 0, 0, 25)
        this.CurrentBeam.setScale(.05,5)
        this.CurrentBeam.setOrigin(0.5,0)
        this.CurrentBeam.setRotation(radians)
      }
      if(this.timer > 10 && this.timer <= 400){
        let radians = Math.atan2(this.Unit.y, this.Unit.x)+Phaser.Math.DegToRad(90 + (Math.sin((this.timer-200)/200)*60));
        //this.CurrentBeam.setPosition(this.XerocEye.x, this.XerocEye.y)
        this.CurrentBeam.setPosition(this.XerocEye.x, this.XerocEye.y)
        this.CurrentBeam.setRotation(radians)
        this.CurrentBeam.setScale(this.timer/80,5)
      }
      if(this.timer > 400){
        this.CurrentBeam.destroy()
      }
    }

    if(this.timer == 500){
      this.timer = 0;
      this.switchAttack()
    }
  }
}
