'use strict';

(function () {
  var warningAlert = document.querySelector('#warning-alert');
  var closeButton = document.querySelector('#warning-alert button');

  if (!warningAlert && !closeButton) {
    return;
  }

  warningAlert.classList.remove('warning-alert--nojs');

  var onAlertClose = function () {
    warningAlert.classList.add('warning-alert--hidden');
    closeButton.removeEventListener('click', onAlertClose);
  };

  closeButton.addEventListener('click', onAlertClose);
})();
