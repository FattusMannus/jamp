var TopDownGame = TopDownGame || {};

var content2 = [
        "You rescued Santa and saved Christmas!",
        "Give yourself a thumbsup instant!",
        "",
    ];

    var line = [];

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 120;
var lineDelay = 400;

//loading the game assets
TopDownGame.Win = function(){};

TopDownGame.Win.prototype = {




  preload: function() {

        
    
  },
  create: function() {
        line = [];

        wordIndex = 0;
        lineIndex = 0;

    text = this.add.text(40, 30, '', { font: "14px Arial Black", fill: "#19de65" ,boundsAlignH: "center", boundsAlignV: "middle"});
     text.stroke = '#ffffff';
        text.strokeThickness = 8;
        text.fill = '#ff0044';

    this.nextLine();

},
nextLine: function() {

    if (lineIndex === content2.length)
    {


        var style = { font: "15px Arial Black", fill: "#ff0044", align: "center" };

        //this.add.text(this.world.centerX-40, this.world.centerY+20, this.score , style);


        var text = this.add.text(50, 165, "Relax by the Fire >" , style);
        text.stroke = '#ffffff';
        text.strokeThickness = 8;
        text.fill = '#ff0044';
        text.inputEnabled = true;
        text.events.onInputDown.add(this.actionOnClick, this);
        return;
    }

    //  Split the current line on spaces, so one word per array element
    line = content2[lineIndex].split(' ');

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
        video = this.add.video('fireplace');
        video.play(true);
        video.addToWorld(0,-30,0,0, 0.38,0.38);
    }




};