"use strict";

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_GAP = 10;
const TITLE_GAP = 25;
const BAR_WIDTH = 40;
const BAR_GAP = 50;
const BAR_HEIGHT = 150;

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = (arr) => {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = (ctx, names, times) => {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, "rgba(0, 0, 0, 0.7)");
  renderCloud(ctx, CLOUD_X, CLOUD_Y, "#fff");

  ctx.fillStyle = "#000";
  ctx.font = "16px PT Mono";
  ctx.textBaseline = "hanging";
  ctx.fillText(
      `Ура вы победили!`,
      CLOUD_X + CLOUD_GAP * 2,
      TITLE_GAP
  );
  ctx.fillText(
      `Список результатов:`,
      CLOUD_X + CLOUD_GAP * 2,
      TITLE_GAP + CLOUD_GAP * 2
  );

  let maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    let randomColor = Math.floor(Math.random() * 100);

    if (names[i] === "Вы") {
      ctx.fillStyle = "hsl(0, 100%, 50%)";
    } else {
      ctx.fillStyle = "hsl(240," + randomColor + "%, 50%)";
    }

    ctx.fillRect(
        CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - CLOUD_GAP * 3,
        BAR_WIDTH,
        -(BAR_HEIGHT * times[i]) / maxTime
    );

    ctx.fillStyle = "#000";
    ctx.fillText(
        names[i],
        CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - TITLE_GAP
    );

    let userTime = Math.floor(times[i]);

    ctx.fillText(
        userTime,
        CLOUD_X + BAR_WIDTH + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - CLOUD_GAP * 3 - (BAR_HEIGHT * times[i]) / maxTime - CLOUD_GAP * 2
    );
  }
};
