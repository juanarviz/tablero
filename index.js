var Preloader = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Preloader ()
    {
        Phaser.Scene.call(this, { key: 'preloader' });
    },

    preload: function ()
    {
        this.load.image('buttonBG', 'assets/button-bg.png');
        this.load.image('buttonText', 'assets/button-text.png');
        this.load.image('ayu', 'assets/ayu.png');
    },

    create: function ()
    {
        console.log('%c Preloader ', 'background: green; color: white; display: block;');

        this.anims.create({ key: 'diamond', frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }), repeat: -1 });
        this.anims.create({ key: 'prism', frames: this.anims.generateFrameNames('gems', { prefix: 'prism_', end: 6, zeroPad: 4 }), repeat: -1 });
        this.anims.create({ key: 'ruby', frames: this.anims.generateFrameNames('gems', { prefix: 'ruby_', end: 6, zeroPad: 4 }), repeat: -1 });
        this.anims.create({ key: 'square', frames: this.anims.generateFrameNames('gems', { prefix: 'square_', end: 14, zeroPad: 4 }), repeat: -1 });

        this.scene.start('mainmenu');
    }

});

var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function MainMenu ()
    {
        Phaser.Scene.call(this, { key: 'mainmenu' });
        window.MENU = this;
    },

    create: function ()
    {
        console.log('%c MainMenu ', 'background: green; color: white; display: block;');

        var bg = this.add.image(0, 0, 'buttonBG');
        var text = this.add.image(0, 0, 'buttonText');

        var container = this.add.container(400, 300, [ bg, text ]);

        bg.setInteractive();

        bg.once('pointerup', function () {

            this.scene.start('game');

        }, this);
    }

});

var Game = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Game ()
    {
        Phaser.Scene.call(this, { key: 'game' });
        window.GAME = this;

        this.controls;
        this.track;
        this.text;
    },

    preload: function()
    {
      this.load.image('ruleta', 'assets/ruleta.png');
    },

    create: function ()
    {
        console.log('%c Game ', 'background: green; color: white; display: block;');
        roulette = this.add.image(400, 300, 'ruleta');
         roulette.displayWidth = 280;
         roulette.displayHeight = 280;

      //  this.add.image(400, 280,  'ruleta');

        var graphics = this.add.graphics();

   graphics.lineStyle(4, 0x00ff00, 1);

   //graphics.strokeRect(32, 32, 256, 256);

   graphics.fillStyle(0x81ecec, 0.);

   graphics.fillCircle(400, 300, 160);

   var graphics = this.add.graphics();

       graphics.lineStyle(50, 0xffffff);

       graphics.beginPath();
       graphics.arc(400, 300, 200, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), false, 0.02);
       graphics.strokePath();
       graphics.closePath();

       graphics.beginPath();
       graphics.lineStyle(40, 0xc8d6e5);
       graphics.arc(400, 300, 300, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), true, 0.02);
       graphics.strokePath();
       graphics.closePath();

       graphics.beginPath();
       graphics.lineStyle(40, 0xc8d6e5);
       graphics.arc(400, 300, 22, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), true, 0.02);
       graphics.strokePath();
       graphics.closePath();
   //graphics.lineStyle(4, 0xff00ff, 1);
  // graphics.strokeEllipse(400, 300, 200, 128);
   // graphics.setAlpha(0.5);
   },

   update: function() {
       roulette.angle += 1.3;
   }

});

var GameOver = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function GameOver ()
    {
        Phaser.Scene.call(this, { key: 'gameover' });
        window.OVER = this;
    },

    create: function ()
    {
        console.log('%c GameOver ', 'background: green; color: white; display: block;');

        this.add.sprite(400, 300, 'ayu');

        this.add.text(300, 500, 'Game Over - Click to start restart', { font: '16px Courier', fill: '#00ff00' });

        this.input.once('pointerup', function (event) {

            this.scene.start('mainmenu');

        }, this);
    }

});

var roulette;

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#7f8fa6',
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 100 },
            debug: true
        }
    },
    scene: [ Preloader, MainMenu, Game, GameOver ]
};

var game = new Phaser.Game(config);
