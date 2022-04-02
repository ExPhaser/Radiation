export default class Intro extends Phaser.Scene {

  private _logo: Phaser.GameObjects.Image;
  private _play: Phaser.GameObjects.BitmapText;

  private _cubes: Phaser.GameObjects.TileSprite;
  private _counter: number = 0;

  constructor() {
    super({
      key: "Intro",
    });
  }
  create() {


    this._cubes = this.add.tileSprite(0, 0, 1024, 600, "bg3").setOrigin(0).setScale(1);

    //this.cameras.main.setBackgroundColor("#008201");

    let particles: Phaser.GameObjects.Particles.ParticleEmitterManager = this.add.particles("flares");

 

    

    this._logo = this.add.image(this.game.canvas.width / 2, 200, "nuke").setAlpha(0).setScale(1.3);
    this.add.tween({
      targets: this._logo, y: 220, alpha: 1, duration: 1000, ease: "quad.easeInOut",

      onComplete: () => {
        this.add.tween({
          targets: this._logo, y: 200, repeat: -1, yoyo: true, duration: 1000, ease: "quad.easeInOut",
        });
      }
    });


    this._play = this.add
      .bitmapText(this.game.canvas.width / 2, 500, "arcade", "PLAY")
      .setAlpha(1)
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(100)
      .setTint(0xD45900)
      .on("pointerup", () => {
        this._play.removeInteractive();
        this.startGame();
      })
      .on("pointerover", () => {
        this._play.setTint(0xEB9558);
      })
      .on("pointerout", () => {
        this._play.setTint(0xD45900);
      });
  }

  startGame() {

    this.scene.stop("Intro");
    this.scene.start("GamePlay");
    this.scene.start("Hud");
    this.scene.bringToTop("Hud");

  }

  update(time: number, delta: number): void {
    this._counter -= 0.01;
    this._cubes.tilePositionX += Math.sin(this._counter) //* 3.5; //moltiplicatore per la velocità;
    this._cubes.tilePositionY += Math.cos(this._counter) //* 3.5; //moltiplicatore per la velocità
   }

  }

