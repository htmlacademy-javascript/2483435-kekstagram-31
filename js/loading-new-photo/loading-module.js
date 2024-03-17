import { isEscapeKey, toggleModalClasses } from '../utils/modal-windows.js';
import { validate } from './form-validation.js';
import './photo-editing.js';

const form = document.querySelector('.img-upload__form');
const filename = form.filename;
const editingModal = form.querySelector('.img-upload__overlay');

const closeModal = () => form.reset();

const onDocumentEscape = (evt) => {
  if (isEscapeKey(evt)) {
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
});

form.addEventListener('change', (evt) => {
  evt.preventDefault();
  validate();
});

export { form };
