var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.GameOver = function(){};

TopDownGame.GameOver.prototype = {


    preload: function (){

        this.load.image('button', 'assets/buttons/text_go.png');
    	this.load.image('santa', 'assets/images/sadsanta.png');

	},

	create: function(){
    	this.game.camera.x =0;
        this.game.camera.y =0;


    	var style = { font: "15px Arial", fill: "#ff0044", align: "center" };

    	var text = this.add.text(40, 20, "Game Over Man" , style);
           text = this.add.text(40, 30, '', { font: "14px Arial Black", fill: "#19de65" ,boundsAlignH: "center", boundsAlignV: "middle"});
     text.stroke = '#ffffff';
        text.strokeThickness = 8;
        text.fill = '#ff0044';
        this.add.text(40, 60, this.game.scoreText.text , style);
        var text2 = this.add.text(40,120,"Play again?" , style);
           text2 = this.add.text(40, 30, '', { font: "14px Arial Black", fill: "#19de65" ,boundsAlignH: "center", boundsAlignV: "middle"});
     text2.stroke = '#ffffff';
        text2.strokeThickness = 8;
        text2.fill = '#ff0044';

    	text2.inputEnabled = true;
    	text2.events.onInputDown.add(this.actionOnClick, this);
  		/*var button = this.add.button(
                        this.world.centerX-40,
                        this.world.centerY-40,
                        'button',
                        this.actionOnClick,
                        this,
                        0,
                        1,
                        2,
                        3);*/
  		 //this.state.start('Game');
 
    },

    actionOnClick: function() {
        
            this.state.start('Game');
        
    }
}
