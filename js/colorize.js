'use strict';
(function () {

  var getRandom = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  window.colorize = function (element, colors, inputValue) {
    var color;
    element.addEventListener('click', function () {
      color = getRandom(colors);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
      inputValue.value = color;
    });
  };
})();
