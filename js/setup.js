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

const NAME_LENGTH = {
  min: 2,
  max: 25
};

const userDialog = document.querySelector(`.setup`);
const similarListElement = userDialog.querySelector(`.setup-similar-list`);
const fragment = document.createDocumentFragment();
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
const setupOpen = document.querySelector(`.setup-open`);
const setup = document.querySelector(`.setup`);
const setupClose = document.querySelector(`.setup-close`);
const setupOpenIcon = setupOpen.querySelector(`.setup-open-icon`);
const setupUserName = setup.querySelector(`.setup-user-name`);
const setupWizard = setup.querySelector(`.setup-wizard`);
const wizardCoat = setupWizard.querySelector(`.wizard-coat`);
const wizardEyes = setupWizard.querySelector(`.wizard-eyes`);
const setupFireballWrap = setup.querySelector(`.setup-fireball-wrap`);
const inputCoatColor = setup.querySelector(`input[name="coat-color"]`);
const inputEyesColor = setup.querySelector(`input[name="eyes-color"]`);
const inputFireballColor = setup.querySelector(`input[name="fireball-color"]`);

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

const onPopupEscPress = (evt) => {
  if (evt.key === `Escape` && setupUserName !== document.activeElement) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = () => {
  setup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = () => {
  setup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

setupOpen.addEventListener(`click`, () => {
  openPopup();
});

setupClose.addEventListener(`click`, () => {
  closePopup();
});

setupClose.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

setupOpenIcon.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupUserName.addEventListener(`input`, () => {
  let valueLength = setupUserName.value.length;

  if (valueLength < NAME_LENGTH.min) {
    setupUserName.setCustomValidity(`Еще ${NAME_LENGTH.min - valueLength} симв.`);
  } else if (valueLength > NAME_LENGTH.max) {
    setupUserName.setCustomValidity(`Удалите лишние ${valueLength - NAME_LENGTH.max} симв.`);
  } else {
    setupUserName.setCustomValidity(``);
  }

  setupUserName.reportValidity();
});

wizardCoat.addEventListener(`click`, () => {
  wizardCoat.style.fill = getRandom(COLORS);
  inputCoatColor.value = wizardCoat.style.fill;
});

wizardEyes.addEventListener(`click`, () => {
  wizardEyes.style.fill = getRandom(EYES_COLORS);
  inputEyesColor.value = wizardEyes.style.fill;
});

setupFireballWrap.addEventListener(`click`, () => {
  let fireballColor = getRandom(FIREBALL_COLORS);
  setupFireballWrap.style.background = fireballColor;
  inputFireballColor.value = fireballColor;
});

