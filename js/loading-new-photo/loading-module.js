import { resetScale} from './photo-editing.js';
import { isEscapeKey, toggleModalClasses } from '../utils/modal-windows.js';
import { validate, resetValidation } from './form-validation.js';
import { createSlider } from './effects.js';
import './photo-editing.js';

const form = document.querySelector('.img-upload__form');
const filename = form.filename;
const editingModal = form.querySelector('.img-upload__overlay');
const slider = document.querySelector('.img-upload__effect-level');


const closeModal = () => form.reset();
const clearSlider = () => slider.noUiSlider.destroy();

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
  noUiSlider.create(slider, createSlider());
  slider.classList.add('hidden');
  document.addEventListener('keydown', onDocumentEscape);
});

form.addEventListener('reset', () => {
  toggleModalClasses(editingModal, false);
  document.removeEventListener('keydown', onDocumentEscape);
  resetValidation();
  resetScale();
  clearSlider();
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (validate()) {
    closeModal();
  }
});

export { form };
