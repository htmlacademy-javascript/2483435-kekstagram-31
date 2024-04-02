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
    modal.removeEventListener('click', handleModalClick);
    document.removeEventListener('keydown', handleDocumentKey, captureEscape);
    modal.remove();
  };

  function handleModalClick(evt) {
    if (evt.target === button || evt.target === modal) {
      close();
    }
  }

  function handleDocumentKey(evt) {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
      evt.preventDefault();
      close();
    }
  }

  modal.addEventListener('click', handleModalClick);
  document.addEventListener('keydown', handleDocumentKey, captureEscape);
};

const successfulFormSubmission = () => createNotification(templateSuccess);
const failFormSubmission = () => createNotification(templateError, true);

export { successfulFormSubmission, failFormSubmission };
