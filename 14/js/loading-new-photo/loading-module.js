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


const closeSuccessAlarm = (evt) => {

  const area = body.querySelector('.success__inner');
  const text = body.querySelector('.success__title');
  const background = body.querySelector('.success');

  if (evt.target !== text && evt.target !== area || isEscapeKey(evt)) {
    background.remove();
    clearListener();
  }
};

const closeFailAlarm = (evt) => {

  const area = body.querySelector('.error__inner');
  const text = body.querySelector('.error__title');
  const background = body.querySelector('.error');

  if (evt.target !== text && evt.target !== area || isEscapeKey(evt)) {
    evt.stopPropagation();
    background.remove();
    clearListener();
  }
};

function clearListener () {
  body.removeEventListener('click', closeSuccessAlarm);
  body.removeEventListener('keydown', closeSuccessAlarm);
  body.removeEventListener('click', closeFailAlarm);
  body.removeEventListener('keydown', closeFailAlarm);
}


form.addEventListener('reset', () => {
  toggleModalClasses(editingModal, false);
  document.removeEventListener('keydown', onDocumentEscape);
  resetValidation();
  resetScale();
  resetSlider();
});


const successfulFormSubmission = () => {
  closeModal();

  const successNotification = templateSuccess.cloneNode(true);
  body.append(successNotification);

  body.addEventListener('click', closeSuccessAlarm);

  body.addEventListener('keydown', closeSuccessAlarm);
};


const failFormSubmission = () => {
  const failNotification = templateError.cloneNode(true);
  body.append(failNotification);

  body.addEventListener('click', closeFailAlarm);

  body.addEventListener('keydown', closeFailAlarm);
};


const setUserFormSumbit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => successfulFormSubmission())
        .catch(() => failFormSubmission())
        .finally(unblockSubmitButton);
    }
  });
};


export { setUserFormSumbit };
