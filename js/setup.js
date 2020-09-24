"use strict";

const NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];

const SURNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];

const COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

const EYES_COLORS = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];

let userDialog = document.querySelector(`.setup`);
let similarListElement = userDialog.querySelector(`.setup-similar-list`);
let fragment = document.createDocumentFragment();
let similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

userDialog.classList.remove(`hidden`);
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);

const getRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const createRandomWizard = () => {
  let randomWizard = {
    name: `${getRandom(NAMES)}  ${getRandom(SURNAMES)}`,
    coatColor: getRandom(COLORS),
    eyesColor: getRandom(EYES_COLORS)
  };
  return randomWizard;
};

const createWizards = (quantity) => {
  let wizards = [];
  let oneWizard = {};
  for (let i = 0; i < quantity; i++) {
    wizards.push(oneWizard[i] = createRandomWizard());
  }
  return wizards;
};

let wizards = createWizards(4);

const renderWizards = (wizard) => {
  let wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const renderElements = (arr, element) => {
  for (let i = 0; i < arr.length; i++) {
    element.appendChild(renderWizards(arr[i]));
  }
  return element;
};


similarListElement.appendChild(renderElements(wizards, fragment));
