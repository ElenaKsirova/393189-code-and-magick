'use strict';

(function () {
  var WIZARD_FIRST_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var WIZARD_LAST_NAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var WIZARD_COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var WIZARD_EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var createWizards = function (count) {
    var wizards = [];

    var getRandomItem = window.utils.getRandomItem;

    for (var i = 0; i < count; i++) {
      wizards[i] = {
        name: getRandomItem(WIZARD_FIRST_NAMES) + ' ' + getRandomItem(WIZARD_LAST_NAMES),
        coatColor: getRandomItem(WIZARD_COAT_COLORS),
        eyesColor: getRandomItem(WIZARD_EYES_COLORS)
      };
    }

    return wizards;
  };


  var renderWizard = function (wizard, template) {
    var wizardElement = template.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };


  var onWizardCoatElementClick = function (evt) {
    evt.target.style.fill = window.utils.getRandomItem(WIZARD_COAT_COLORS);
  };


  var onWizardEyesElementClick = function (evt) {
    evt.target.style.fill = window.utils.getRandomItem(WIZARD_EYES_COLORS);
  };


  var onFireballElementClick = function (evt) {
    evt.target.style.backgroundColor = window.utils.getRandomItem(FIREBALL_COLORS);
  };


  var WIZARD_COUNT = 4;

  var wizards = createWizards(WIZARD_COUNT);

  var setupDialog = document.querySelector('.setup');

  var similarListElement = setupDialog.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
  }
  similarListElement.appendChild(fragment);

  setupDialog.querySelector('.setup-similar').classList.remove('hidden');


  var wizardCoatElement = document.querySelector('.setup-wizard').querySelector('.wizard-coat');
  wizardCoatElement.addEventListener('click', onWizardCoatElementClick);

  var wizardEyesElement = document.querySelector('.setup-wizard').querySelector('.wizard-eyes');
  wizardEyesElement.addEventListener('click', onWizardEyesElementClick);

  var fireballElement = document.querySelector('.setup-fireball-wrap');
  fireballElement.addEventListener('click', onFireballElementClick);
})();
