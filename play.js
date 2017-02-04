var board = require('./board');

var playerX = require('./players/SamCalculator');
var playerO = require('./players/challenger');

var gameBoard = new board(9,9);

var game = {
  "free" : gameBoard.getFreeChar(),
};

while(gameBoard.havefreeSpaces()) {
    
    game["board"] = gameBoard.getBoard();
    
    if(gameBoard.getLastPlayer() === 'X') {
        game["you"] = 'O';
        game["opponent"] = 'X';
        
        var player = playerO(game);
        
        gameBoard.play(player.play[0],player.play[1]);
        
        console.log('playerO ('+ player.name +'):');
        
        
    }
    else {
        game["you"] = 'X';
        game["opponent"] = 'O';
        
        var player = playerX(game);
        
        gameBoard.play(player.play[0],player.play[1]);
        
        console.log('playerX ('+ player.name +'):');
    }
    
    gameBoard.show();
    console.log('');
}



console.log('X: '+ gameBoard.count('X') );
console.log('O: '+ gameBoard.count('O') );