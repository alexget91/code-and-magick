'use strict';

window.renderStatistics = function (ctx, names, times) {
  var cloudX = 100;
  var cloudY = 10;
  var cloudWidth = 420;
  var cloudHeight = 270;
  var cloudShadowOffset = 10;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(cloudX + cloudShadowOffset, cloudY + cloudShadowOffset, cloudWidth, cloudHeight);

  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.strokeRect(cloudX, cloudY, cloudWidth, cloudHeight);
  ctx.fillRect(cloudX, cloudY, cloudWidth, cloudHeight);


  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var max = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var histogramHeight = 150;
  var step = histogramHeight / (max - 0);

  var barWidth = 40;
  var barHeight = 0;
  var indent = 50;
  var initialX = 150;
  var initialY = 95;
  var coordX = 0;
  var coordY = 0;
  var lineHeight = 20;

  for (i = 0; i < times.length; i++) {
    barHeight = times[i] * step;
    coordX = initialX + (barWidth + indent) * i;
    coordY = initialY + histogramHeight;

    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + Math.random() + ')';
    ctx.fillRect(coordX, coordY - barHeight, barWidth, barHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), coordX, coordY - barHeight - lineHeight / 2);
    ctx.fillText(names[i], coordX, coordY + lineHeight);
  }
};
