import { getTemplate } from '../utils/util.js';
import { isEscapeKey } from '../utils/modal-windows.js';

const templateSuccess = getTemplate('success');
const templateError = getTemplate('error');
const body = document.body;

const createNotification = (template, captureEscape = false) => {
  const modal = template.cloneNode(true);
  body.append(modal);
  const button = modal.querySelector(`.${modal.className}__button`);

  const close = () => {
    modal.removeEventListener('click', onModalClick);
    document.removeEventListener('keydown', onDocumentPressEscape, captureEscape);
    modal.remove();
  };

  function onModalClick(evt) {
    if (evt.target === button || evt.target === modal) {
      close();
    }
  }

  function onDocumentPressEscape(evt) {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
      evt.preventDefault();
      close();
    }
  }

  modal.addEventListener('click', onModalClick);
  document.addEventListener('keydown', onDocumentPressEscape, captureEscape);
};

const showSuccessfullSubmission = () => createNotification(templateSuccess);
const showFailSubmission = () => createNotification(templateError, true);

export { showSuccessfullSubmission, showFailSubmission };
