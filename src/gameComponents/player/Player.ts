import GamePlay from "../../scenes/GamePlay";
import Missile from "../missile/Missile";
import Weapon from "../weapons/Weapon";
import WeaponThe_Jailor from "../weapons/WeaponThe_Jailor";
import IPlayer from "./IPlayer";

export default class Player extends Phaser.GameObjects.Sprite implements IPlayer {

  //dichiariamo le variabili 
  private _config: genericConfig;
  private _scene: GamePlay;
  private _body: Phaser.Physics.Arcade.Body;
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private _spacebar: Phaser.Input.Keyboard.Key;
  private _w: Phaser.Input.Keyboard.Key;
  private _d: Phaser.Input.Keyboard.Key;
  private _a: Phaser.Input.Keyboard.Key;
  private _canDubleJump :boolean =false;

  private _direction: string;
  private CurrentWeapon: string = "The_Jailor";
  public IsUsingWeapon: boolean = false;

  private WeaponParams: weaponConfig;

  public CurrentWeaponOut: any;
  public WeaponOffset: Phaser.Math.Vector2;
  
  private weaponClass: any;

  constructor(params: genericConfig) {
    //passiamo i parametri di inizializzazione alla classe SPRITE
    super(params.scene, params.x, params.y, params.key);
    //assegnamo i parametri di configurazione alla variabile
    this._config = params;
    //assegnamo il riferrimento alla scena padre
    this._scene = <GamePlay>params.scene;
    //abilitiamo questo gameobject alla fisica
    this._scene.physics.world.enable(this);
    //settiamo la variabile in modo da poter accedere a tutte le propery del body
    this._body = <Phaser.Physics.Arcade.Body>this.body;
    //aggiungiamo questo gameobject alla scena
    this.setName("player")
    this._scene.add.existing(this);
    
    /*this._scene.input.on('pointerdown', (pointer:any) =>{
        var touchX = pointer.worldX;
        var touchY = pointer.worldY;
        // ...
        this.WeaponParams = {
          scene: this._scene, 
          x: this._body.x, 
          y: this._body.y, 
          key: this.CurrentWeapon, 
          aimx: touchX, 
          aimy: touchY
        }

        switch(this.CurrentWeapon){
          case "The_Jailor":
            new WeaponThe_Jailor(this.WeaponParams);
            break;
          
        }
    });*/

    this._body
      .setCollideWorldBounds(true, 0.5) //collide con i bounds del world
      .setImmovable(true) //non rispnde agli effetti della fisica se collide con altro game object
      .setGravity(0, 1200) //setta la gravit?? 
      .setMaxVelocity(250, 550); //setta una velocit?? max per la X e la Y


    //creiamo un istanza di cursor keys
    this._cursors = this._scene.input.keyboard.createCursorKeys();
    //inizializziamo la SPACE KEY 
    this._spacebar = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this._w = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this._d = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this._a = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

    //creiamo l'animazione di pausa
    let _animation = {
      key: "idle",
      frames: this.anims.generateFrameNumbers(this._config.key, {
        frames: [0, 1, 2, 3]
      }),
      frameRate: 10,
      yoyo: false,
      repeat: 0
    };
    //la inizializziamo
    this.anims.create(_animation);

    //creiamo l'animazione di movimento
    _animation = {
      key: "move",
      frames: this.anims.generateFrameNumbers(this._config.key, {
        frames: [4, 5, 6, 7]
      }),
      frameRate: 10,
      yoyo: false,
      repeat: 0
    };
    //la inizializziamo
    this.anims.create(_animation);
    //settiamo la z a 11
    this.setDepth(11);

  }
  
  //questo metodo serve nel collider per avere accesso alle proprit?? del body per fare dei controlli 
  getBody(): Phaser.Physics.Arcade.Body { return this._body }

  update(time: number, delta: number) {

    if (this._scene.input.activePointer.isDown){
      var touchX = this._scene.input.activePointer.worldX;
      var touchY = this._scene.input.activePointer.worldY;
      // ...
      this.WeaponParams = {
        scene: this._scene, 
        x: this._body.x, 
        y: this._body.y, 
        key: this.CurrentWeapon, 
        aimx: touchX, 
        aimy: touchY
      }

      switch(this.CurrentWeapon){
        case "The_Jailor":
          new WeaponThe_Jailor(this.WeaponParams);
          break;
      }
    }

    if (this.IsUsingWeapon){
      this.CurrentWeaponOut.setPosition(this._scene._player.x - this.WeaponOffset.x, this._scene._player.y - this.WeaponOffset.y)
    }

    //se preme la barra spaziatrice spara una bomba
    if (Phaser.Input.Keyboard.JustDown(this._spacebar)) {
      //crea una nova istanza di missile nella direzione del player
      //in questa versione del gioco il player non spara
      //new Missile({ scene: this._scene, x: this.x, y: this.y, key: "missile", direction: this._direction })

    }

    const didPressJump= Phaser.Input.Keyboard.JustDown(this._w);
    //se il tasto cursore up ?? premuto ed il player ?? a contatto con il pavimento
   if(didPressJump){
     if(this._body.onFloor()){
       this._canDubleJump=true;
       this._body.setVelocityY(-550);
     }else if(this._canDubleJump){
       this._canDubleJump=false;
       this._body.setVelocityY(-550);

     }
   }


    //se il il cursore sinistro ?? premuto
    if (this._a.isDown) {
      //gira il PLAYER nella posizione iniziale, quella definina nello spritesheet
      this.setFlipX(false);
      //effettual il play dell'animazione
      this.anims.play('move', true);
      //setta la velocit?? x in modo da far muovere il player
      this._body.setVelocityX(-250);
      //setta la direction verso sinistra
      this._direction = "left";

    }

    //se il il cursore destro ?? premuto
    else if (this._d.isDown) {
      //gira il PLAYER in direzione opposta da quella definina nello spritesheet
      this.setFlipX(true);
      //effettual il play dell'animazione
      this.anims.play('move', true);
      //setta la velocit?? x in modo da far muovere il player
      this._body.setVelocityX(250);
      //setta la direction verso destra
      this._direction = "right";
    }

    //se non sono premuti i pulsanti
    else {
      //setta la velocit?? x a 0 in modo da far fermare il PLAYER
      this._body.setVelocityX(0);
      //effettual il play dell'animazione
      this.anims.play('idle', true);
      //setta la direction a NONE
      this._direction = "none";
      
    }

  }

  death() {
    //disattivo il body del player
    this._body.setEnable(false);
    //setto l'alpha a zero e lo rendo invisibile
    this.setAlpha(0);

  }

  relive() {
    //riattivo il body del player
    this._body.setEnable(true);
    //setto l'alpha a 1 e lo rendo visibile
    this.setAlpha(1);
    //lo riposiziono allo start
    this.setPosition(64, 450);
  }


}
