import { resetScale } from './photo-editing.js';
import { isEscapeKey, toggleModalClasses } from '../utils/modal-windows.js';
import { validate, resetValidation } from './form-validation.js';
import './photo-editing.js';
import { resetSlider } from './effects.js';
import { uploadNewPhoto } from '../utils/api.js';
import { blockSubmitButton, unblockSubmitButton } from './submit-state.js';
import {
  successfulFormSubmission,
  failFormSubmission,
} from './status-modals.js';

const form = document.querySelector('.img-upload__form');
const filename = form.filename;
const editingModal = form.querySelector('.img-upload__overlay');

const closeModal = () => form.reset();

const isFocusText = () =>
  [form.hashtags, form.description].includes(document.activeElement);

const onDocumentEscape = (evt) => {
  if (isEscapeKey(evt) && !isFocusText()) {
    evt.preventDefault();
    closeModal();
  }
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

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = validate();
  if (isValid) {
    blockSubmitButton();
    uploadNewPhoto(new FormData(evt.target))
      .then(() => {
        successfulFormSubmission();
        closeModal();
      })
      .catch(failFormSubmission)
      .finally(unblockSubmitButton);
  }
});
