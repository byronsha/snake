var SnakeView = require("./snake-view.js")

$(function () {
  var rootElement = $(".snake");
  new SnakeView(rootElement);
});
