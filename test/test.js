var board = require('../board')
    , winner = require('../players/template') // Winner
    , challenger =  require('../players/challenger'); // Challenger
    
var assert = require('assert')
    , sys = require('sys');
    
var pointsW = 0
    , pointsC = 0;    

var redColor   = '\033[31m'
    , greenColor = '\033[32m'
    , resetColor = '\033[0m';
    
var echo = '';

function play(n) {
    
    var gameBoard = new board(5,5)
        , game = {"free" : gameBoard.getFreeChar()};

    while(gameBoard.havefreeSpaces()) {
        game["board"] = gameBoard.getBoard();
        
        
        if(n%2 > 0) {
            var xRobot = winner;
            var oRobot = challenger;
            var chall = 'O';
            var win = 'X';
        }
        else {
            var xRobot = challenger;
            var oRobot = winner;
            var chall = 'X';
            var win = 'O';
        }
        
        if(gameBoard.getLastPlayer() === 'X') {
            game["you"] = 'O';
            game["opponent"] = 'X';
            var player = oRobot(game);
            gameBoard.play(player.play[0],player.play[1]);
        
        }
        else {
            game["you"] = 'X';
            game["opponent"] = 'O'
            
            var player = xRobot(game);
            gameBoard.play(player.play[0],player.play[1]);
        }
    }
    
    var countW = gameBoard.count(win);
    var countC = gameBoard.count(chall);
    
    if(countW != countC){

        if(countC > countW ) {
            ++pointsC; // Won = 3 points
            echo += greenColor + ' Winner: '+ countW + ', You:  ' + countC  + resetColor + "\n";
        }
        else {
            ++pointsW; // Lost
            echo += redColor + ' Winner: '+ countW + ', You:  ' + countC  + resetColor + "\n"
        }
    }
    
    if(n < 9) {
        play(n+1);
    }
}


describe("Writing a winning bot.", function () {
    
    this.timeout(30000);
    play(0);
    
    
   
    
    it("you: "+pointsC+" points, opponent: "+pointsW,function () {
        sys.print(echo);
        assert.ok(
            pointsC > pointsW,
            "You need to do more points than your opponent"
        ); 
       
    });
    
    
});
  
 