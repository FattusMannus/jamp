var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.MainMenu = function(){};

TopDownGame.MainMenu.prototype = {


    preload: function (){
    	this.load.image('santa', 'assets/images/sadsanta.png');

	},

	create: function(){
        this.stage.backgroundColor = "#4488AA";
    	var santa = this.add.image(this.world.centerX-50,0, 'santa');
    	var style = { font: "45px Arial Black", fill: "#ff0044", align: "center" };

    	var text = this.add.text(this.world.centerX-180, this.world.centerY+55, "Click to Start!" , style);



    //  Stroke color and thickness
    text.stroke = '#ffffff';
    text.strokeThickness = 8;
    text.fill = '#ff0044';


    	text.inputEnabled = true;
    	text.events.onInputDown.add(this.actionOnClick, this);
  		
 
    },

    actionOnClick: function() {
        
            this.state.start('Intro');
        
    }
}
