jsTicTacToe
===========

Welcome to Super TicTacToe Game, originaly created to be a Bot x Bot game, but now we have a Bot x Human too! You can play at [https://jstictactoe.herokuapp.com/](https://jstictactoe.herokuapp.com/) or clone this repository and initialize the index.js server.

To create a Bot adversary go to players folder and change de challenger.js file. 

Idea
-----

The ideia behind game is to provide a very simple game to develop better AI robots. I played [jsPoker](https://github.com/mdp/JsPoker), and is a great game (I recomend), but I few the need of create a simpler game as object of study.      

Game
----

The game is very similar to original Tic Tac Toe, but this game will use bigger boards to play and will not end when the first group is made, but  when there is no more free space.

Winner is the player with more groups of three in any direction (horizontal, vertical and diagonal). There is no problem to reutilize pieces from another group, eg: 4 "X" in same line count 2 points rather than one.


Game Object
-----------

Your robot will receive a object like this, and needs to return a object like the [template](https://github.com/samuelhei/jsTicTacToe/blob/master/players/template.js).

    { free: ' ',
      board: 
       [ [ ' ', 'O', 'O', 'X', 'X', 'O', 'O', 'O', 'X', ' ' ],
         [ ' ', 'X', 'O', 'O', 'O', ' ', 'X', 'X', 'X', 'O' ],
         [ 'O', 'O', 'X', 'O', 'O', 'X', ' ', 'X', 'O', 'X' ],
         [ 'X', ' ', ' ', ' ', 'X', 'O', 'O', 'O', 'X', 'O' ],
         [ ' ', 'O', 'O', 'O', 'X', 'O', ' ', 'X', 'O', 'X' ],
         [ ' ', 'O', 'X', 'O', ' ', 'O', ' ', 'X', ' ', 'X' ],
         [ ' ', 'X', ' ', 'X', 'O', ' ', 'X', 'X', 'O', ' ' ],
         [ 'O', ' ', 'X', ' ', 'O', 'X', 'X', 'X', 'O', 'X' ],
         [ 'X', 'X', ' ', 'O', ' ', 'O', 'O', 'X', 'X', 'X' ],
         [ 'O', 'X', 'X', ' ', 'O', ' ', 'X', ' ', 'O', ' ' ] ],
      you: 'O',
      opponent: 'X' }

Change [challenger.js](https://github.com/samuelhei/jsTicTacToe/blob/master/players/challenger.js) with your strategy!

Test you robot (10 games interchanging the X and O player) with:

    npm test
  
Boardlist
-----------

    1. SamCalculator (@samuelhei)
    2.  ProcimationBot (@ipsBruno)
