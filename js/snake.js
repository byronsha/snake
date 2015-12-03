function Snake() {
  this.direction = "N";
  this.segments = [];
}

// Snake.MOVES = {
//   "N": [0, 1],
//   "E": [1, 0],
//   "S": [0, -1],
//   "W": [-1, 0]
// };

Snake.prototype.move = function() {

}

function Coord(x, y) {
  this.x = x;
  this.y = y;
}

Coord.prototype.plus = function() {

}

Coord.prototype.equals = function() {

}

Coord.prototype.isOpposite = function() {

}

function Board(boardSize) {
  this.snake = new Snake();
  this.boardSize = boardSize;
  this.setupBoard();
}

Board.prototype.setupBoard = function() {

}

module.exports = Board;
