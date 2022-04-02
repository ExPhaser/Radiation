export default class Win extends Phaser.Scene {

  private _cubes: Phaser.GameObjects.TileSprite;
  private _Win: Phaser.GameObjects.Image;
  private _intro: Phaser.GameObjects.BitmapText;
  private _restart: Phaser.GameObjects.BitmapText;

  constructor() {
    super({
      key: "Win",
    });
  }

  create() {


    localStorage.removeItem("score");
    localStorage.removeItem("lives");
    localStorage.removeItem("bestLevel");
    this.cameras.main.setBackgroundColor("#000000");
    let particles = this.add.particles('flares');

    this._cubes = this.add.tileSprite(0, 0, 1024, 600, "background_win").setOrigin(0);

    particles.createEmitter({
      frame: 'blue',
      y: 0,
      x: { min: 0, max: 1024 },
      lifespan: 10000,
      speedY: { min: 100, max: 300 },
      scale: { start: 0.1, end: 0.1 },
      quantity: 1
    });

    this._Win = this.add.image(this.game.canvas.width / 2, 1, "logo_win").setAlpha(0);
    this.add.tween({
      targets: this._Win, y:190, alpha:1, duration: 1000, ease: "quad.easeInOut",
      onComplete:() => {
        this.add.tween({
              targets: this._Win, y:170, repeat: -1, yoyo: true, duration: 1000, ease:"quad.easeInOut",
          });
        }
      });

    this.add
      .bitmapText(this.game.canvas.width / 2, 300, "arcade", "YOUR SCORE:" + this.registry.get("score"), 30)
      .setAlpha(1)
      .setOrigin(0)
      .setDepth(1001)
      .setOrigin(0.5).setTint(0xffffff);

    this._intro = this.add
      .bitmapText(this.game.canvas.width / 2, 550, "arcade", "Intro")
      .setAlpha(1)
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(100)
      .setTint(0xff8200)

      .on("pointerup", () => {
        this._intro.removeInteractive();
        this.intro();
      })
      .on("pointerover", () => {
        this._intro.setTint(0xff0000);
      })
      .on("pointerout", () => {
        this._intro.setTint(0xff8200);
      });



  }

  intro() {

    this.scene.stop("GameOver");
    this.scene.start("Intro");
  }
}
