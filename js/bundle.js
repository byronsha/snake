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

	var SnakeView = __webpack_require__(1)
	
	$(function () {
	  var rootElement = $(".snake");
	  new SnakeView(rootElement);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(2);
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map