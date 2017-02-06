function bestPlay(free, board, person, check) {
    var testBoard = createTestBoard(board);
    
    var w = testBoard[0].length;
    var h = testBoard.length;
    
    var scoreBoard = createScoreBoard(w,h);
    var comb = combinacoes(0,free.length-1, check > free.length-1 ? free.length-1 : check,0,400000);
    for(var a in comb) {

        for(var b in comb[a]) {
            testBoard[free[comb[a][b]][0]][free[comb[a][b]][1]] = person;
        }
        var points = count(testBoard, person);
        for(b in comb[a]) {
            scoreBoard[free[comb[a][b]][0]][free[comb[a][b]][1]] += points;
        }
        testBoard = createTestBoard(board);
    }
    
    var high = 0;
    var cordn = [];

    for (var r = 0; r < h; r++) {
        for (var c = 0; c < w; c++) {
            if (scoreBoard[r][c] > high) {
                high = scoreBoard[r][c];
                cordn = [r, c];
            }
        }
    }
    return {cordn:cordn,score:high};
}


function createTestBoard(board) {
    return JSON.parse(JSON.stringify(board));
}

function createScoreBoard(w,h) {
    var scoreBoard = [];
    
    for (var r = 0; r < h; r++) {
        for (var c = 0; c < w; c++) {
            if (typeof(scoreBoard[r]) == 'undefined') {
                scoreBoard[r] = [];
            }
            scoreBoard[r][c] = 0;
        }
    }
    return scoreBoard;
}

function play(move) {
    return {
            "name": "SamCalculator",
            "play": move 
           };
}

function quantas(n, m) {
    m = ( m < n - m ? m : n - m );
    var dividendo = 1;
    var divisor = 1;
    for ( var i = 2 ; i <= n ; i++ ) {
        if ( i <= n-m && i <= m )
            divisor *= i;
        if ( m < i && n-m < i )
            dividendo *= i;
    }
    return dividendo / divisor;
}

function combinacoes(a, b, m, inicio, fim, acc, retorno) {
    if ( inicio === undefined ) inicio = 0;
    if ( fim === undefined ) fim = quantas(b-a+1, m);
    if ( fim <= 0 )
        return retorno;

    if ( acc == undefined ) acc = [];
    if ( retorno === undefined ) retorno = [];
    if ( m == 0 ) {
        retorno.push(acc);
        return retorno;
    }
    if ( a > b )
        return retorno;

    // Primeiro fazemos todas as combinações que incluem a
    if ( inicio < quantas(b-a, m-1) )
        combinacoes(a+1, b, m-1, inicio, fim, acc.concat([a]), retorno);
    // Depois todas as que não incluem a
    inicio -= quantas(b-a, m-1);
    fim -= quantas(b-a, m-1);
    return combinacoes(a+1, b, m, inicio, fim, acc, retorno);
}

var freeSpaces = function(board) {
    var w = board[0].length;
    var h = board.length;

    var free = [];

    for (var r = 0; r < h; r++) {
        for (var c = 0; c < w; c++) {
            if (board[r][c] == ' ') {
                free.push([r, c]);
            }
        }
    }
    return free;
}

var freeSpacesFiltered = function(board) {
    var w = board[0].length;
    var h = board.length;

    var rows = [];
    var columns = [];

    var free = [];
    var filtered = [];

    for (var r = 0; r < h; r++) {
        for (var c = 0; c < w; c++) {
            if (board[r][c] != ' ') {
                if(rows.length == 0 || rows[rows.length-1] != r) {
                    rows.push(r);
                }
                
                if(columns.length == 0 || columns[columns.length-1] != c) {
                    columns.push(c);
                }
            }
            else {
                free.push([r,c]);
            }
        }
    }

    if(free.length == r*c) {
        return [[2,2]];
    }

    for (var r = 0; r < h; r++) {
        for (var c = 0; c < w; c++) {
            if (board[r][c] == ' ') {
                
                for(var row in rows) {
                    var add = false;
                    for(var col in columns) {
                        if(c > columns[col] -3  && 
                           c < columns[col] +3 &&
                           r > rows[row] - 3    && 
                           r < rows[row] +3) {
                            filtered.push([r,c]);
                            add = true;
                            break;
                        }    
                    }
                    if(add) {
                        break;
                    }
                }
                
            }
        }
    }
    return filtered;
}

var count = function(board, type) {
    var count = 0;

    var w = board[0].length;
    var h = board.length;

    for (var r = 0; r < h; r++) {
        for (var c = 0; c < w; c++) {
            if (board[r][c] !== type) {
                continue;
            }

            var noFirstOrLastColumn = c > 0 && c < (w - 1);
            var noFirstOrLastRow = r > 0 && r < (h - 1);

            if (noFirstOrLastColumn) {
                if (board[r][c - 1] === type && board[r][c + 1] === type) {
                    ++count;
                }
            }

            if (noFirstOrLastRow) {
                if (board[r - 1][c] === type && board[r + 1][c] === type) {
                    ++count;
                }
            }

            if (noFirstOrLastColumn && noFirstOrLastRow) {
                if (board[r - 1][c - 1] === type && board[r + 1][c + 1] === type) {
                    ++count;
                }

                if (board[r + 1][c - 1] === type && board[r - 1][c + 1] === type) {
                    ++count;
                }
            }
        }
    }
    return count;
};

module.exports = function(game) {
    var free = freeSpaces(game.board);
    //console.log(free);
    //return play([0,0]);
    
    var w = game.board[0].length;
    var h = game.board.length;
    
    if(w*h == free.length) {
        return play([2,2]);
    }
    
    if(free.length == 1) {
        return play(free[0]);
    }
    
    var op = bestPlay(free,game.board,game.opponent, 9)
    var me = bestPlay(free,game.board,game.you, 9)
    
    if(op.score > me.score) {
        return play(op.cordn);
    }
    else {
        return play(me.cordn);
    }
}