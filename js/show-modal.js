import { isEscapeKey } from './util.js';
import { renderComments } from './comments.js';


const bigPhotoModal = document.querySelector('.big-picture');
const closeModalButton = document.querySelector('.big-picture__cancel');

const renderModal = ({ url, likes, description }) => {
  bigPhotoModal.querySelector('.big-picture__img img').src = url;
  bigPhotoModal.querySelector('.likes-count').textContent = likes;
  bigPhotoModal.querySelector('.social__caption').textContent = description;
};

const toggleClasses = (willBeOpened = true) => {
  bigPhotoModal.classList.toggle('hidden', !willBeOpened);
  document.body.classList.toggle('modal-open', willBeOpened);
};


const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};


function openModal(photo) {
  toggleClasses(true);
  renderModal(photo);
  renderComments(photo.comments);
  document.addEventListener('keydown', onDocumentKeyDown);
}

function closeModal() {
  toggleClasses(false);
  document.removeEventListener('keydown', onDocumentKeyDown);
}

const onCloseModalButtonClick = closeModal;
closeModalButton.addEventListener('click', onCloseModalButtonClick);

export { openModal };
