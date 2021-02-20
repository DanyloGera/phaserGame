var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
    var platforms;
    var player;
    var cursors;
    var stars;
    var score = 0;
    var scoreText;

    var game = new Phaser.Game(config);

    function preload ()
    {
      this.load.image('sky', 'assets/sky.png');
          this.load.image('ground', 'assets/platform.png');
          this.load.image('star', 'assets/star.png');
          this.load.image('bomb', 'assets/bomb.png');
          this.load.spritesheet('dude', 'chalkers.png', { frameWidth: 48, frameHeight: 62 });
    }


    function create ()
    {
      this.add.image(400, 300, 'sky');
      platforms = this.physics.add.staticGroup();

      platforms.create(400, 568, 'ground').setScale(2).refreshBody();
//create platforms
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

//create player
        player = this.physics.add.sprite(100, 450, 'dude');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }

        cursors = this.input.keyboard.createCursorKeys();

        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);

        this.physics.add.overlap(player, stars, collectStar, null, this);
    }

    function update ()
    {
      if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }
    }
        function collectStar (player, star)
        {
            star.disableBody(true, true);

            score += 10;
        scoreText.setText('Score: ' + score);
        }
