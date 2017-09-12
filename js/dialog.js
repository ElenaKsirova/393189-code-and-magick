'use strict';

(function () {
  var setupDialog = document.querySelector('.setup');

  var setupDialogPosition = {left: setupDialog.style.left, top: setupDialog.style.top};

  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = setupDialog.querySelector('.setup-close');
  var setupSaveButton = document.querySelector('.setup-submit');

  var dialogHandle = setupDialog.querySelector('.setup-user-pic');

  var showSetupDialog = function () {
    setupDialog.style.left = setupDialogPosition.left;
    setupDialog.style.top = setupDialogPosition.top;

    setupDialog.classList.remove('hidden');

    document.addEventListener('keydown', onDocumentKeyDown);
  };

  var hideSetupDialog = function () {
    setupDialog.classList.add('hidden');

    document.removeEventListener('keydown', onDocumentKeyDown);
  };


  var onDocumentKeyDown = function (evt) {
    window.utils.isEscPressed(evt, function () {
      if (evt.target !== document.querySelector('.setup-user-name')) {
        hideSetupDialog();
      }
    });
  };


  var onSetupOpenButtonClick = function () {
    showSetupDialog();
  };

  var onSetupOpenButtonKeyDown = function (evt) {
    window.utils.isEnterPressed(evt, showSetupDialog);
  };


  var onSetupCloseButtonClick = function () {
    hideSetupDialog();
  };

  var onSetupCloseButtonKeyDown = function (evt) {
    window.utils.isEnterPressed(evt, hideSetupDialog);
  };


  var onSetupSaveButtonClick = function () {
    if (document.querySelector('.setup-wizard-form').checkValidity()) {
      hideSetupDialog();
    }
  };

  var onSetupSaveButtonKeyDown = function (evt) {
    window.utils.isEnterPressed(evt, function() {
      if (document.querySelector('.setup-wizard-form').checkValidity()) {
        hideSetupDialog();
      };
    });
  };

  var setupUserNameInput = document.querySelector('.setup-user-name');

  setupUserNameInput.addEventListener('invalid', function (evt) {
    var target = evt.target;

    if (!(target.validity.valid)) {
      if (target.validity.tooShort) {
        target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      } else if (target.validity.tooLong) {
        target.setCustomValidity('Имя не должно превышать 25-ти символов');
      } else if (target.validity.valueMissing) {
        target.setCustomValidity('Обязательное поле');
      }
    } else {
      target.setCustomValidity('');
    }
  });

  setupUserNameInput.addEventListener('input', function (evt) {
    evt.target.setCustomValidity('');
  });


  setupOpenButton.addEventListener('click', onSetupOpenButtonClick);
  setupOpenButton.addEventListener('keydown', onSetupOpenButtonKeyDown);

  setupCloseButton.addEventListener('click', onSetupCloseButtonClick);
  setupCloseButton.addEventListener('keydown', onSetupCloseButtonKeyDown);

  setupSaveButton.addEventListener('click', onSetupSaveButtonClick);
  setupSaveButton.addEventListener('keydown', onSetupSaveButtonKeyDown);

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialog.style.top = (setupDialog.offsetTop - shift.y) + 'px';
      setupDialog.style.left = (setupDialog.offsetLeft - shift.x) + 'px';
    };


    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  var shopElement = document.querySelector('.setup-artifacts-shop');
  var dropZone = document.querySelector('.setup-artifacts');

  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target.cloneNode(true);
      evt.dataTransfer.setData('text/plain', evt.target.alt);

      dropZone.style.outline = '2px dashed red';
    }
  });

  var artifactsElement = document.querySelector('.setup-artifacts');

  artifactsElement.addEventListener('dragover', function (evt) {
    if ((evt.target.children.length === 0) && (evt.target.tagName.toLowerCase() === 'div')) {
      evt.preventDefault();
    }

    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    dropZone.style.outline = 'none';

    evt.target.style.backgroundColor = '';

    draggedItem.draggable = false;
    evt.target.appendChild(draggedItem);
  });


  artifactsElement.addEventListener('dragenter', function (evt) {
    if ((evt.target.children.length === 0) && (evt.target.tagName.toLowerCase() === 'div')) {
      evt.target.style.backgroundColor = 'yellow';
      evt.preventDefault();
    }
  });

  artifactsElement.addEventListener('dragexit', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragend', function (evt) {
    dropZone.style.outline = 'none';

    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    dropZone.style.outline = 'none';

    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
