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
           text.stroke = '#ffffff';
        text.strokeThickness = 8;
        text.fill = '#ff0044';
        //this.add.text(40, 60, this.game.scoreText.text , style);
        var restartText = this.add.text(40,120,"Refresh your window to play again" , style);
        
        restartText.stroke = '#ffffff';
        restartText.strokeThickness = 8;
        restartText.fill = '#ff0044';

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
 
    }
}
