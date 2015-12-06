function Snake(startPos, board) {
  this.board = board;
  this.direction = "N";
  this.segments = [startPos];
}

Snake.MOVES = {
  "N": [-1, 0],
  "E": [0, 1],
  "S": [1, 0],
  "W": [0, -1]
};

Snake.prototype.move = function() {
  this.segments.unshift([
    this.segments[0][0] + Snake.MOVES[this.direction][0],
    this.segments[0][1] + Snake.MOVES[this.direction][1]
  ]);
  this.segments.pop();

  if (this.checkEatenApple()) {
    this.grow();
  }
};

Snake.prototype.validDirection = function(newDirection) {
  if (this.direction === "N" && newDirection === "S") {
    return false;
  } else if (this.direction === "S" && newDirection === "N") {
    return false;
  } else if (this.direction === "W" && newDirection === "E") {
    return false;
  } else if (this.direction === "E" && newDirection === "W") {
    return false;
  } else {
    return true;
  }
};

Snake.prototype.checkEatenApple = function() {
  if (this.segments[0][0] === this.board.apple[0] && this.segments[0][1] === this.board.apple[1]) {
    this.board.apple = [];
    this.board.createApple();
    return true;
  } else {
    return false;
  };
};

Snake.prototype.isOffBoard = function() {
  if (this.segments[0][0] < 0 || this.segments[0][1] < 0 || this.segments[0][0] >= this.board.boardSize || this.segments[0][1] >= this.board.boardSize) {
    return true;
  } else {
    return false;
  }
};

Snake.prototype.collideSelf = function() {
  var snakeBody = this.segments.slice(1);
  var snakeHead = this.segments[0]
  for (var i = 0; i < snakeBody.length; i++) {
    if (snakeHead[0] === snakeBody[i][0] && snakeHead[1] === snakeBody[i][1]) {
      return true;
    }
  }
  return false;
};

Snake.prototype.grow = function() {
  this.segments.unshift([
    this.segments[0][0] + Snake.MOVES[this.direction][0],
    this.segments[0][1] + Snake.MOVES[this.direction][1]
  ]);
};

function Board(boardSize) {
  this.center = [Math.floor(boardSize / 2), Math.floor(boardSize / 2)];
  this.snake = new Snake(this.center, this);
  this.boardSize = boardSize;
  this.apple = [];
  this.createApple();
}

Board.prototype.createApple = function() {
  var applePos = [Math.floor(Math.random() * this.boardSize), Math.floor(Math.random() * this.boardSize)];
  while (this.snake.segments.indexOf(applePos) !== -1) {
    applePos = [Math.floor(Math.random() * this.boardSize), Math.floor(Math.random() * this.boardSize)];
  }
  this.apple = applePos;
};

module.exports = Board;
