"use strict";

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const BAR_WIDTH = 40;
const BAR_GAP = 50;
const BAR_MAXHEIGHT = 150;
const TITLE_X = 120;
const TITLE_Y = 25;
const TITLE_GAP = 20;
const GAP = 10;

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const renderTitle = (ctx, x, y, text) => {
  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = `hanging`;
  ctx.fillText(
      text,
      x,
      y
  );
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

const getRandomColor = () => {
  return `hsl(240 ${Math.floor(Math.random() * 100)}% 50%)`;
};

const renderBar = (ctx, x, y, width, height) => {
  ctx.fillRect(x, y, width, height);
};

const renderName = (ctx, name, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillText(name, x, y);
};

const renderTime = (ctx, time, x, y) => {
  ctx.fillText(time, x, y);
};

window.renderStatistics = (ctx, names, times) => {

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`);

  renderTitle(ctx, TITLE_X, TITLE_Y, `Ура вы победили!`);
  renderTitle(ctx, TITLE_X, TITLE_Y + TITLE_GAP, `Список результатов:`);

  for (let i = 0; i < names.length; i++) {

    const MAX_TIME = getMaxElement(times);
    const BAR_HEIGHT = (BAR_MAXHEIGHT * times[i]) / MAX_TIME;
    const BAR_X = CLOUD_X + GAP * 4 + (BAR_WIDTH + BAR_GAP) * i;
    const USER_TIME = Math.floor(times[i]);

    ctx.fillStyle = names[i] === `Вы` ? `hsl(0, 100%, 50%)` : getRandomColor();

    renderBar(ctx, BAR_X, CLOUD_HEIGHT - GAP * 3, BAR_WIDTH, -BAR_HEIGHT);

    renderName(ctx, names[i], BAR_X, CLOUD_HEIGHT - GAP * 2, `#000`);

    renderTime(ctx, USER_TIME, BAR_X, CLOUD_HEIGHT - GAP * 5 - BAR_HEIGHT);
  }
};
