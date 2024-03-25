import { resetScale } from './photo-editing.js';
import { isEscapeKey, toggleModalClasses } from '../utils/modal-windows.js';
import { resetValidation } from './form-validation.js';
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
    // closeModal();
  }
};

const closeAlarm = (evt, isSuccess) => {
  const area = body.querySelector(`.${isSuccess}__inner`);
  const text = body.querySelector(`.${isSuccess}__title`);

  if (
    (evt.target !== area &&
      evt.target !== text) ||
    isEscapeKey(evt)
  ) {
    body.lastElementChild.remove();

    if (isSuccess === 'success') {
      closeModal();
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
  document.removeEventListener('keydown', closeAlarm);
  document.removeEventListener('click', closeAlarm);
  resetValidation();
  resetScale();
  resetSlider();
});


const successfulFormSubmission = () => {
  closeModal();
  const successNotification = templateSuccess.cloneNode(true);
  body.append(successNotification);

  document.addEventListener('click', closeAlarm('success'));

  document.addEventListener('keydown', closeAlarm('success'));
};


const failFormSubmission = () => {
  const failNotification = templateError.cloneNode(true);
  body.append(failNotification);


  const failNotificationArea = body.querySelector('.error__inner');
  const failNotificationText = body.querySelector('.error__title');

  body.addEventListener('click', );

  body.addEventListener('keydown', { capture: true });
};


const setUserFormSumbit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(successfulFormSubmission)
      // .catch(failFormSubmission)
      .finally(unblockSubmitButton);
  });
};

export { setUserFormSumbit, closeModal };
