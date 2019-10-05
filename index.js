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
        this.load.image('ayu', 'assets/pinguin.png');
    },

    create: function ()
    {
        console.log('%c Preloader ', 'background: green; color: white; display: block;');

      //  this.anims.create({ key: 'diamond', frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }), repeat: -1 });
      //  this.anims.create({ key: 'prism', frames: this.anims.generateFrameNames('gems', { prefix: 'prism_', end: 6, zeroPad: 4 }), repeat: -1 });
      //  this.anims.create({ key: 'ruby', frames: this.anims.generateFrameNames('gems', { prefix: 'ruby_', end: 6, zeroPad: 4 }), repeat: -1 });
      //  this.anims.create({ key: 'square', frames: this.anims.generateFrameNames('gems', { prefix: 'square_', end: 14, zeroPad: 4 }), repeat: -1 });

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

    preload: function ()
    {
        this.load.css('80s', 'assets/css/mainmenu.css');
          this.load.image('pinguin', 'assets/pinguin.png');
            this.load.image('estudent', 'assets/estudent.png');
    },

    create: function ()
    {
        console.log('%c MainMenu ', 'background: green; color: white; display: block;');
        estudent = this.add.image(400, 250, 'estudent');
       estudent.displayWidth = 780;
       estudent.displayHeight = 600;

        pinguin = this.add.image(400, 250, 'pinguin');
       pinguin.displayWidth = 280;
       pinguin.displayHeight = 280;


        var bg = this.add.image(0, 0, 'buttonBG');
        var text = this.add.image(0, 0, 'buttonText');

        this.add.container(400, 445, [ bg, text ]);

        bg.setInteractive();

        bg.once('pointerup', function () {
            this.scene.start('game');
        }, this);

        const h1 = this.add.dom(400, 30, 'h1', null, 'RULETEADOS');
        h1.setClassName('h1');

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
        this.canSpin = false;

        this.categories = [
            { color: '#FF0000', title: 'Matemáticas' },
            { color: '#00FF00', title: 'Geografía' },
            { color: '#0000FF', title: 'Historia' },
            { color: '#FF00FF', title: 'Ciencias Naturales' },
            { color: '#00FFFF', title: 'Español' }
        ];
    },

    preload: function()
    {
      this.load.image('ruleta', 'assets/colorcircul.png');
      this.load.css('80s', 'assets/css/game.css');
    },

    create: function ()
    {
        console.log('%c Game ', 'background: green; color: white; display: block;');
        roulette = this.add.image(400, 300, 'ruleta');
       roulette.displayWidth = 260;
       roulette.displayHeight = 260;

        var graphics = this.add.graphics();
        graphics.lineStyle(4, 0x00ff00, 1);
        graphics.fillStyle(0x81ecec, 0);
        graphics.fillCircle(400, 300, 160);

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

       const div = this.add.dom(366, 75, 'div', null, '');
       div.setClassName('div');


        const startButton = document.createElement('input');
        startButton.type = 'button';
        startButton.className = 'button';
        startButton.value = 'GIRAR';
        startButton.onclick = function() { window.GAME.canSpin = true; };
        this.add.dom(50, 50, startButton).setInteractive();

        const stopButton = document.createElement('input');
        stopButton.type = 'button';
        stopButton.className = 'stop';
        stopButton.value = 'STOP';
        stopButton.onclick = function() { window.GAME.canSpin = false; };
        this.add.dom(50, 100, stopButton).setInteractive();

        this.categoryText = document.createElement('span');
        this.categoryText.innerHTML = '';
        this.add.dom(350, 290, this.categoryText);
   },

   update: function() {
     if (this.canSpin) {
        const randomCategory = this.categories[Math.floor(Math.random() * this.categories.length)];
        this.categoryText.innerHTML = randomCategory.title;
        this.categoryText.style = `color: ${randomCategory.color}`;

       roulette.angle += 1.8;
     }
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
    dom: {
        createContainer: true
    },
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#819FF7',
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
