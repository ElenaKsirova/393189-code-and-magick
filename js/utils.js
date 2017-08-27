'use strict';

window.utils = (function () {
  var VK_ENTER = 13;
  var VK_ESC = 27;

  return {
    getRandomItem: function (arrOfItems) {
      return arrOfItems[Math.floor(Math.random() * arrOfItems.length)];
    },

    getMaxOfArray: function (arr) {
      var maxValue = 0;

      for (var i = 0; i < arr.length; i++) {
        if (arr[i] > maxValue) {
          maxValue = arr[i];
        }
      }

      return maxValue;
    },

    isEscPressed: function (evt, onPress) {
      if (evt.keyCode === VK_ESC) {
        onPress();
      }
    },

    isEnterPressed: function (evt, onPress) {
      if (evt.keyCode === VK_ENTER) {
        onPress();
      }
    }
  };
})();
