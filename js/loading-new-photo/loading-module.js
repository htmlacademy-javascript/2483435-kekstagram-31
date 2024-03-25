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
    closeModal();
  }
};

const closeSuccessAlarm = (evt) => {
  const area = document.querySelector('.success__inner');
  const text = document.querySelector('.success__title');

  if ((evt.target !== area && evt.target !== text) || isEscapeKey(evt)) {
    const background = document.querySelector('.success');
    background.remove();

    closeModal();
  }
};

const closeFailAlarm = (evt) => {
  const area = document.querySelector('.error__inner');
  const text = document.querySelector('.error__title');

  if ((evt.target !== area && evt.target !== text) || isEscapeKey(evt)) {
    const background = document.querySelector('.error');
    if (background) {
      background.remove();
    }
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
  document.removeEventListener('keydown', closeSuccessAlarm);
  document.removeEventListener('click', closeSuccessAlarm);
  document.removeEventListener('keydown', closeFailAlarm);
  document.removeEventListener('click', closeFailAlarm);
  resetValidation();
  resetScale();
  resetSlider();
});

const successfulFormSubmission = () => {
  closeModal();
  const successNotification = templateSuccess.cloneNode(true);
  body.append(successNotification);

  document.addEventListener('click', closeSuccessAlarm);

  document.addEventListener('keydown', closeSuccessAlarm);
};

const failFormSubmission = () => {
  const failNotification = templateError.cloneNode(true);
  body.append(failNotification);

  document.addEventListener('click', closeFailAlarm);

  document.addEventListener('keydown', closeFailAlarm, { capture: true });
};

const setUserFormSumbit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValide = validate();
    if (isValide) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(successfulFormSubmission)
        .catch(failFormSubmission)
        .finally(unblockSubmitButton);
    }
  });
};

export { setUserFormSumbit, closeModal };
