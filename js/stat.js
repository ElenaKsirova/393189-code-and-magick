'use strict';

function renderStatistics(ctx, names, times) {
  function getMaxOfArray(arr) {
    var maxValue = 0;

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxValue) {
        maxValue = arr[i];
      }
    }

    return maxValue;
  }


  var WIN_LEFT = 100;
  var WIN_TOP = 10;
  var WIN_WIDTH = 420;
  var WIN_HEIGHT = 270;

  var WIN_COLOR = 'white';

  var WIN_SHADOW_OFFSET = 10;
  var WIN_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

  var COL_HEIGHT_MAX = 150;
  var COL_WIDTH = 40;
  var COL_PADDING = 50;
  var COL_BOTTOM = 240;

  var COL_CAPTIONS_COLOR = 'black';

  var FIRST_COL_LEFT = 140;


  var maxTime = getMaxOfArray(times);

  // вычисляем коэффициент масштабирования для столбцов, с защитой от деления на ноль
  var heightScale = (maxTime ? (COL_HEIGHT_MAX / maxTime) : COL_HEIGHT_MAX);

  var playerIndex;


  var drawWindowShadow = function () {
    ctx.fillStyle = WIN_SHADOW_COLOR;

    ctx.fillRect(
        WIN_LEFT + WIN_SHADOW_OFFSET, WIN_TOP + WIN_SHADOW_OFFSET,
        WIN_WIDTH, WIN_HEIGHT
    );
  };


  var drawWindow = function () {
    ctx.fillStyle = WIN_COLOR;
    ctx.fillRect(WIN_LEFT, WIN_TOP, WIN_WIDTH, WIN_HEIGHT);
  };


  var drawWindowCaption = function () {
    var MSG_PADDING_LEFT = 45;
    var MSG_PADDING_TOP = 20;

    ctx.font = '16px PT Mono';
    ctx.strokeStyle = 'black';

    ctx.strokeText('Ура вы победили!', WIN_LEFT + MSG_PADDING_LEFT, WIN_TOP + MSG_PADDING_TOP);
    ctx.strokeText('Список результатов:', WIN_LEFT + MSG_PADDING_LEFT, WIN_TOP + MSG_PADDING_TOP + 20);
  };


  var getRandomColor = function () {
    // ограничиваем снизу прозрачность, чтобы избежать 100%-ной прозрачности
    var MIN_ALPHA = 0.3;
    var alpha = Math.random() * (1 - MIN_ALPHA) + MIN_ALPHA;

    return ('rgba(0, 0, 255, ' + alpha + ')');
  };


  var getColumnColor = function (index) {
    var MY_COL_NAME = 'Вы';
    var MY_COL_COLOR = 'rgba(255, 0, 0, 1)';

    return ((names[index] === MY_COL_NAME) ? MY_COL_COLOR : getRandomColor());
  };


  var drawColumn = function (index, color) {
    var colLeft = FIRST_COL_LEFT + (index * (COL_WIDTH + COL_PADDING));
    var colHeight = times[index] * heightScale;

    ctx.fillStyle = color;

    ctx.fillRect(colLeft, COL_BOTTOM - colHeight, COL_WIDTH, colHeight);
  };


  var drawColumnCaptions = function (index) {
    var textLeft = FIRST_COL_LEFT + (index * (COL_WIDTH + COL_PADDING)) + 1;
    var colHeight = times[index] * heightScale;

    // снизу столбца пишем имя очередного игрока
    ctx.strokeText(names[index], textLeft, COL_BOTTOM + 20);

    // над столбцом пишем его результат
    ctx.strokeText(Math.floor(times[index]), textLeft, COL_BOTTOM - colHeight - 10);
  };


  drawWindowShadow();

  drawWindow();

  drawWindowCaption();


  for (playerIndex = 0; playerIndex < names.length; playerIndex++) {
    drawColumn(playerIndex, getColumnColor(playerIndex));

    drawColumnCaptions(playerIndex, COL_CAPTIONS_COLOR);
  }
}
