var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.MainMenu = function(){};

TopDownGame.MainMenu.prototype = {


    preload: function (){

        this.load.image('button', 'assets/buttons/text_go.png');
    	this.load.image('santa', 'assets/images/sadsanta.png');

	},

	create: function(){
  
    	var santa = this.add.image(this.world.centerX-40,0, 'santa');
    	var style = { font: "15px Arial", fill: "#ff0044", align: "center" };

    	var text = this.add.text(this.world.centerX-40, this.world.centerY+55, "Save Santa >" , style);
    	text.inputEnabled = true;
    	text.events.onInputDown.add(this.actionOnClick, this);
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
