export default class Intro extends Phaser.Scene {

  //variabile per il logo
  private _logo: Phaser.GameObjects.Image;
  //variabile per il tasto play
  private _play: Phaser.GameObjects.BitmapText;
  //variabile per il tasto "come giocare"
  private _howToPlay: Phaser.GameObjects.BitmapText;
  //variabile per il container dei credits
  private _howToPlayContainer: Phaser.GameObjects.Container;
  //variabile per il tasto "crediti"
  private _credits: Phaser.GameObjects.BitmapText;
  //variabile per il container dei credits
  private _creditsContainer: Phaser.GameObjects.Container;
  //variabile per gestire l'animazione dello sfondo
  private _counter: number = 0;
  //variabile per la tilesprite dello sfondo
  private _cubes: Phaser.GameObjects.TileSprite;


  constructor() {

    super({
      key: "Intro",
    });
  }


  create() {



    //setto il background della camera a nero
    this.cameras.main.setBackgroundColor("#000000");

    //creo l'istanza della tilesprite dello sfondo
    this._cubes = this.add.tileSprite(0, 0, 1024, 600, "cubes").setOrigin(0)

    //aggiungo un immagine per l'effetto sfumato dei bordi
    this.add.image(0, 0, "trasparenza").setOrigin(0).setScale(2);

    //creo l'istanza del logo
    this._logo = this.add.image(this.game.canvas.width / 2, 50, "greenbots").setAlpha(0);

    //creo il primo tween che porterà il logo dalla posizione y:50 alla posizione y:150 e dall'alpha 0 all'alpha 1
    this.add.tween({
      targets: this._logo, y: 150, alpha: 1, duration: 1000, ease: "quad.easeInOut",
      onComplete: () => {

        //al completamento del primo tween ne eseguo un secondo all'infinito che porta in loop il logo dalla posizione 150 alla posizione 120
        this.add.tween({
          targets: this._logo, y: 120, repeat: -1, yoyo: true, duration: 1000, ease: "quad.easeInOut",
        });
      }
    });

    //creo l'istanza del pulsante per il play del gioco
    this._play = this.add
      .bitmapText(this.game.canvas.width / 2, 400, "arcade", "PLAY")
      .setAlpha(0) //setto l'alpha a 1
      .setOrigin(0.5) //setto l'origin centrale
      .setInteractive() //abilito l'interazione 
      .setDepth(100) //setto la profondità
      .setTint(0xffffff) //setto il colore di partenza a bianco
      //sul "click" rimuovo la possibilità di interagire per evitare click multipli e richiamo il metodo startgame per far partire il gioco
      .on("pointerup", () => {
        //rimuovo interazione dal pulsante play
        this._play.removeInteractive();
        //inizio il gioco
        this.startGame();
      })
      //sul pointer over della scritta setto il colore a rosso
      .on("pointerover", () => {
        this._play.setTint(0xff0000);
      })
      // sul pointer out della scritta lo riporto a bianco
      .on("pointerout", () => {
        this._play.setTint(0xffffff);
      });


    //creo l'istanza del pulsante per il testo "come giocare" del gioco
    this._howToPlay = this.add
      .bitmapText(this.game.canvas.width / 2, 500, "arcade", "Come giocare", 20)
      .setAlpha(0) //setto l'alpha a 0
      .setOrigin(0.5) //setto l'origin centrale
      .setInteractive() //abilito l'interazione 
      .setDepth(100) //setto la profondità
      .setTint(0xffffff) //setto il colore di partenza a bianco
      //sul "click" rimuovo la possibilità di interagire per evitare click multipli e richiamo il metodo howToPlay per visualizzare le info del gioco
      .on("pointerup", () => {
        //rimuovo interazione dal pulsante play
        this._howToPlay.removeInteractive();
        //richiamo il metodo per visualizzare il container delle info del gioco
        this.showHowToPlay();
        //setto il colore a bianco
        this._howToPlay.setTint(0xffffff);
      })
      //sul pointer over della scritta setto il colore a rosso
      .on("pointerover", () => {
        this._howToPlay.setTint(0xff0000);
      })
      // sul pointer out della scritta lo riporto a bianco
      .on("pointerout", () => {
        this._howToPlay.setTint(0xffffff);
      });

    //creo l'istanza del container e la posiziono a 0,0 con alpha a 0
    this._howToPlayContainer = this.add.container(0, 0).setAlpha(0).setDepth(1000);
    //creo un immagine per creare opacità 
    let _howToPlayBg = this.add.image(0, 0, "bg-black").setOrigin(0).setInteractive().on("pointerdown", () => {
      this.hideHowToPlay();
    });
    // creo un testo "come giocare" da visualizzare nel container
    let _howToPlayLabel = this.add.bitmapText(this.game.canvas.width / 2, 50, "arcade", "Come giocare").setOrigin(.5);
    // creo un testo descrittivo da visualizzare nel container
    let _howToPlayText = this.add.text(20, 150, "Lo scopo del gioco è quello di distruggere tutti i nemici e recuperare la chiave\nper superare il livello.\n\nPer distruggere i nemici dovrai saltargli in testa.").setOrigin(0).setFontSize(20);
    //aggiungo tutti i gameobj al container
    this._howToPlayContainer.add([_howToPlayBg, _howToPlayLabel, _howToPlayText]);

    //creo l'istanza del pulsante per il testo "crediti" del gioco
    this._credits = this.add
      .bitmapText(this.game.canvas.width / 2, 550, "arcade", "Crediti", 20)
      .setAlpha(0) //setto l'alpha a 1
      .setOrigin(0.5) //setto l'origin centrale
      .setInteractive() //abilito l'interazione 
      .setDepth(100) //setto la profondità
      .setTint(0xffffff) //setto il colore di partenza a bianco
      //sul "click" rimuovo la possibilità di interagire per evitare click multipli e richiamo il metodo credits per visualizzare le info del gioco
      .on("pointerup", () => {
        //rimuovo interazione dal pulsante play
        this._credits.removeInteractive();
        //richiamo il metodo per visualizzare il container dei CREDITI
        this.showCredits();
        //setto il colore a bianco
        this._credits.setTint(0xffffff);
      })
      //sul pointer over della scritta setto il colore a rosso
      .on("pointerover", () => {
        this._credits.setTint(0xff0000);
      })
      // sul pointer out della scritta lo riporto a bianco
      .on("pointerout", () => {
        this._credits.setTint(0xffffff);
      });

    //creo l'istanza del container e la posiziono a 0,0 con alpha a 0
    this._creditsContainer = this.add.container(0, 0).setAlpha(0).setDepth(1000);
    //creo un immagine per creare opacità 
    let _creditBg = this.add.image(0, 0, "bg-black").setOrigin(0).setInteractive().on("pointerdown", () => {
      this.hideCredits();
    });
    // creo un testo "crediti" da visualizzare nel container
    let _creditsLabel = this.add.bitmapText(this.game.canvas.width / 2, 50, "arcade", "CREDITI").setOrigin(.5);
    // creo un testo descrittivo da visualizzare nel container
    let _creditsText = this.add.text(20, 150, "Questo gioco è stato creato come esempio da studiare per capire i concetti base\ndella libreria PhaserJs").setOrigin(0).setFontSize(20);
    //aggiungo tutti i gameobj al container
    this._creditsContainer.add([_creditBg, _creditsLabel, _creditsText]);



    //applichiamo un tween ai 3 pulsanti (play crediti e come giocare)
    //il tween viene appilcato in maniera sequenziale dal primo elemento dell'array targets con un delay di 250 ms gestito dalla funzione this.tweens.stagger
    this.tweens.add({
      targets: [this._credits, this._howToPlay, this._play],
      y: "-=30",
      alpha: 1,
      duration: 2000,
      ease: 'Sine.easeInOut',
      delay: this.tweens.stagger(250, {})
    });

  }

  //metodo per visualizzare "come giocare"
  showHowToPlay() {
    //setto l'opacità del container a 1
    this._howToPlayContainer.setAlpha(1);
  }

  //metodo per nascondere "come giocare"
  hideHowToPlay() {
    //setto l'opacità del container a 0
    this._howToPlayContainer.setAlpha(0);
    //riattivo l'interatttività del pulsante
    this._howToPlay.setInteractive();

  }


  //metodo per visualizzare i "crediti"
  showCredits() {
    //setto l'opacità del container a 1
    this._creditsContainer.setAlpha(1);

  }

  //metodo per nascondere i "crediti"
  hideCredits() {
    //setto l'opacità del container a 0
    this._creditsContainer.setAlpha(0);
    //riattivo l'interatttività del pulsante
    this._credits.setInteractive();

  }

  // metodo start game
  startGame() {

    //************************************** */
    //************************************** */
    //stoppo la scena corrente
    this.scene.stop("Intro");
    //faccio partire la scena gameplay
    this.scene.start("GamePlay", { level: 0 });
    //faccio partire la scena HUD
    this.scene.start("Hud");
    //porto la scena HUD in primo piano
    this.scene.bringToTop("Hud");
    //************************************** */
    //************************************** */

    //la gestione dei livelli per il momento l'ho commentata perchè per questo tipo di gioco preferisco il passaggio diretto da un livello all'altro senza la possibilità di ripetere il livello precedente.
    //per la gestione dei livelli commentare il codice superiore e decommentare le righe seguenti
    //this.scene.stop("Intro");
    //this.scene.start("Levels");

  }

  update(time: number, delta: number): void {

    //aumento il counter
    this._counter += 0.01;
    //muovo le tile con moto circolare usanto seno e coseno
    this._cubes.tilePositionX += Math.sin(this._counter) //* 3.5; //moltiplicatore per la velocità;
    this._cubes.tilePositionY += Math.cos(this._counter) //* 3.5; //moltiplicatore per la velocità
  }

}

