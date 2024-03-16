import { showModal } from '../utils/modal-windows.js';
import { renderComments } from './comments.js';

const bigPhotoModal = document.querySelector('.big-picture');
const closeModalButton = document.querySelector('.big-picture__cancel');

const renderModal = ({ url, likes, description }) => {
  bigPhotoModal.querySelector('.big-picture__img img').src = url;
  bigPhotoModal.querySelector('.likes-count').textContent = likes;
  bigPhotoModal.querySelector('.social__caption').textContent = description;
};

function showBigPhoto(photo) {
  showModal(bigPhotoModal, closeModalButton);
  renderModal(photo);
  renderComments(photo.comments);
}

export { showBigPhoto };
