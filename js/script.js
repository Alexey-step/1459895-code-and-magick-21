'use strict';

/* eslint-disable no-unused-vars */

const fireballSize = 22;
const wizardSpeed = 3;
const wizardWidth = 70;

const getFireballSpeed = (isMovingLeft) => {
  return isMovingLeft ? 2 : 5;
};

const getWizardHeight = () => {
  return 1.337 * wizardWidth;
};

const getWizardX = (gameFieldWidth) => {
  return (gameFieldWidth - wizardWidth) / 2;
};

const getWizardY = (gameFieldHeight) => {
  return gameFieldHeight / 3;
};
