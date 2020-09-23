"use strict";

let userDialog = document.querySelector(`.setup`);
let similarListElement = userDialog.querySelector(`.setup-similar-list`);
let fragment = document.createDocumentFragment();
let similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

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

const SURNAME = [
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

userDialog.classList.remove(`hidden`);
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);

const getRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const createRandomWizard = () => {
  let randomWizard = {
    name: `${getRandom(NAMES)}  ${getRandom(SURNAME)}`,
    coatColor: getRandom(COLORS),
    eyesColor: getRandom(EYES_COLORS)
  };
  return randomWizard;
};

const createWizardsArray = (quantity) => {
  let wizardsArray = [];
  let oneWizard = {};
  for (let i = 0; i < quantity; i++) {
    oneWizard[i] = createRandomWizard();
    wizardsArray.push(oneWizard[i]);
  }
  return wizardsArray;
};

let wizards = createWizardsArray(4);

const renderWizard = (wizard) => {
  let wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

for (let i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);
