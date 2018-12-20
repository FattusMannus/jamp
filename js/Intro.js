var TopDownGame = TopDownGame || {};

var content = [
        "Santa has been kidnapped! Collect the presents he dropped",
        "whilst running away and avoid the enemies that threaten to ",
        "ruin everyone's Christmas!",
        "",
    ];

    var line = [];

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 120;
var lineDelay = 400;

//loading the game assets
TopDownGame.Intro = function(){};

TopDownGame.Intro.prototype = {




  preload: function() {
    
  },
  create: function() {
    

    text = this.add.text(10, 30, '', { font: "14px Arial Black", fill: "#19de65" ,boundsAlignH: "center", boundsAlignV: "middle"});
     text.stroke = '#ffffff';
        text.strokeThickness = 8;
        text.fill = '#ff0044';

    this.nextLine();

},
nextLine: function() {

    if (lineIndex === content.length)
    {
        var style = { font: "15px Arial Black", fill: "#ff0044", align: "center" };
        var text = this.add.text(this.world.centerX-60, this.world.centerY+65, "Save Santa >" , style);
        text.stroke = '#ffffff';
        text.strokeThickness = 8;
        text.fill = '#ff0044';
        text.inputEnabled = true;
        text.events.onInputDown.add(this.actionOnClick, this);
        return;
    }

    //  Split the current line on spaces, so one word per array element
    line = content[lineIndex].split(' ');

    //  Reset the word index to zero (the first word in the line)
    wordIndex = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    this.time.events.repeat(wordDelay, line.length, this.nextWord, this);

    //  Advance to the next line
    lineIndex++;

},

nextWord: function() {

    //  Add the next word onto the text string, followed by a space
    text.text = text.text.concat(line[wordIndex] + " ");

    //  Advance the word index to the next word in the line
    wordIndex++;

    //  Last word?
    if (wordIndex === line.length)
    {
        //  Add a carriage return
        text.text = text.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        this.time.events.add(lineDelay, this.nextLine, this);
    }

},

    actionOnClick: function() {
        
            this.state.start('Game');
        
    }




};