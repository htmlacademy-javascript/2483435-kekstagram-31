import { resetScale } from './photo-editing.js';
import { isEscapeKey, toggleModalClasses } from '../utils/modal-windows.js';
import { validate, resetValidation } from './form-validation.js';
import './photo-editing.js';
import { resetSlider } from './effects.js';
import { sendData } from '../utils/api.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...',
};

const form = document.querySelector('.img-upload__form');
const filename = form.filename;
const editingModal = form.querySelector('.img-upload__overlay');
const formSubmitButton = form.querySelector('.img-upload__submit');
const templateSuccess = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;
const body = document.body;


const closeModal = () => form.reset();

const isFocusText = () =>
  [form.hashtags, form.description].includes(document.activeElement);

const onDocumentEscape = (evt) => {
  if (isEscapeKey(evt) && !isFocusText()) {
    evt.preventDefault();
    evt.stopPropagation();
    closeModal();
  }
};

const blockSubmitButton = () => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = SubmitButtonText.IDLE;
};

filename.addEventListener('change', (evt) => {
  evt.preventDefault();
  toggleModalClasses(editingModal, true);
  document.addEventListener('keydown', onDocumentEscape);
});

form.addEventListener('reset', () => {
  toggleModalClasses(editingModal, false);
  document.removeEventListener('keydown', onDocumentEscape);
  resetValidation();
  resetScale();
  resetSlider();
});

const successfulFormSubmission = () => {

  const successNotification = templateSuccess.cloneNode(true);
  body.append(successNotification);

  const successNotificationBackground = body.querySelector('.success');
  const successNotificationArea = body.querySelector('.success__inner');
  const successNotificationText = body.querySelector('.success__title');

  document.addEventListener('click', (evt) => {
    if (evt.target !== successNotificationText && evt.target !== successNotificationArea) {
      successNotificationBackground.remove();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)){
      successNotificationBackground.remove();
    }
  });
};


const failFormSubmission = () => {

  const failNotification = templateError.cloneNode(true);
  body.append(failNotification);

  const failNotificationBackground = body.querySelector('.error');
  const failNotificationArea = body.querySelector('.error__inner');
  const failNotificationText = body.querySelector('.error__title');

  body.addEventListener('click', (evt) => {
    if (evt.target !== failNotificationText && evt.target !== failNotificationArea) {
      failNotificationBackground.remove();
    }
  });

  body.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)){
      evt.stopPropagation();
      failNotificationBackground.remove();
    }
  }, {capture: true});
};


const setUserFormSumbit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess,
          closeModal(),
          successfulFormSubmission())
        .catch(() => failFormSubmission())
        .finally(unblockSubmitButton);
    }
  });
};

export { setUserFormSumbit, closeModal };
