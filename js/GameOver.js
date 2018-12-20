var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.GameOver = function(){};

TopDownGame.GameOver.prototype = {


    preload: function (){

        this.load.image('button', 'assets/buttons/text_go.png');
    	this.load.image('santa', 'assets/images/sadsanta.png');

	},

	create: function(){
  
    	
    	var style = { font: "15px Arial", fill: "#ff0044", align: "center" };

    	var text = this.add.text(this.world.centerX-40, this.world.centerY, "Game Over Man" , style);
        var text2 = this.add.text(this.world.centerX-40, this.world.centerY+40, "Play again?" , style);


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
