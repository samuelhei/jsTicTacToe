var freeSpaces = function(board) {
    var w = board[0].length;
    var h = board.length;
    
    var free = [];
    
    for(var r=0;r<h;r++) {
        for(var c=0;c<w;c++) {
            if(board[r][c] == ' ') {
                free.push([r,c]);
            }
        }
    }
    return free;
}

var count = function(board,type) {
    var count = 0;
    
    var w = board[0].length;
    var h = board.length;
    
    for(var r=0;r<h;r++) {
        for(var c=0;c<w;c++) {
            if(board[r][c] !== type) {
                continue;
            }
            
            var noFirstOrLastColumn = c > 0 && c < (w-1);
            var noFirstOrLastRow = r > 0 && r < (h-1);
            
            if(noFirstOrLastColumn) {
                if(board[r][c-1] === type && board[r][c+1] === type) {
                    ++count;
                }
            }
            
            if(noFirstOrLastRow) {
                if(board[r-1][c] === type && board[r+1][c] === type) {
                    ++count; 
                }               
            }
            
            if(noFirstOrLastColumn && noFirstOrLastRow) {
                if(board[r-1][c-1] === type && board[r+1][c+1] === type) {
                    ++count;
                }
                
                if(board[r+1][c-1] === type && board[r-1][c+1] === type) {
                    ++count;
                }
            }
        }
    }
    return count;
};

module.exports = function(game) {
    var testBoard = JSON.parse(JSON.stringify(game.board));
    var scoreBoard = [];

    var w = game.board[0].length;
    var h = game.board.length;
    
    for(var r=0;r<h;r++) {
        for(var c=0;c<w;c++) {
            if(typeof(scoreBoard[r]) == 'undefined'){
                scoreBoard[r] = [];
            }
            scoreBoard[r][c] = 0;
        }
    }
    
    var free = freeSpaces(game.board);
    
    var highMe = 0;
    var highOp = 0;
    var cordnMe = [0,0];
    var cordnOp = [0,0];
    
    var initMe = count(testBoard, game.you);
    var initOp = count(testBoard, game.opponent);
    
    for(var a in free) {
        testBoard[free[a][0]][free[a][1]] = game.you;
        var pointsMe = count(testBoard, game.you);
        testBoard = JSON.parse(JSON.stringify(game.board));
        testBoard[free[a][0]][free[a][1]] = game.opponent;
        var pointsOp = count(testBoard, game.opponent);
        
        if(pointsMe > highMe) {
            highMe = pointsMe;
            cordnMe = free[a];
        }
        
        if(pointsOp > highOp) {
            highOp = pointsOp;
            cordnOp = free[a];
        }
        testBoard = JSON.parse(JSON.stringify(game.board));
    }
    
    var totalMe = highMe - initMe;
    var totalOp = highOp - initOp;
    
    console.log('Me: ',totalMe,' TOTAL: ',initMe);
    console.log('Op: ',totalOp,' TOTAL: ',initOp)
    
    
    var goFree = false;

    if(totalOp > totalMe && totalOp > 1) {
        cordn = cordnOp;
        goFree = true;
    }
    else if(totalMe > 1) {
        cordn = cordnMe;
        goFree = true;
    }
    
    if(goFree) {
        return {
            "name" : "SamCalculator",
            "play" : cordn //[row,column] 
        };
    }
    
    if(free.length >= 3){
        for(var a in free) {
            for(var b in free) {
                if(b<a) continue;
                for(var c in free) {
                    if(c<b) continue;
                    
                    testBoard[free[a][0]][free[a][1]] = game.you;
                    testBoard[free[b][0]][free[b][1]] = game.you;
                    testBoard[free[c][0]][free[c][1]] = game.you;
                    
                    var points = count(testBoard, game.you);
                    
                    scoreBoard[free[a][0]][free[a][1]] += points;
                    scoreBoard[free[b][0]][free[b][1]] += points;
                    scoreBoard[free[c][0]][free[c][1]] += points;
                    
                    testBoard = JSON.parse(JSON.stringify(game.board));
                }
            }
        }
        
        var high = 0;
        var cordn = [];
        
        for(var r=0;r<h;r++) {
            for(var c=0;c<w;c++) {
                if(scoreBoard[r][c] > high) {
                    high = scoreBoard[r][c];
                    cordn = [r,c];
                }
            }
        }
    }
    else {
        var high = 0;
        var cordn = [0,0];
        
        for(var a in free) {
        
            testBoard[free[a][0]][free[a][1]] = game.you;
            var points = count(testBoard, game.you);
            
            if(points > high) {
                high = points;
                cordn = free[a];
            }
            testBoard = JSON.parse(JSON.stringify(game.board));
        }
    }
    
    return {
        "name" : "SamCalculator",
        "play" : cordn //[row,column] 
    };
}
