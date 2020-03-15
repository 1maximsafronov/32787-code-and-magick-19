'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var BAR__WIDTH = 40;
var BAR__HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMax = function (arr) {
  var max = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
};


window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMax(times);
  var barX;
  var barY;
  var barColor;
  var randomNumber;

  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.strokeStyle = 'black';
  ctx.strokeRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 120, 30);
  ctx.fillText('Список результатов:', 120, 50);

  for (var i = 0; i < times.length; i++) {
    barX = 150 + (BAR__WIDTH + 50) * i;
    barY = 100 + BAR__HEIGHT - BAR__HEIGHT * (times[i] / maxTime);
    randomNumber = Math.floor(Math.random() * 100);
    barColor = 'hsl(240, ' + randomNumber.toString() + '%, 50%)';

    if (names[i] === 'Вы') {
      barColor = 'rgba(255, 0, 0, 1)';
    }

    ctx.fillStyle = barColor;
    ctx.fillRect(barX, barY, BAR__WIDTH, BAR__HEIGHT * (times[i] / maxTime));

    ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[i]), barX, barY - 20);
    ctx.fillText(names[i], barX, 100 + BAR__HEIGHT + 5);
  }
};
