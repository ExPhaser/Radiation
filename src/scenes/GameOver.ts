export default class GameOver extends Phaser.Scene {

  private _GameOver: Phaser.GameObjects.BitmapText;
  private _intro: Phaser.GameObjects.BitmapText;
  private _restart: Phaser.GameObjects.BitmapText;

  constructor() {
    super({
      key: "GameOver",
    });
  }

  create() {
    //localStorage.removeItem("score");
    //localStorage.removeItem("lives");
    //localStorage.removeItem("bestLevel");
    this.cameras.main.setBackgroundColor("#000000");
    let particles = this.add.particles('flares');

    particles.createEmitter({
      frame: 'blue',
      y: 0,
      x: { min: 0, max: 1024 },
      lifespan: 10000,
      speedY: { min: 100, max: 300 },
      scale: { start: 0.1, end: 0.1 },
      quantity: 1
    });

    this._GameOver = this.add
      .bitmapText(this.game.canvas.width / 2, 65, "arcade", "GAME OVER", 60)
      .setAlpha(1)
      .setOrigin(0)
      .setDepth(1001)
      .setOrigin(0.5).setTint(0xffffff);

    this.add
      .bitmapText(this.game.canvas.width / 2, 165, "arcade", "YOUR SCORE:" + this.registry.get("score"), 30)
      .setAlpha(1)
      .setOrigin(0)
      .setDepth(1001)
      .setOrigin(0.5).setTint(0xffffff);

    this._intro = this.add
      .bitmapText(this.game.canvas.width - 140, 550, "arcade", "Intro")
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

    this._restart = this.add
      .bitmapText(140, 550, "arcade", "Replay")
      .setAlpha(1)
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(100)
      .setTint(0xff8200)
      .on("pointerup", () => {
        this._restart.removeInteractive();
        this.restartGame();
      })
      .on("pointerover", () => {
        this._restart.setTint(0xff0000);
      })
      .on("pointerout", () => {
        this._restart.setTint(0xff8200);
      });

  }

  intro() {

    this.scene.stop("GameOver");
    this.scene.start("Intro");

  }

  restartGame() {

    this.scene.stop("GameOver");
    this.scene.start("GamePlay");
    this.scene.bringToTop("GamePlay");
    this.scene.start("Hud");
    this.scene.bringToTop("Hud");

  }



}
