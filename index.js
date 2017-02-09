const express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.set('view engine', 'ejs');

app.get('/', function(req, res){ 
    res.render('index');
});

app.get('/newGame', function(req, res){
    var board = require('./board');
    var playerX = require('./players/SamCalculator');
    var gameBoard = new board(6,6);
    
    var game = {
      "free" : gameBoard.getFreeChar(),
    };
    
    game["board"] = gameBoard.getBoard();
    game["you"] = 'X';
    game["opponent"] = 'O';
    
    var player = playerX(JSON.parse(JSON.stringify(game)));
    gameBoard.play(player.play[0],player.play[1]);
    res.json(gameBoard.getBoard());
});

app.post('/play', function(req, res){
    
    var board = require('./board');
    var playerX = require('./players/newSam');
    var gameBoard = new board(6,6);
    
    var game = {
      "free" : gameBoard.getFreeChar(),
    };
    
    gameBoard.setBoard(req.body.board);
    game["board"] = gameBoard.getBoard();
    game["you"] = 'X';
    game["opponent"] = 'O';
    
    if(gameBoard.havefreeSpaces()) {
        var player = playerX(JSON.parse(JSON.stringify(game)));
        gameBoard.play(player.play[0],player.play[1]);
    }
    
    
    res.json({board:gameBoard.getBoard(), 
              countX: gameBoard.count('X'),
              countO: gameBoard.count('O'),
              finished: !gameBoard.havefreeSpaces()});
});

app.listen(process.env.PORT || 3000);