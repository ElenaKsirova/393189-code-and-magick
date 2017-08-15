'use strict';

function renderStatistics(ctx, names, times) {
  var WIN_WIDTH = 420;
  var WIN_HEIGHT = 270;
  var WIN_LEFT = 100;
  var WIN_TOP = 10;

  var WIN_COLOR = 'white';

  var WIN_SHADOW_OFFSET = 10;
  var WIN_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

  var MSG_PADDING_LEFT = 45;
  var MSG_PADDING_TOP = 20;

  var COL_HEIGHT_MAX = 150;
  var COL_WIDTH = 40;
  var COL_PADDING = 50;
  var COL_BOTTOM = 240;

  // ограничиваем снизу прозрачность столбца,
  // чтобы в статистике не получался прозрачный столбец
  var COL_MIN_ALPHA = 0.3;

  var MY_COL_NAME = 'Вы';
  var MY_COL_COLOR = 'rgba(255, 0, 0, 1)';

  var colLeft = 140;

  var colHeight;
  var colAlpha;

  var heightScale;

  var maxTime = 0;

  var playerIndex;


  // рисуем сначала тень от окна, т.к. она должна лежать под окном

  ctx.fillStyle = WIN_SHADOW_COLOR;
  ctx.fillRect(WIN_LEFT + WIN_SHADOW_OFFSET, WIN_TOP + WIN_SHADOW_OFFSET, WIN_WIDTH, WIN_HEIGHT);

  // затем рисуем окно

  ctx.fillStyle = WIN_COLOR;
  ctx.fillRect(WIN_LEFT, WIN_TOP, WIN_WIDTH, WIN_HEIGHT);

  ctx.font = '16px PT Mono';
  ctx.strokeStyle = 'black';

  ctx.strokeText('Ура вы победили!', WIN_LEFT + MSG_PADDING_LEFT, WIN_TOP + MSG_PADDING_TOP);
  ctx.strokeText('Список результатов:', WIN_LEFT + MSG_PADDING_LEFT, WIN_TOP + MSG_PADDING_TOP + 20);


  // вычисляем максимальный результат (время) в статистике

  for (playerIndex = 0; playerIndex < times.length; playerIndex++) {
    if (times[playerIndex] > maxTime) {
      maxTime = times[playerIndex];
    }
  }


  // вычисляем коэффициент масштабирования для столбцов,
  // с защитой от деления на ноль

  heightScale = (maxTime ? (COL_HEIGHT_MAX / maxTime) : COL_HEIGHT_MAX);

  for (playerIndex = 0; playerIndex < names.length; playerIndex++) {
    if (names[playerIndex] === MY_COL_NAME) {
      ctx.fillStyle = MY_COL_COLOR;
    }
    else {
      colAlpha = Math.random() * (1 - COL_MIN_ALPHA) + COL_MIN_ALPHA;
      ctx.fillStyle = 'rgba(0, 0, 255, ' + colAlpha + ')';
    }

    colHeight = times[playerIndex] * heightScale;

    ctx.fillRect(colLeft, COL_BOTTOM - colHeight, COL_WIDTH, colHeight);

    // снизу столбца пишем имя очередного игрока
    ctx.strokeText(names[playerIndex], colLeft + 1, COL_BOTTOM + 20);

    // над столбцом пишем его результат
    ctx.strokeText(Math.floor(times[playerIndex]), colLeft + 1, COL_BOTTOM - colHeight - 10);

    colLeft += (COL_WIDTH + COL_PADDING);
  }
}
