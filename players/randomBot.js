module.exports = function(game) {

    var board = game.board;
    
    var freeSpaces = [];
    
    for(var r=0;r<board.length;r++) {
        for(var c=0;c<board[0].length;c++) {
            if(board[r][c] === game.free) {
                freeSpaces.push([r,c]);
            }
        }
    }
    
    return {
        "name" : "RandomBot",
        "play" :  freeSpaces[Math.round(Math.random()*(freeSpaces.length-1))]
    };
};