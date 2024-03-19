import { isEscapeKey, toggleModalClasses } from '../utils/modal-windows.js';
import { renderComments } from './comments.js';

const bigPhotoModal = document.querySelector('.big-picture');
const closeModalButton = document.querySelector('.big-picture__cancel');

const renderModal = ({ url, likes, description }) => {
  bigPhotoModal.querySelector('.big-picture__img img').src = url;
  bigPhotoModal.querySelector('.likes-count').textContent = likes;
  bigPhotoModal.querySelector('.social__caption').textContent = description;
};

const onDocumentEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function showBigPhoto(photo) {
  openModal();
  renderModal(photo);
  renderComments(photo.comments);
}

function openModal() {
  toggleModalClasses(bigPhotoModal, true);
  document.addEventListener('keydown', onDocumentEscape);
}

function closeModal() {
  toggleModalClasses(bigPhotoModal, false);
  document.removeEventListener('keydown', onDocumentEscape);
}

const onCloseModalButtonClick = closeModal;
closeModalButton.addEventListener('click', onCloseModalButtonClick);


export { showBigPhoto };
