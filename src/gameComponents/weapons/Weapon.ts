import { Vector } from "matter";
import GamePlay from "../../scenes/GamePlay";
import IWeapon from "./IWeapon";
import WeaponThe_Jailor from "./WeaponThe_Jailor";

export default class Weapon extends Phaser.GameObjects.Sprite implements IWeapon {
  protected _config: weaponConfig;
  protected _scene: GamePlay;
  protected _body: Phaser.Physics.Arcade.Body;

  private DistanceX:number;
  private DistanceY:number;
  private Pos:Phaser.Math.Vector2;
  private Aim:Phaser.Math.Vector2;
  private Distance:number;
  private Unit:Phaser.Math.Vector2;
  private Offset:Phaser.Math.Vector2;
  //private IsUsingWeapon:boolean = false;

  constructor(params: weaponConfig, useTime:number) {

    super(params.scene, params.x, params.y, params.key);

    this._scene = <GamePlay>params.scene; 
    if(this._scene._player.IsUsingWeapon == false){
      

    }

  }
  //create() { }
  static oldThis:any = this;
  shoot(params:weaponConfig, useTime:number) {
    if(this._scene._player.IsUsingWeapon == false){
      this._scene = <GamePlay>params.scene;
      this.Pos = new Phaser.Math.Vector2(params.x, params.y);
      this.Aim = new Phaser.Math.Vector2(params.aimx-25, params.aimy-25);
      this.Distance = this.Pos.distance(this.Aim);
      this.setOrigin(.5, .5);
      this.setDepth(100);

      this.Unit = this.Pos
      this.Unit.x -= this.Aim.x
      this.Unit.y -= this.Aim.y
      let radians = Math.atan2(this.Unit.y, this.Unit.x)+Phaser.Math.DegToRad(180);
      this.setRotation(radians)
      this.setPosition(this.x+Math.cos(radians)*30 + this._scene._player.width/2, this.y+Math.sin(radians)*30 + this._scene._player.height/2)

      this.Offset = new Phaser.Math.Vector2(this._scene._player.x-this.x, this._scene._player.y-this.y);

      if(this.rotation<-1.5 || this.rotation>1.5){
        this.setFlipY(true);
      }

      this._config = params;
      this._config.scene.physics.world.enable(this);
      this._body = <Phaser.Physics.Arcade.Body>this.body;
      this._scene.add.existing(this);

      this._scene.time.addEvent({
        delay: useTime, callback: () => {
          this.destroy(true);
          this._scene._player.IsUsingWeapon = false;
        }
      });

      this._scene._player.CurrentWeaponOut = this;
      this._scene._player.IsUsingWeapon = true;
      this._scene._player.WeaponOffset = this.Offset;
      return true
    }
    else
    {
      return false
    }
  }


  update(time: number, delta: number) {
  }
  changeDirection(): void { }
  getBody(): Phaser.Physics.Arcade.Body { return this._body; }
}
