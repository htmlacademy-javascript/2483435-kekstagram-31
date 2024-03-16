import { showModal } from '../utils/modal-windows.js';
import './photo-editing.js';

const editingModal = document.querySelector('.img-upload__overlay');
const loadingForm = document.querySelector('.img-upload__input');
const closeModalButton = document.querySelector('.img-upload__cancel');

loadingForm.addEventListener('change', (evt) => {
  evt.preventDefault();
  showModal(editingModal, closeModalButton);
});

