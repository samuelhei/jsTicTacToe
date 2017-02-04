module.exports = function(game) {
	var board = game.board;
	var usedSpaces = [];
	var freeSpaces = []
	for (var r = 0; r < board.length; r++) {
		for (var c = 0; c < board[0].length; c++) {
			if (board[r][c] !== game.free) {
				usedSpaces.push([r, c]);
			}
			else {
				freeSpaces.push([r, c]);
			}
		}
	}
	for (var i in usedSpaces) {
		var r = usedSpaces[i][0]
		var c = usedSpaces[i][1]
		if (r > 0 && c + 1 < board[0].length && board[r - 1][c + 1] === game.free) {
			r = r - 1
			c = c + 1
			return {
				"name": "ProximationBot",
				"play": [r, c]
			};
		}
		else if (c > 0 && r + 1 < board.length && board[r + 1][c - 1] === game.free) {
			c = c - 1
			r = +1
			return {
				"name": "ProximationBot",
				"play": [r, c]
			};
		}
		else if (r > 0 && c > 0 && board[r - 1][c - 1] === game.free) {
			c = c - 1
			r = r - 1
			return {
				"name": "ProximationBot",
				"play": [r, c]
			};
		}
		else if (c + 1 < board[0].length && r + 1 < board.length && board[r + 1][c + 1] === game.free) {
			c = c + 1
			r = r
			return {
				"name": "ProximationBot",
				"play": [r, c]
			};
		}
		else if (c + 1 < board[0].length && board[r][c + 1] === game.free) {
			c = c + 1
			r = r
			return {
				"name": "ProximationBot",
				"play": [r, c]
			};
		}
		else if (r + 1 < board[0].length && board[r + 1][c] === game.free) {
			r = r + 1
			c = c
			return {
				"name": "ProximationBot",
				"play": [r, c]
			};
		}
		else if (c > 0 && board[r][c - 1] === game.free) {
			r = r
			c = c - 1
			return {
				"name": "ProximationBot",
				"play": [r, c]
			};
		}
		else if (r > 0 && board[r - 1][c] === game.free) {
			r = r - 1
			c = c
			return {
				"name": "ProximationBot",
				"play": [r, c]
			};
		}
	}
	return {
		"name": "RandomBot",
		"play": freeSpaces[Math.round(Math.random() * (freeSpaces.length - 1))]
	};
}
