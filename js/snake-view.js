var Board = require("./snake.js");

var View = function($el) {
  this.$el = $el;
  this.board = new Board(20);
  this.setupBoard(this.board.boardSize);
}

View.prototype.setupBoard = function(boardSize) {
  var $ul = $("<ul>");

  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
      var $li = $("<li>");
      $li.data("pos", [i, j]);
      $ul.append($li);
    }
  }
  this.$el.append($ul);
}

module.exports = View;
