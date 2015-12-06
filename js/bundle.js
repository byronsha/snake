/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var View = __webpack_require__(1);
	
	$(function () {
	  var rootElement = $(".snake");
	  new View(rootElement);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(2);
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map