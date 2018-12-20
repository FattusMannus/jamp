var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Game = function(){};
 
TopDownGame.Game.prototype = {
  create: function() {
    this.map = this.game.add.tilemap('level1');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles', 'gameTiles');

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    this.createItems();
    this.createHealthItems();
    this.createDoors();    
    this.createEnemies();
    this.createEnemiesDiagonals();

    this.createHUD();

    //create player
    var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
    this.player.anchor.setTo(.5,.5);
    this.player.direction = 'R';

    this.game.physics.arcade.enable(this.player);

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();

  },
  createItems: function() {
    //create items
    this.items = this.game.add.group();
    this.items.enableBody = true;
    var item;    
    result = this.findObjectsByType('item', this.map, 'objectsLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.items);
    }, this);
  },
  createHealthItems: function () {
    this.healthItems = this.game.add.group();
    this.healthItems.enableBody = true;

    result = this.findObjectsByType('health', this.map, 'objectsLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.healthItems);
    }, this);
  },
  createDoors: function() {
    //create doors
    this.doors = this.game.add.group();
    this.doors.enableBody = true;
    result = this.findObjectsByType('door', this.map, 'objectsLayer');

    result.forEach(function(element){
      this.createFromTiledObject(element, this.doors);
    }, this);
  },
  createEnemies: function () {
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;
    result = this.findObjectsByType('enemy', this.map, 'objectsLayer');

    result.forEach(function(element){
      this.createFromTiledObject(element, this.enemies);
    }, this);

    this.enemies.forEach(function(enemy) {
      this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
      enemy.body.collideWorldBounds = true;
      enemy.body.bounce.setTo(1, 1);
      enemy.body.velocity.x = 20;

    }, this);
  },
  createEnemiesDiagonals: function () {
    this.enemiesDiagonal = this.game.add.group();
    this.enemiesDiagonal.enableBody = true;

    result = this.findObjectsByType('enemydiagonal', this.map, 'objectsLayer');

    result.forEach(function(element){
      this.createFromTiledObject(element, this.enemiesDiagonal);
    }, this);

    this.enemiesDiagonal.forEach(function(enemy) {
      this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
      enemy.body.collideWorldBounds = true;
      enemy.body.bounce.setTo(1, 1);
      enemy.body.velocity.x = 20;
      enemy.body.velocity.y = 20;

    }, this);
  },
  createHUD: function () {
    //health setup
    this.health = 10;

    var bmd = this.game.add.bitmapData(200,40);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,70,7);
    bmd.ctx.fillStyle = '#00685e';
    bmd.ctx.fill();
  
    this.healthBar = this.game.add.sprite(0, 22, bmd);
    this.healthBar.anchor.y = 0.5;
    this.healthBar.fixedToCamera = true;

    //score setup
    this.score = 0;
    this.scoreText = this.game.add.text(220, 16, 'Score: 0', { fontSize: '24px', fill: '#fff' });
    this.scoreText.anchor.y = 0.5;
    this.scoreText.fixedToCamera = true;
  },
  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  },
  //create a sprite from an object
  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
  },
  update: function() {
    //collision
    this.game.physics.arcade.collide(this.player, this.blockedLayer);
    this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
    this.game.physics.arcade.overlap(this.player, this.healthItems, this.healthUp, null, this);
    this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);
    
    //enemy collision
    this.game.physics.arcade.collide(this.enemies, this.blockedLayer);
    this.game.physics.arcade.collide(this.enemiesDiagonal, this.blockedLayer);

    this.game.physics.arcade.collide(this.player, this.enemies, this.hit, null, this);
    this.game.physics.arcade.collide(this.player, this.enemiesDiagonal, this.hit, null, this);

    //player movement
    
    this.player.body.velocity.x = 0;

    if(this.cursors.up.isDown) {
      if(this.player.body.velocity.y == 0)
      this.player.body.velocity.y -= 50;
    }
    else if(this.cursors.down.isDown) {
      if(this.player.body.velocity.y == 0)
      this.player.body.velocity.y += 50;
    }
    else {
      this.player.body.velocity.y = 0;
    }
    if(this.cursors.left.isDown) {
      this.updatePlayerDirection('L');
      this.player.body.velocity.x -= 50;
    }
    else if(this.cursors.right.isDown) {
      this.updatePlayerDirection('R');
      this.player.body.velocity.x += 50;
    }
  },
  updatePlayerDirection: function (direction) {
    if(this.player.direction !== direction){
      this.player.scale.x *= -1;
      this.player.direction = direction;
    }

  },
  flash: function (player) {
    player.tint = 0xff00ff;
    setTimeout(function(){
      player.tint = 16777215;
    },100);
  },
  hit: function(player, enemy) {

    enemy.destroy();
    this.game.camera.flash(0xff0000, 500);
    this.health--;
    //TODO: flash the player sprite red?
    // knock player back
    player.body.velocity.x = 20;
    player.body.velocity.y = 20;

    barWidth = this.healthBar.width;
    this.healthBar.width = barWidth - barWidth/this.health;

    if (this.health === 0) {
      this.die(player);
    }
  },
  die: function (player) {
    setTimeout(function () {
      this.state.start('GameOver');
    }, 500);
    player.angle = 270;
  },
  collect: function(player, collectable) {
    this.score++;
    this.scoreText.text = 'Score: ' + this.score;
    //remove sprite
    collectable.destroy();
  },
  enterDoor: function(player, door) {
    console.log('entering door that will take you to '+door.targetTilemap+' on x:'+door.targetX+' and y:'+door.targetY);
  },
  healthUp: function() {
    this.health++;
  }
};
