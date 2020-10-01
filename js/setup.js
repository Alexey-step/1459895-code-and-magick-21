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

const FIREBALL_COLORS = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`
];

const MIN_NAME_LENGTH = 2;

const userDialog = document.querySelector(`.setup`);
const similarListElement = userDialog.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
const setup = document.querySelector(`.setup`);
const setupOpen = document.querySelector(`.setup-open`);
const setupClose = document.querySelector(`.setup-close`);
const setupUserName = setup.querySelector(`.setup-user-name`);
const setupWizard = setup.querySelector(`.setup-wizard`);
const wizardCoat = setupWizard.querySelector(`.wizard-coat`);
const wizardEyes = setupWizard.querySelector(`.wizard-eyes`);
const setupFireballWrap = setup.querySelector(`.setup-fireball-wrap`);
const inputCoatColor = setup.querySelector(`input[name="coat-color"]`);
const inputEyesColor = setup.querySelector(`input[name="eyes-color"]`);
const inputFireballColor = setup.querySelector(`input[name="fireball-color"]`);

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

const renderElements = (arr) => {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizards(arr[i]));
  }
  return fragment;
};

const onPopupEscPress = (evt) => {
  if (evt.key === `Escape` && setupUserName !== document.activeElement) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = () => {
  setup.classList.remove(`hidden`);
  setupOpen.setAttribute(`disabled`, `disabled`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = () => {
  setup.classList.add(`hidden`);
  setupOpen.removeAttribute(`disabled`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

const changeCoatColor = () => {
  wizardCoat.style.fill = getRandom(COLORS);
  inputCoatColor.value = wizardCoat.style.fill;
};

const changeEyesColor = () => {
  wizardEyes.style.fill = getRandom(EYES_COLORS);
  inputEyesColor.value = wizardEyes.style.fill;
};

const changeFireballColor = () => {
  const fireballColor = getRandom(FIREBALL_COLORS);
  setupFireballWrap.style.background = fireballColor;
  inputFireballColor.value = fireballColor;
};

wizardCoat.addEventListener(`click`, changeCoatColor);

wizardEyes.addEventListener(`click`, changeEyesColor);

setupFireballWrap.addEventListener(`click`, changeFireballColor);

setupOpen.addEventListener(`click`, openPopup);

setupClose.addEventListener(`click`, closePopup);

setupClose.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

setupOpen.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupUserName.addEventListener(`input`, () => {
  let valueLength = setupUserName.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    setupUserName.setCustomValidity(`Еще ${MIN_NAME_LENGTH - valueLength} симв.`);
  } else {
    setupUserName.setCustomValidity(``);
  }

  setupUserName.reportValidity();
});

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
similarListElement.appendChild(renderElements(wizards));
