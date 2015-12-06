var Board = require("./snake.js");

var View = function($el) {
  this.$el = $el;
  this.board = new Board(50);
  this.setupBoard(this.board.boardSize);
  this.renderBoard();

  $(window).on("keydown", this.handleKeyEvent.bind(this));

  this.gameFrames = setInterval(this.step.bind(this), 100);
}

View.KEYS = {
  37: "W",
  38: "N",
  39: "E",
  40: "S",
}

View.prototype.setupBoard = function(boardSize) {
  var $ul = $("<ul>");

  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
      var $li = $("<li>");
      $li.attr("pos", [i, j]);
      $ul.append($li);
    }
  }
  this.$el.append($ul);
}

View.prototype.renderBoard = function() {
  var $allSegments = $(".segment0, .segment1");
  $allSegments.removeAttr("class");

  var $allApples = $(".apple");
  $allApples.removeClass("apple");
  $allApples.text("");

  var segmentColor = 0;

  for (var i = 0; i < this.board.snake.segments.length; i++) {
    var $segment = $("[pos='" + this.board.snake.segments[i] + "']");
    $segment.addClass("segment" + (segmentColor % 2));
    segmentColor += 1;
  }

  var $apple = $("[pos='" + this.board.apple + "']");
  $apple.addClass("apple");
  // $apple.text("");
};

View.prototype.step = function() {
  this.board.snake.move();
  this.renderBoard();
  if (this.board.snake.isOffBoard() || this.board.snake.collideSelf()) {
    this.gameover();
  }
};

View.prototype.gameover = function() {
  $(window).off("keydown");
  clearInterval(this.gameFrames);

  var $boardCenter = $("[pos='" + [this.board.center[0] - 1, this.board.center[1] - 6] + "']");
  $boardCenter.addClass("gameover");

  var someText = "GAMEOVER!";
  $boardCenter.append(document.createTextNode(someText));
};

View.prototype.handleKeyEvent = function(event) {
  if (View.KEYS[event.keyCode]) {
    if (this.board.snake.validDirection(View.KEYS[event.keyCode])) {
      this.board.snake.direction = View.KEYS[event.keyCode];
    }
  } else {
  };
};

module.exports = View;
