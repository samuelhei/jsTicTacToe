const free = ' ';

function board(w,h) {
    this.board = [];
    this.init(w,h);
    this.last = 'O';
}

board.prototype.init = function(w,h){
    var options = [free]; // ['X','O'];

    for(var a=0;a<h;a++) {
        this.board[a] = [];
        for(var b=0;b<w;b++) {
            if(options.length > 1){ 
                var option = options[Math.round(Math.random()*(options.length-1))];
            }
            else {
                var option = options[0];
            }
            this.board[a].push(option);
        }
    }
};

board.prototype.show = function() {
    for(var a=0;a<this.board.length;a++) {
        console.log(this.board[a]);
    }
}

board.prototype.count = function(type) {
    var count = 0;
    
    var w = this.board[0].length;
    var h = this.board.length;
    
    for(var r=0;r<h;r++) {
        for(var c=0;c<w;c++) {
            if(this.board[r][c] !== type) {
                continue;
            }
            
            var noFirstOrLastColumn = c > 0 && c < (w-1);
            var noFirstOrLastRow = r > 0 && r < (h-1);
            
            
            if(noFirstOrLastColumn) {
                if(this.board[r][c-1] === type && this.board[r][c+1] === type) {
                    ++count;
                }
            }
            
            if(noFirstOrLastRow) {
                if(this.board[r-1][c] === type && this.board[r+1][c] === type) {
                    ++count; 
                }               
            }
            
            if(noFirstOrLastColumn && noFirstOrLastRow) {
                if(this.board[r-1][c-1] === type && this.board[r+1][c+1] === type) {
                    ++count;
                }
                
                if(this.board[r+1][c-1] === type && this.board[r-1][c+1] === type) {
                    ++count;
                }
            }
        }
    }
    
    return count;
};

board.prototype.getNextValidPlay = function() {
    for(var r=0;r<this.board.length;r++) {
        for(var c=0;c<this.board[0].length;c++) {
            if(this.board[r][c] === free) {
                return [r,c];
            }
        }
    }
    return false;
};

board.prototype.havefreeSpaces = function() {
    for(var r=0;r<this.board.length;r++) {
        for(var c=0;c<this.board[0].length;c++) {
            if(this.board[r][c] === free) {
                return true;
            }
        }
    }
    return false;
};

board.prototype.getBoard = function() {
    return this.board;
}


board.prototype.getFreeChar= function(){
    return free;
}

board.prototype.getPlayer = function() {
    var player = this.last == 'X' ? 'O' : 'X';
    this.last = player;
    return player;
};

board.prototype.getLastPlayer = function() {
    return this.last;  
};

board.prototype.play = function(y,x) {
    var player = this.getPlayer();
    
    if(this.board[y][x] === free) {
        this.board[y][x] = player;
    }
    else {
        var validPlay = this.getNextValidPlay();
        this.board[validPlay[0]][validPlay[1]] = player;
    }
};

module.exports = board;
