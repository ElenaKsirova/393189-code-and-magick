'use strict';

window.colorizeElement = function (element, colors, setColor) {
  element.addEventListener('click', function () {
    setColor(element, window.utils.getRandomItem(colors));
  });
};
