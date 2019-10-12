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
        this.load.image('next', 'assets/init.png');
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

          var next = this.add.image(300, 230, 'next');
          next.displayWidth = 120;
          next.displayHeight = 120;

          next.setInteractive();

          next.once('pointerup', function () {
              window.GAME.scene.start('nivel1');
          }, window.GAME);

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

var Nivel1 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Nivel1 ()
    {
        Phaser.Scene.call(this, { key: 'nivel1' });
        window.OVER = this;
    },

    preload: function()
    {
        this.load.image('mushroom', 'assets/mushroom2.png');
    },

    create: function ()
    {
        console.log('%c Nivel1 ', 'background: green; color: white; display: block;');
        var image3 = this.add.image(80, 80, 'mushroom');
        image3.displayWidth = 80;
        image3.displayHeight = 80;

        const h1 = this.add.dom(400, 30, 'h1', null, 'RULETEADOS');
        h1.setClassName('h1');

        var graphics = this.add.graphics();
        graphics.lineStyle(10, 0x00ff00, 8);
        graphics.fillStyle(0x747d8c, 2);
        graphics.fillCircle(400, 220, 60);

        graphics.fillStyle(0xFDA7DF, 2);
        graphics.fillCircle(300, 290, 60);

        graphics.fillStyle(0xEE5A24, 2);
        graphics.fillCircle(350, 400, 60);

        graphics.fillStyle(0x833471, 2);
        graphics.fillCircle(450, 410, 60);

        graphics.fillStyle(0xEA2027, 2);
        graphics.fillCircle(495, 295, 60);

       graphics.beginPath();
       graphics.lineStyle(40, 0xc8d6e5);
       graphics.arc(400, 325, 50, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), true, 0.02);
       graphics.strokePath();
       graphics.closePath();

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
    scene: [ Preloader, MainMenu, Game, Nivel1, GameOver ]
};

var game = new Phaser.Game(config);
